import React from 'react';
import { Route, /* Redirect, */ withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import withAuth from '../../context/withAuth';


const propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};


const PrivateRoute = ({
  component: Component, auth, location, ...rest
}) => {
  if (!auth.isLoggedIn() && location.pathname !== '/login') {
    // return <Redirect to="/login" />;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} />
      )}
    />
  );
};

PrivateRoute.propTypes = propTypes;
export default withRouter(withAuth(PrivateRoute));
