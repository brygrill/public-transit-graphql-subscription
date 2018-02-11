import React from 'react';
import PropTypes from 'prop-types';
import { Loader, Dimmer } from 'semantic-ui-react';

const Loading = props => {
  return (
    <Dimmer.Dimmable dimmed>
      <Dimmer active={props.show} page>
        <Loader active content="Loading..." />
      </Dimmer>
    </Dimmer.Dimmable>
  );
};

Loading.propTypes = {
  show: PropTypes.bool,
};

Loading.defaultProps = {
  show: false,
};

export default Loading;
