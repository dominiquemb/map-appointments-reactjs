import React from 'react';

import { SchedulerContext } from './SchedulerProvider';

/**
 * Higher Order Component which wraps the consumer context on the Wrapped component.
 * @param {*} WrappedComponent - whatever the component we wrap with withScheduler.
 */
const withScheduler = (WrappedComponent) => {
  const WithHOC = props => (
    <SchedulerContext.Consumer>
      {context => <WrappedComponent {...props} scheduler={context} />}
    </SchedulerContext.Consumer>
  );
  WithHOC.WrappedComponent = WrappedComponent;

  return WithHOC;
};

export default withScheduler;
