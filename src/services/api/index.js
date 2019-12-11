import Storage from '../storage';
import config from '../../config';
import createClient from '../createClient';

import authApi from './authApi';
import patientApi from './patientApi';
import locationsApi from './locationsApi';
import appointmentsApi from './appointmentsApi';

const client = createClient({ config, Storage });

const api = {
  auth: authApi(client),
  patient: patientApi(client),
  locations: locationsApi(client),
  appointments: appointmentsApi(client),
};

export default api;
