import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

import initMap from '../config';

export default class Map extends Component {
  state = {
    loading: true,
    error: false,
    loc: [-76, 40],
    map: null,
  };

  componentDidMount() {
    this.initMap();
  }

  initMap = async () => {
    // load map
    const map = await initMap(this.state.loc, this.mapContainer);

    this.setState({ map });

    map.on('load', () => {
      // add empty layer
      map.addSource('mylocation', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: this.state.loc,
          },
          properties: {},
        },
      });
      map.addLayer({
        id: 'mylocation',
        type: 'circle',
        source: 'mylocation',
        paint: {
          'circle-color': '#674172',
          'circle-radius': 8,
        },
      });
    });
  };

  render() {
    console.log(this.props);
    return (
      <div
        ref={el => (this.mapContainer = el)} // eslint-disable-line no-return-assign
        className="absolute top right left bottom"
      />
    );
  }
}
