import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { Hidden, CircularProgress, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
  LocationOn, Today, WatchLater, Done,
} from '@material-ui/icons';
import moment from 'moment';

import withScheduler from '../context/withScheduler';
import withAuth from '../context/withAuth';
import AppBar from '../components/AppBar/AppBar';
import Drawer from '../components/Drawer/Drawer';
import LocationsJson from './Locations';
import UserJson from './User';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import Stepper from '../components/Stepper/Stepper';
import Controls from '../components/Stepper/Controls';
import FindLocation from '../containers/FindLocation/FindLocation';
import SelectDate from '../containers/SelectDate/SelectDate';
import SelectTime from '../containers/SelectTime/SelectTime';
import ConfirmAppointment from '../containers/ConfirmAppointment/ConfirmAppointment';
import ConfirmDone from '../containers/ConfirmDone/ConfirmDone';
import CancelDone from '../containers/CancelDone/CancelDone';
import getPatientDifficultyScore from '../utils/getPatientDifficultyScore';
import getRequiresCaregiver from '../utils/getRequiresCaregiver';
import LocationResults from '../components/LocationResults/LocationResults';

// import api from '../services/api';
import errorParse from '../utils/errorParse';

import Storage from '../services/storage';

const STATUS_SCHEDULED = 'scheduled';
const STATUS_SCHEDULED_CONFIRMED = 'scheduled & confirmed';

const styles = () => ({
  root: {
    flex: '1 0 0',
    background: '#fafafa',
  },
  stepContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    background: '#eeeeee',
    minHeight: '79vh',
  },
  langSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  loading: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const propTypes = {
  t: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  scheduler: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const getSteps = t => (
  [
    {
      index: 1,
      label: t('scheduler.location'),
      icon: (<LocationOn />),
    },
    {
      index: 2,
      label: t('scheduler.date'),
      icon: (<Today />),
    },
    {
      index: 3,
      label: t('scheduler.time'),
      icon: (<WatchLater />),
    },
    {
      index: 4,
      label: t('scheduler.confirm'),
      icon: (<Done />),
    },
  ]
);

class SchedulerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      date: null,
      time: null,
      location: null,
      returnTime: null,
      isReady: false,
      canceled: false,
      confirmed: false,
      locationsData: [],
      isSubmitting: false,
      patientReqCaregiver: null,
      patientDifficultyScore: null,
    };

    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.getContent = this.getContent.bind(this);
    this.onSubmitPds = this.onSubmitPds.bind(this);
    this.updatePreloadData = this.updatePreloadData.bind(this);
  }

  async componentWillMount() {
    // const { auth } = this.props;
    // const user = await auth.getUser();
    // this.setState({ user, isReady: true });

    const user = UserJson;

    this.setState({
      user,
      isReady: true,
    });
  }

  onSelect(key, value) {
    console.log(key);
    console.log(value);
    this.setState({ [key]: value });
  }

  async onConfirm() {
    this.setState({ isSubmitting: true });
    const { enqueueSnackbar } = this.props;
    // const {
    //   user,
    //   time,
    //   location,
    //   patientReqCaregiver,
    //   patientDifficultyScore,
    //   patientPdsAnwers,
    // } = this.state;
    // marker
    // const { appointment } = user;
    // const data = {
    //   userId: user.id,
    //   appointmentSlotId: time.id,
    //   pds: patientDifficultyScore,
    //   bppLocationId: location.bppId,
    //   bppLocationDmeId: location.bppDmeId,
    //   isPediatric: user.isPediatric,
    //   reqCaregiver: patientReqCaregiver,
    //   insurancePrior: user.insurancePrior,
    //   pdsAnwers: patientPdsAnwers,
    // };

    try {
      // await api.appointments.update(appointment.id, data);
      this.setState({ confirmed: true, isSubmitting: false });
    } catch (error) {
      enqueueSnackbar(errorParse(error));
    }
  }

  async onCancel() {
    const { enqueueSnackbar } = this.props;
    this.setState({ isSubmitting: true });
    // const { user } = this.state;
    // const { appointment } = user;
    // const data = { userId: user.id };
    try {
      // await api.appointments.cancel(appointment.id, data);
      this.setState({ canceled: true, isSubmitting: false });
    } catch (error) {
      enqueueSnackbar(errorParse(error));
    }
  }

  onRestart() {
    const { /*auth,*/ scheduler } = this.props;
    this.setState({
      user: null,
      date: null,
      time: null,
      location: null,
      isReady: false,
      canceled: false,
      confirmed: false,
      isSubmitting: false,
      patientReqCaregiver: null,
      patientDifficultyScore: null,
    });
    scheduler.restart();
    // auth.logout();
    // return (<Redirect to="/" />);
  }

  onSubmitPds(patientPdsAnwers) {
    const { user } = this.state;
    const patientDifficultyScore = getPatientDifficultyScore(patientPdsAnwers, user.age);
    const patientReqCaregiver = getRequiresCaregiver(patientPdsAnwers, user);
    this.setState({ patientDifficultyScore, patientReqCaregiver });
  }

  getContent() {
    let title = '';
    let content = null;
    let disableNext = true;
    const { t, scheduler } = this.props;
    const {
      user,
      canceled,
      confirmed,
      locationsData,
      patientReqCaregiver,
      patientDifficultyScore,
    } = this.state;
    let {
      time,
      date,
      location,
      returnTime,
    } = this.state;
    // const { appointment } = user;

    let appTypeText = '';
    appTypeText = t('scheduler.apptype');

    if (confirmed) {
      title = '';
      content = (
        <ConfirmDone
          onDone={this.onRestart}
          title={t('scheduler.appointment.confirmed')}
          subtitle={t('scheduler.appointment.instructions')}
          body1={t('scheduler.appointment.body1')}
          body2={t('scheduler.appointment.body2')}
          btnText={t('scheduler.done.button')}
          sessionTxt={t('scheduler.session.end')}
          secondsTxt={t('scheduler.session.seconds')}
          location={location}
          appointmentTypeText={appTypeText}
          date={`${(returnTime !== null) ? `${t('select.time.training')}: ` : ''}${t(moment(date.day).format('MMMM'))} ${moment(date.day).format('DD, Y')} ${t('at')} ${moment(time.locationLocalTime).utc().format('h:mm A')}`}
          returnDate={(returnTime !== null) ? `${t('select.time.return')}: ${t(moment(returnTime.locationLocalTime).format('MMMM'))} ${moment(returnTime.locationLocalTime).format('DD, Y')} ${t('at')} ${moment(returnTime.locationLocalTime).utc().format('h:mm A')}` : null}
        />
      );
      disableNext = true;
      return {
        title,
        content,
        disableNext,
      };
    }

    if (canceled) {
      title = t('scheduler.appointment.canceled');
      content = (
        <CancelDone
          onDone={this.onRestart}
          title={t('scheduler.appointment.canceled')}
          btnText={t('scheduler.done.button')}
          sessionTxt={t('scheduler.session.end')}
          secondsTxt={t('scheduler.session.seconds')}
        />
      );
      disableNext = true;
      return {
        title,
        content,
        disableNext,
      };
    }
    switch (scheduler.getCurrentStep()) {
      case 1:
        this.fetchLocationResults();
        title = t('scheduler.location');
        content = (
          <FindLocation
            location={location}
            onSelect={this.onSelect}
            preloadData={locationsData}
            updatePreloadData={this.updatePreloadData}
          />
        );
        disableNext = (location === null);
        break;
      case 2:
        if (location !== null) {
          this.setStoredField('location', location);
        } else {
          location = this.getStoredField('location');
        }

        title = t('scheduler.date');

        content = (
          <SelectDate
            onSelect={this.onSelect}
            filters={{
              locationId: location.id,
              pds: patientDifficultyScore,
              isPediatric: user.isPediatric,
              reqCaregiver: patientReqCaregiver,
              insurancePrior: user.insurancePrior,
              // appointmentTypeId: appointment.typeId,
              age: user.age,
            }}
          />
        );
        disableNext = (date === null);

        break;
      case 3:
        if (date !== null) {
          this.setStoredField('date', date);
        } else {
          date = this.getStoredField('date');
        }

        title = t('scheduler.time');
        content = (
          <SelectTime
            slots={date.slots}
            selectedTime={time}
            onSelect={this.onSelect}
          />
        );
        disableNext = (time === null);
        break;
      case 4:
        if (location !== null) {
          this.setStoredField('location', location);
        } else {
          location = this.getStoredField('location');
        }

        if (date !== null) {
          this.setStoredField('date', date);
        } else {
          date = this.getStoredField('date');
        }

        if (time !== null) {
          this.setStoredField('time', time);
        } else {
          time = this.getStoredField('time');
        }

        if (returnTime !== null) {
          this.setStoredField('returnTime', time);
        } else {
          returnTime = this.getStoredField('returnTime');
        }

        title = t('scheduler.confirm');
        content = (
          <ConfirmAppointment
            location={location}
            confirmed={confirmed}
            title={t('scheduler.confirm.your.appointment')}
            appointmentTypeText={appTypeText}
            date={`${(returnTime !== null) ? `${t('select.time.training')}: ` : ''}${t(moment(date.day).format('MMMM'))} ${moment(date.day).format('DD, Y')} ${t('at')} ${moment(time.locationLocalTime).utc().format('h:mm A')}`}
            returnDate={(returnTime !== null) ? `${t('select.time.return')}: ${t(moment(returnTime.locationLocalTime).format('MMMM'))} ${moment(returnTime.locationLocalTime).format('DD, Y')} ${t('at')} ${moment(returnTime.locationLocalTime).utc().format('h:mm A')}` : null}
          />
        );
        disableNext = (confirmed === null);
        break;
      default:
        title = t('scheduler.default');
        disableNext = false;

        this.fetchLocationResults();

        disableNext = false;

        content = (
          <p>Click next to continue</p>
        );
        break;
    }

    return {
      title,
      content,
      disableNext,
    };
  }

  getPreloadData = () => (
    Storage.getObject('locations')
  );

  setPreloadData = (data) => {
    Storage.setObject('locations', data);
    return true;
  }

  setStoredField = (fieldname, field) => {
    Storage.setObject(fieldname, field);
    return true;
  }

  getStoredField = fieldname => (
    Storage.getObject(fieldname)
  );

  updateStoredField = (fieldname) => {
    const stateObj = {};
    stateObj[fieldname] = Storage.getObject(fieldname);
    this.setState(stateObj);
  }

  updatePreloadData(data) {
    // eslint-disable-next-line
    this.setState({ preloadData: data });
  }

  async fetchLocationResults() {
    const { enqueueSnackbar } = this.props;
    const { locationsData } = this.state;
    const storageData = this.getPreloadData();

    const params = Object.assign(
      { page: 1, limit: 21 },
      {},
    );

    if (storageData !== null) {
      if (storageData.length > 0 && locationsData.length === 0) {
        this.setState({
          locationsData: storageData,
        });
      }
    }

    if (locationsData.length === 0) {
      // const request = async () => {
      //   const response = await api.locations.getAll(params);

      //   const { data } = response;
      //   this.setPreloadData(data.results);
      //   this.setState({
      //     locationsData: data.results,
      //   });
      // };

      const response = LocationsJson;
      const { data } = response;
      this.setPreloadData(data.results);
      this.setState({
        locationsData: data.results,
      });

      // try {
      //   await request();
      // } catch (error) {
      //   this.setState({
      //     locationsData: [],
      //   });
      //   enqueueSnackbar(errorParse(error));
      // }
    }
  }

  renderLoading() {
    const { t, classes } = this.props;
    return (
      <div>
        <div className={classes.loading}>
          <CircularProgress />
        </div>
        <Typography align="center" variant="subtitle1">
          {t('scheduler.loading')}
        </Typography>
      </div>
    );
  }

  renderSubmitting() {
    const { t, classes } = this.props;
    return (
      <div>
        <div className={classes.loading}>
          <CircularProgress />
        </div>
        <Typography align="center" variant="subtitle1">
          {t('scheduler.submitting')}
        </Typography>
      </div>
    );
  }

  render() {
    const { t, classes } = this.props;
    const {
      date,
      time,
      isReady,
      location,
      confirmed,
      locationsData,
      isSubmitting,
      user,
    } = this.state;

    let title = '';
    let disableNext = false;
    let content = this.renderLoading();

    if (isReady) {
      ({
        title,
        content,
        disableNext,
      } = this.getContent());
    }

    if (isSubmitting) {
      content = this.renderSubmitting();
    }

    const transDate = date
      ? `${t(moment(date.day).format('MMMM'))} ${moment(date.day).format('D, YYYY')}`
      : '-';
    const formattedTime = (time && time.locationLocalTime)
      ? moment(time.locationLocalTime).utc().format('h:mm A')
      : '-';

    const disableBtn = isSubmitting ? true : disableNext;
    const steps = getSteps(t);
    return (
      <div id="appContainer">
        <div className={classes.root}>
          <AppBar
            title={title}
            name={user ? user.fullname : '-'}
            date={transDate}
            time={formattedTime}
            location={location ? location.name : '-'}
          />
          <Drawer>
            <div className={classes.langSelector}>
              <LanguageSelector selected="EN" />
            </div>
            <Stepper steps={steps} />
          </Drawer>
          <div className={classes.stepContent}>
            {content}
          </div>
          <LocationResults
            preloading
            locations={locationsData}
          />
        </div>
        <Controls
          confirmed={confirmed}
          // onSubmit={() => { console.log(this.state); }}
          onSubmit={() => {}}
          disableNext={isReady ? disableBtn : true}
          onConfirm={this.onConfirm}
        >
          <Hidden lgUp>
            <Stepper steps={steps} />
          </Hidden>
        </Controls>
      </div>
    );
  }
}

SchedulerPage.propTypes = propTypes;
const SchedulerPageStyled = withStyles(styles, { withTheme: true })(
  withAuth(withSnackbar(SchedulerPage)),
);
const SchedulerPageTranslated = withTranslation()(withScheduler(SchedulerPageStyled));
export default SchedulerPageTranslated;
