export default client => ({
  login({ email, password }) {
    return client.request({
      method: 'post',
      url: '/auth/login',
      data: { email, password },
    });
  },
  me() {
    return client.request({
      method: 'get',
      url: '/auth/me',
    });
  },
  code({ code, userId }) {
    return client.request({
      method: 'post',
      url: '/auth/code',
      data: {
        code,
        userId,
      },
    });
  },
  user(data) {
    return client.request({
      method: 'post',
      url: '/auth/user',
      data,
    });
  },
  option(userId, option) {
    return client.request({
      method: 'post',
      url: '/auth/option',
      data: { userId, option },
    });
  },
});
