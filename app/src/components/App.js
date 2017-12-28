import React, { Component } from 'react';

import ErrorBoundary from './ErrorBoundary';
import AppQuery from '../containers/AppQuery';
import AppSubscription from '../containers/AppSubscription';

const Fragment = React.Fragment;

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Fragment>
          <AppSubscription />
          <AppQuery />
        </Fragment>
      </ErrorBoundary>
    );
  }
}
