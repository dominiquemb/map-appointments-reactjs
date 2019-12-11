export default client => ({
  getAvailableSlots(params) {
    return client.request({
      method: 'get',
      url: '/scheduler/availableSlots',
      params,
    });
  },
  getReturnSlots(data) {
    return client.request({
      method: 'post',
      url: '/scheduler/returnSlots',
      data,
    });
  },
  update(id, data) {
    return client.request({
      method: 'put',
      url: `/scheduler/appointment/${id}`,
      data,
    });
  },
  cancel(id, data) {
    return client.request({
      method: 'delete',
      url: `/scheduler/appointment/${id}`,
      data,
    });
  },
});
