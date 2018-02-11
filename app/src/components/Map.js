import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

import initMap from '../config';

export default class MapComponent extends Component {
  state = {
    loading: true,
    error: false,
    loc: [-76.2, 40],
    map: null,
    layers: {
      redrose: { name: 'redrose' },
    },
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
      map.addSource(this.state.layers.redrose.name, {
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
        id: this.state.layers.redrose.name,
        type: 'circle',
        source: this.state.layers.redrose.name,
        paint: {
          'circle-color': '#674172',
          'circle-radius': 8,
        },
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    this.state.map
      .getSource(this.state.layers.redrose.name)
      .setData(nextProps.data);
  }

  render() {
    return (
      <div>
        {/* <Loading show={this.props.loading} /> */}
        <div
          ref={el => (this.mapContainer = el)} // eslint-disable-line no-return-assign
          className="absolute top right left bottom"
        />
      </div>
    );
  }
}

MapComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

MapComponent.defaultProps = {
  data: {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {},
  },
};
