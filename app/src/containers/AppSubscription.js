import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Header } from 'semantic-ui-react';

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
      <Header inverted>Voters Online: {this.props.votersOnline.count} </Header>
    );
  }
}

AppSubscription.propTypes = propTypes;
AppSubscription.defaultProps = defaultProps;

const ONLINE_QUERY = gql`
  subscription VotersOnline {
    votersOnline {
      count
    }
  }
`;

export default graphql(ONLINE_QUERY, {
  props: ({ data: { loading, error, votersOnline } }) => ({
    loading,
    error,
    votersOnline,
  }),
})(AppSubscription);
