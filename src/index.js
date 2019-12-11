import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { AppContainer } from 'react-hot-loader';
import { SnackbarProvider } from 'notistack';
import MomentUtils from '@date-io/moment';

import './i18n';
import AuthProvider from './context/AuthProvider';
import AuthConsumer from './context/AuthConsumer';
import SchedulerProvider from './context/SchedulerProvider';
import SchedulerConsumer from './context/SchedulerConsumer';
import App from './containers/App/App';
import defaultTheme from './styles/theme';


const theme = createMuiTheme(defaultTheme);

const render = (Component) => {
  ReactDOM.render(
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <MuiThemeProvider theme={theme}>
        <AppContainer>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SchedulerProvider>
              <SchedulerConsumer>
                <AuthProvider>
                  <AuthConsumer>
                    <Component />
                  </AuthConsumer>
                </AuthProvider>
              </SchedulerConsumer>
            </SchedulerProvider>
          </MuiPickersUtilsProvider>
        </AppContainer>
      </MuiThemeProvider>
    </SnackbarProvider>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot && process.env.REACT_APP_STAGE === 'dev') {
  module.hot.accept('./containers/App/App', () => {
    render(App);
  });
}
