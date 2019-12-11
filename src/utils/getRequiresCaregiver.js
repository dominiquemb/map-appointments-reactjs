export default (patientPdsAnswers, user) => {
  if (
    user.reqCaregiver
    || user.age < 18
    || (
      patientPdsAnswers
      && patientPdsAnswers.requireCaregiverQuestion === 'true'
    )
  ) {
    return true;
  }

  return false;
};
