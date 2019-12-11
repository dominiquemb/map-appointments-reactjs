import React from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthProvider';


const propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthConsumer = ({ children }) => (
  <AuthContext.Consumer>
    {({
      logout,
      getUser,
      isLoggedIn,
      loginWithToken,
    }) => (React.Children.map(children, child => React.cloneElement(child, {
      logout,
      getUser,
      isLoggedIn,
      loginWithToken,
    })))}
  </AuthContext.Consumer>
);

AuthConsumer.propTypes = propTypes;
export default AuthConsumer;
