import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Button } from 'semantic-ui-react';

const propTypes = {
  mutate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

class AppMutation extends Component {
  upVote = () => {
    this.props.mutate({ variables: { id: this.props.id } });
  }

  render() {
    return (
      <Button primary onClick={this.upVote}>Vote</Button>
    );
  }
}

AppMutation.propTypes = propTypes;

const UPVOTE_MUTATION = gql`
  mutation UpVote($id: Int!) {
    upvotePost(postId: $id) {
      id
      title
      votes
    }
  }
`;

export default graphql(UPVOTE_MUTATION)(AppMutation);
