import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';

const propTypes = {
  children: PropTypes.element.isRequired,
};

export default class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: '',
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = propTypes;
