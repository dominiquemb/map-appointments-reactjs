export default client => ({
  getAll(params) {
    return client.request({
      method: 'get',
      url: '/locations',
      params,
    });
  },
  get(id) {
    return client.request({
      method: 'get',
      url: `/locations/${id}`,
    });
  },
  update(id, data) {
    return client.request({
      method: 'put',
      url: `/locations/${id}`,
      data,
    });
  },
});
