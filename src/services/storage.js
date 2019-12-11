export default {
  setItem(key, value) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  },
  getItem(key) {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(key);
    }

    return null;
  },
  removeItem(key) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  },
  clear() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  },
  setObject(key, value) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  getObject(key) {
    if (typeof sessionStorage !== 'undefined') {
      return JSON.parse(sessionStorage.getItem(key));
    }

    return null;
  },
  setLocalItem(key, value) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  getLocalItem(key) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }

    return null;
  },
};
