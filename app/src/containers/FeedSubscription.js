import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Map from '../components/Map';

const propTypes = {
  votersOnline: PropTypes.object,
};

const defaultProps = {
  loading: false,
  error: false,
  votersOnline: {},
};

class AppSubscription extends Component {
  state = {};

  render() {
    return (
      <Map
        loading={this.props.loading}
        error={this.props.error}
        data={this.props.red_rose_sub}
      />
    );
  }
}

AppSubscription.propTypes = propTypes;
AppSubscription.defaultProps = defaultProps;

const SUB_QUERY = gql`
  subscription live {
    red_rose_sub {
      type
      features {
        type
        geometry {
          type
          coordinates
        }
        properties {
          id
        }
      }
    }
  }
`;

export default graphql(SUB_QUERY, {
  props: ({ data: { loading, error, red_rose_sub } }) => ({
    loading,
    error,
    red_rose_sub,
  }),
})(AppSubscription);
