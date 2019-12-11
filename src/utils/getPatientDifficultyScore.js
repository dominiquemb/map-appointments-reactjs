const LOW_DIFFICULTY = 1;
const HIGH_DIFFICULTY = 1.5;

export default (patientPdsAnwers, patientAge) => {
  let pds = LOW_DIFFICULTY;
  const underAge = patientAge <= 7;

  if (
    !Object.keys(patientPdsAnwers).length || (
      patientPdsAnwers
        && (
          (patientPdsAnwers.mobility === null)
          || (
            patientPdsAnwers.mobility === 'true'
            && patientPdsAnwers.requireCaregiverQuestion === null
          )
          || (patientAge < 18 && patientPdsAnwers.underEighteenQuestion === 'false')
          || (patientPdsAnwers.cognition === null)
          || (patientPdsAnwers.rr === null)
          || (patientPdsAnwers.health === null)
        )
    )
  ) {
    return null;
  }

  Object.keys(patientPdsAnwers)
    .filter(answer => answer !== 'underEighteenQuestion' && answer !== 'requireCaregiverQuestion')
    .forEach((answer) => {
      if (pds === LOW_DIFFICULTY && patientPdsAnwers[answer] === 'true') {
        pds = HIGH_DIFFICULTY;
      }
    });

  if (pds === LOW_DIFFICULTY && underAge) {
    pds = HIGH_DIFFICULTY;
  }

  return pds;
};
