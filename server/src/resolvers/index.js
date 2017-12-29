import { find } from 'lodash';
import pubsub from '../subscriptions';

import { fetchRedRose, pingRedRose } from '../loaders/load-red-rose';

const vehicles = [
  { id: 1, lat: -40.5, lon: 76.0 },
  { id: 2, lat: -40.6, lon: 76.1 },
  { id: 3, lat: -40.7, lon: 76.2 },
];

const resolvers = {
  Vehicle: {
    id(item) {
      return item.VehicleId;
    },
    lat(item) {
      return item.Latitude;
    },
    lon(item) {
      return item.Longitude;
    },
  },
  Query: {
    single_vehicle: (_, { id }) => find(vehicles, { id }),
    async all_vehicles(_, args) {
      if (!args.authority) {
        throw new Error('Must include transit authority to query!');
      }
      try {
        const data = await fetchRedRose();
        return data;
      } catch (error) {
        throw new Error('Error fetching transit data');
      }
    },
  },
  Subscription: {
    single_vehicle: {
      subscribe() {
        return pubsub.asyncIterator('single_vehicle');
      },
    },
    all_vehicles: {
      subscribe() {
        pingRedRose();
        return pubsub.asyncIterator('all_vehicles');
      },
    },
  },
};

export default resolvers;
