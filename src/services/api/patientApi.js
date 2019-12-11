export default client => ({
  getProfile() {
    return client.request({
      method: 'get',
      url: '/patient/me',
    });
  },
  updateProfile(data) {
    return client.request({
      method: 'post',
      url: '/patient/profile',
      data,
    });
  },
  addPhoneNumber(data) {
    return client.request({
      method: 'post',
      url: '/patient/profile/phone-numbers',
      data,
    });
  },
  getAppointments() {
    return client.request({
      method: 'get',
      url: '/patient/appointments',
    });
  },
  getInsurances() {
    return client.request({
      method: 'get',
      url: '/patient/insurances',
    });
  },
});
