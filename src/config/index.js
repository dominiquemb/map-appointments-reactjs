let hostname = 'http://localhost:8000/v1';
let mapAPIKey = 'AIzaSyD9AI6tF5jPdN-ysVarDI4lsT2e3ygoEZc';

if (process.env.REACT_APP_STAGE === 'test') {
  hostname = 'https://hostname/v1';
  mapAPIKey = 'AIzaSyD9AI6tF5jPdN-ysVarDI4lsT2e3ygoEZc';
} else if (process.env.REACT_APP_STAGE === 'prod') {
  hostname = 'https://hostnameprod/v1';
  mapAPIKey = 'AIzaSyD9AI6tF5jPdN-ysVarDI4lsT2e3ygoEZc';
}
export default {
  api: {
    baseURL: hostname,
    timeout: 40000,
  },
  map: {
    key: mapAPIKey,
  },
};
