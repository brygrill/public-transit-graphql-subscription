import React, { Component } from 'react';

import ErrorBoundary from './ErrorBoundary';
import AppSubscription from '../containers/FeedSubscription';

// const Fragment = React.Fragment;

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <AppSubscription />
      </ErrorBoundary>
    );
  }
}
