import axios from 'axios';
import events from '../utils/events';

export default ({
  config: { api },
  Storage,
} = {}) => {
  const client = axios.create(api);

  const getToken = () => Storage.getItem('jbc') || null;
  const setToken = token => Storage.setItem('jbc', token);
  const logout = () => { events.emit('logout'); };

  const parseErrors = (errors) => {
    const parsed = Object.keys(errors).map((keyError) => {
      const message = errors[keyError];
      return Array.isArray(message) ? message : Array(message);
    });

    return parsed.reduce((acc, val) => acc.concat(val), []);
  };

  client.interceptors.request.use(
    (config) => {
      const token = getToken && getToken();

      if (token) {
        Object.assign(config.headers, { Authorization: token });
      }

      return config;
    },
    (e) => {
      e.error = true;
      return Promise.reject(e);
    },
  );

  client.interceptors.response.use(
    // TO DO: pass only the data inside de response (require changes on all api calls).
    (response) => {
      const { headers } = response;

      if (headers.authorization) {
        setToken(headers.authorization);
      }

      return response;
    },
    (e) => {
      if (!e.response || e.response.status === 401) {
        logout();
        if (e.response && e.response.status === 401) {
          e.response.data.message = 'Your session has expired. Please log back in.';
        }
      } else if (e.response.status === 400 && e.response.data.error) {
        e.errors = parseErrors(e.response.data.error);
      }

      e.error = true;
      return Promise.reject(e);
    },
  );

  return client;
};
