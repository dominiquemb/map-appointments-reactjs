import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { detect } from 'detect-browser';

import Paper from '@material-ui/core/Paper';
import withScheduler from '../../context/withScheduler';
import withAuth from '../../context/withAuth';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import history from '../../components/history/history';
import UnsupportedBrowser from '../../pages/UnsupportedBrowser/UnsupportedBrowser';
import ContactInfoConfirmation from '../../pages/ContactInfoConfirmation';
import Page404 from '../../pages/404';
import SchedulerPage from '../../pages/SchedulerPage';

import './App.css';
import 'typeface-roboto';

const propTypes = {
  scheduler: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: null, browserUnsupported: null };

    this.goForwardCounter = 0;
  }

  async componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { user, browserUnsupported } = this.state;
    const { scheduler } = this.props;
    const storedUser = {
      appointment: {},
    };

    this.setState({ user: storedUser });

    const { appointment } = storedUser;

    if (browserUnsupported === null) {
      this.isBrowserUnsupported();
    } else if (browserUnsupported === true && window.location.pathname !== '/unsupported') {
      window.location.pathname = '/unsupported';
    }

    this.backListener = history.listen(() => {
      this.goForwardCounter += 1;
      appointment.reqPdsQuestionnaire = true;
      scheduler.restart();
      history.goForward();

      // this is necessary because the back event fires twice for some reason
      if (this.goForwardCounter === 2) {
        this.goForwardCounter = 0;
        appointment.reqPdsQuestionnaire = true;
        scheduler.restart();
      }
    });
  }

  componentDidUpdate() {
    const { browserUnsupported } = this.state;

    if (browserUnsupported === null) {
      this.isBrowserUnsupported();
    } else if (browserUnsupported === true && window.location.pathname !== '/unsupported') {
      window.location.pathname = '/unsupported';
    }
  }

  isBrowserUnsupported() {
    const supportedVersions = {
      firefox: {
        windows: '67.0.0',
        mac: '67.0.0',
        linux: '67.00',
        android: true,
        ios: true,
        'windows mobile': true,
      },
      chrome: {
        windows: '74.0.0',
        mac: '74.0.0',
        linux: '66.0.0',
        ios: true,
        android: true,
        'windows mobile': true,
      },
      chromium: {
        windows: '66.0.0',
        mac: '66.0.0',
        linux: '66.0.0',
        ios: true,
        android: true,
        'windows mobile': true,
      },
      edge: {
        windows: '17.0.0',
        mac: false,
        linux: false,
        ios: false,
        android: true,
        'windows mobile': true,
      },
      safari: {
        windows: '4',
        mac: '9.1',
        linux: false,
        ios: true,
        android: true,
        'windows mobile': false,
      },
    };
    const osList = ['ios', 'android', 'windows', 'mac', 'linux', 'windows mobile'];
    const mobileList = ['ios', 'android', 'windows mobile'];

    const brws = detect();
    let os = brws.os.toLowerCase(); // default os

    osList.map((osName) => {
      if (os !== 'windows mobile') {
        // if it's windows mobile, skip this and use 'windows mobile'
        // as the OS name, so that it won't use 'windows'
        if (os.indexOf(osName) > -1) {
          os = osName;
        }
      }
      return osName;
    });

    if (mobileList.indexOf(os) > -1) {
      this.setState({ browserUnsupported: false });
      return;
    }

    if (brws.name in supportedVersions) {
      if (supportedVersions[brws.name][os]) {
        if (parseFloat(brws.version) >= parseFloat(supportedVersions[brws.name][os])) {
          this.setState({ browserUnsupported: false });
          return;
        }
      }
    }
    this.setState({ browserUnsupported: true });
  }

  render() {
    const showUnsupportedMessage = (window.location.pathname === '/unsupported');

    return (
      <Router>
        { showUnsupportedMessage && (
          <Paper
            component={UnsupportedBrowser}
          />
        )}
        { !showUnsupportedMessage && (
          <main>
            <Switch>
              <PrivateRoute exact path="/" component={SchedulerPage} />
              <PrivateRoute exact path="/contact-info-confirmation" component={ContactInfoConfirmation} />
              <Route component={Page404} />
            </Switch>
          </main>
        )}
      </Router>
    );
  }
}

App.propTypes = propTypes;
export default withScheduler(withAuth(App));
