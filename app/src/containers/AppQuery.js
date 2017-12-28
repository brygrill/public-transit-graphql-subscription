import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Container, Segment, Header, List } from 'semantic-ui-react';

import AppMutation from './AppMutation';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  posts: PropTypes.array,
};

const defaultProps = {
  loading: false,
  error: false,
  posts: [],
};

class AppQuery extends Component {
  state = {};

  render() {
    if (this.props.loading) {
      return <Loading />;
    }

    if (this.props.error) {
      return <ErrorMessage msg="Error connecting to GraphQL server" />;
    }

    return (
      <Container style={{ marginTop: '3rem' }}>
        <Segment inverted>
          <Header>My GraphQL App</Header>
          <List relaxed inverted>
            {this.props.posts.map(item => {
              return (
                <List.Item key={item.id}>
                  <List.Content floated="right">
                    <AppMutation id={item.id} />
                  </List.Content>
                  <List.Icon name="book" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>{item.title}</List.Header>
                    <List.Description>
                      By: {item.author.lastName}
                    </List.Description>
                    <List.Description>Votes: {item.votes}</List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </Segment>
      </Container>
    );
  }
}

AppQuery.propTypes = propTypes;
AppQuery.defaultProps = defaultProps;

const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      id
      title
      votes
      author {
        id
        lastName
      }
    }
  }
`;

export default graphql(POSTS_QUERY, {
  props: ({ data: { loading, error, posts } }) => ({
    loading,
    error,
    posts,
  }),
})(AppQuery);
