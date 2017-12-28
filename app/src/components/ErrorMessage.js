import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Header } from 'semantic-ui-react';

const propTypes = {
  msg: PropTypes.string,
};

const defaultProps = {
  msg: 'Error!',
};

export default class ErrorMessage extends Component {
  render() {
    return (
      <Segment inverted textAlign="center" color="red" tertiary>
        <Header>{this.props.msg}</Header>
      </Segment>
    );
  }
}

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;
