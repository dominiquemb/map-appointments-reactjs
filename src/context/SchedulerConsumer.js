import React from 'react';
import PropTypes from 'prop-types';

import { SchedulerContext } from './SchedulerProvider';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const SchedulerConsumer = ({ children }) => (
  <SchedulerContext.Consumer>
    {({
      getCurrentStep, setTotalSteps, getTotalSteps, next, back, restart,
    }) =>
      // eslint-disable-next-line
      React.Children.map(children, child => React.cloneElement(child, {
        getCurrentStep,
        setTotalSteps,
        getTotalSteps,
        next,
        back,
        restart,
      }))
    }
  </SchedulerContext.Consumer>
);

SchedulerConsumer.propTypes = propTypes;
export default SchedulerConsumer;
