import { GraphQLScalarType } from 'graphql';
import { find, has } from 'lodash';
import pubsub from '../subscriptions';

import { fetchRedRose, pingRedRose } from '../loaders/load-red-rose';

const resolvers = {
  Coordinates: new GraphQLScalarType({
    // https://github.com/ghengeveld/graphql-geojson/blob/master/index.js#L46
    // https://github.com/apollographql/graphql-tools/blob/master/docs/source/scalars.md
    name: 'Coordinates',
    description: 'A set of coordinates. x, y',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return ast.value;
    },
  }),
  PointGeometry: {
    type() {
      return 'Point';
    },
    coordinates(item) {
      if (!has(item, 'lon_key') || !has(item, 'lat_key')) {
        console.error('Must include lat and lon prop keys!');
        return [];
      }
      return [item.data[item.lon_key], item.data[item.lat_key]];
    },
  },
  PointObject: {
    type() {
      return 'Feature';
    },
    geometry(item) {
      return item;
    },
  },
  RedRoseBus: {
    id(item) {
      return item.VehicleId;
    },
    lat(item) {
      return item.Latitude;
    },
    lon(item) {
      return item.Longitude;
    },
    geojson(data) {
      return { data, lon_key: 'Longitude', lat_key: 'Latitude' };
    },
  },
  RedRoseTransit: {
    async single_bus(_, { id }) {
      if (!id) {
        throw new Error('Must include bus ID!');
      }
      try {
        const data = await fetchRedRose();
        return find(data, { VehicleId: id });
      } catch (error) {
        throw new Error('Error fetching transit data');
      }
    },
    async all_buses() {
      try {
        const data = await fetchRedRose();
        return data;
      } catch (error) {
        throw new Error('Error fetching transit data');
      }
    },
  },
  Query: {
    red_rose_transit(_, args, ctx) {
      return { _, args, ctx };
    },
  },
  Subscription: {
    red_rose_sub: {
      subscribe() {
        pingRedRose();
        return pubsub.asyncIterator('red_rose_sub');
      },
    },
  },
};

export default resolvers;
