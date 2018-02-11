import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

import initMap from '../config';

export default class MapComponent extends Component {
  state = {
    loc: [-76.305, 40.037],
    map: null,
    layers: {
      redrose: { name: 'redrose' },
    },
    error: false,
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
        data: this.props.data,
      });
      map.addLayer({
        id: this.state.layers.redrose.name,
        type: 'circle',
        source: this.state.layers.redrose.name,
        paint: {
          'circle-color': '#674172',
          'circle-radius': 6,
        },
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      try {
        this.state.map
          .getSource(this.state.layers.redrose.name)
          .setData(nextProps.data);
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  render() {
    return (
      <div>
        <Loading show={this.props.loading} />
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
