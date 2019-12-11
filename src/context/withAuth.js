import React from 'react';

import { AuthContext } from './AuthProvider';

/**
 * Higher Order Component which wraps the consumer context on the Wrapped component.
 * @param {*} WrappedComponent - whatever the component we wrap with withAuth.
 */
const withAuth = (WrappedComponent) => {
  const WithHOC = props => (
    <AuthContext.Consumer>
      {context => <WrappedComponent {...props} auth={context} />}
    </AuthContext.Consumer>
  );
  WithHOC.WrappedComponent = WrappedComponent;

  return WithHOC;
};

export default withAuth;
