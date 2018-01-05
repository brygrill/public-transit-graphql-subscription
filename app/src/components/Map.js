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

  initMap = () => {
    const map = initMap(this.state.loc, this.mapContainer);
    this.setState({ map });
  }

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
