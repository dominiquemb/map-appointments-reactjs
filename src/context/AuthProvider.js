import React from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';
import Storage from '../services/storage';

import events from '../utils/events';


const propTypes = {
  children: PropTypes.node.isRequired,
};

const DEFAULT_STATE = {
  token: Storage.getItem('jbc') || null,
};

export const AuthContext = React.createContext(DEFAULT_STATE);

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getUserMFAOptions = this.getUserMFAOptions.bind(this);
    this.handleLoginWithToken = this.handleLoginWithToken.bind(this);

    events.addListener('logout', this.handleLogout);
  }

  getToken = () => (Storage.getItem('jbc') || null)

  getUser = async () => {
    const storedUser = Storage.getObject('jcb');
    let user = null;

    if (storedUser !== null) {
      user = storedUser;
    } else {
      // const { data } = await api.patient.getProfile();
      const data = {};
      Storage.setObject('jcb', data);
      user = data;
    }
    return user;
  }

  getUserMFAOptions = async (values) => {
    const { data } = await api.auth.user(values);
    return data;
  }

  handleLoginWithToken = async (token) => {
    Storage.setItem('jbc', token);
    await api.auth.me();
    this.forceUpdate();
  }

  handleLogout() {
    Storage.clear();
    this.forceUpdate();
  }

  isLoggedIn() {
    return (this.getToken() !== null);
  }

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          getUser: this.getUser,
          logout: this.handleLogout,
          isLoggedIn: this.isLoggedIn,
          loginWithToken: this.handleLoginWithToken,
          getUserMFAOptions: this.getUserMFAOptions,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = propTypes;
export default AuthProvider;
