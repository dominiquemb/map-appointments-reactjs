import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment-timezone';
import {
  Grid,
  CircularProgress,
  Typography,
  Hidden,
} from '@material-ui/core';
import { Today } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { withSnackbar } from 'notistack';

import api from '../../services/api';
import errorParse from '../../utils/errorParse';

const propTypes = {
  t: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  filters: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const darkPurple = '#442146';
const lightestGray = '#d4d4d4';
const lightGray = '#bdbdbd';
const white = '#ffffff';
const darkestGray = '#444444';
const blue = '#217395';

const styles = theme => ({
  today: {
    fontSize: '265px',
    color: lightestGray,
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  calendar: {
    maxWidth: '500px',
    marginTop: '15px',
    [theme.breakpoints.down('md')]: {
      margin: 'auto',
      display: 'block',
    },
    margin: 0,
    marginBottom: '70px',
    '& .react-calendar__month-view__days__day': {
      border: '0px',
      backgroundColor: 'transparent',
      fontSize: '15px',
      padding: '15px',
      marginBottom: '7px',
      color: darkestGray,
      [theme.breakpoints.down('md')]: {
        padding: '0px',
      },
    },
    '& .react-calendar__month-view__days__day abbr': {
      cursor: 'pointer',
      borderRadius: '30px',
      padding: '13px 9px',
      display: 'block',
      width: '26px',
      textAlign: 'center',
      [theme.breakpoints.down('md')]: {
        padding: '9px 4px',
      },
      backgroundColor: blue,
      color: white,
    },
    '& .react-calendar__month-view__days__day::-moz-focus-inner': {
      border: 0,
    },
    '& .react-calendar__month-view__days__day:hover abbr': {
      backgroundColor: darkPurple,
      color: white,
    },
    '& .react-calendar__month-view__days__day:disabled abbr': {
      cursor: 'initial',
      backgroundColor: 'transparent !important',
      color: lightGray,
    },
    '& .react-calendar__tile--active abbr': {
      backgroundColor: `${darkPurple} !important`,
      color: white,
    },
    '& .react-calendar__month-view__days__day--neighboringMonth': {
      color: darkestGray,
    },
    '& .react-calendar__month-view__weekdays__weekday': {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'left',
      },
      color: darkestGray,
    },
    '& .react-calendar__month-view__weekdays__weekday abbr': {
      textDecoration: 'none',
      color: darkestGray,
    },
    '& .react-calendar__month-view__weekdays': {
      paddingBottom: '20px',
      fontSize: '14px',
      marginBottom: '25px',
      borderBottom: `2px solid ${lightestGray}`,
      [theme.breakpoints.down('md')]: {
        borderBottom: 'initial',
        marginBottom: '5px',
      },
    },
    '& .react-calendar__navigation': {
      marginBottom: '15px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .react-calendar__navigation button': {
      backgroundColor: 'transparent',
      border: '0px',
    },
    '& .react-calendar__navigation__label': {
      fontSize: '22px',
      flexGrow: 'initial !important',
      color: darkestGray,
      padding: '0px 25px',
    },
    '& .react-calendar__navigation__arrow': {
      fontSize: '90px',
      cursor: 'pointer',
      color: lightGray,
      marginTop: '-15px',
    },
    '& .react-calendar__navigation__arrow:hover': {
      color: '#9f9f9f',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 20,
    },
  },
  loading: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTile: {
    margin: '0 !important',
  },
  customStartTile: {
    marginRight: '0 !important',
  },
});

class SelectDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      data: [],
      isReady: false,
      startDate: moment().tz('America/Los_Angeles'),
      minDate: moment().tz('America/Los_Angeles'),
      maxDate: moment().tz('America/Los_Angeles').add(2, 'M'),
    };
    this.fetchData = this.fetchData.bind(this);
    this.onClickDay = this.onClickDay.bind(this);
    this.checkIfEnabled = this.checkIfEnabled.bind(this);
    this.onActiveDateChange = this.onActiveDateChange.bind(this);
    this.getCustomMarigin = this.getCustomMarigin.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  onClickDay(dateSelected) {
    const { data } = this.state;
    const { onSelect } = this.props;
    const searchDate = moment(dateSelected).format('L');
    const day = data.find(group => group.date === searchDate);
    console.log('day');
    console.log(day);
    this.setState({ date: dateSelected });
    onSelect('date', { day: dateSelected, slots: day.slots });
  }

  onActiveDateChange(params) {
    const { activeStartDate } = params;
    let activeDate = moment(activeStartDate);
    if (activeDate.isBefore(moment())) {
      activeDate = moment();
    }
    this.setState({ startDate: activeDate }, this.fetchData);
  }

  getCustomMarigin({ date, view }) {
    const { classes } = this.props;
    let tile = null;
    if (view === 'month') {
      const day = moment(date);
      const startOfMonth = day.clone().startOf('month');
      if (startOfMonth.isSame(day)) {
        tile = classes.customStartTile;
      } else {
        tile = classes.customTile;
      }
    }
    return tile;
  }

  checkIfEnabled(params) {
    const { date } = params;

    const searchDate = moment(date).format('L');

    const { data } = this.state;
    const enabledDates = data.map(slot => slot.date);

    if (enabledDates.indexOf(searchDate) > -1) {
      return false;
    }
    return true;
  }

  async fetchData() {
    this.setState({ isReady: false });
    const { enqueueSnackbar, filters } = this.props;
    const { startDate } = this.state;
    const desiredDate = moment(startDate).format('YYYY-MM-DD');
    const newFilters = { desiredDate, ...filters };
    const request = async () => {
      // marker
      // const response = await api.appointments.getAvailableSlots(newFilters);
      const oneDayFromNow = moment(new Date()).add('1', 'day').format('L');
      const threeDaysFromNow = moment(new Date()).add('3', 'day').format('L');
      const sevenDaysFromNow = moment(new Date()).add('7', 'day').format('L');

      const response = {
        data: [
          {
            id: 1,
            date: oneDayFromNow,
            slots: [
              {
                id: 1,
                locationLocalTime: `${oneDayFromNow}, 2:00:00 AM`,
              },
              {
                id: 2,
                locationLocalTime: `${oneDayFromNow}, 5:00:00 AM`,
              },
              {
                id: 3,
                locationLocalTime: `${oneDayFromNow}, 4:15:00 AM`,
              },
            ],
          },
          {
            id: 2,
            date: threeDaysFromNow,
            slots: [
              {
                id: 1,
                locationLocalTime: `${threeDaysFromNow}, 2:00:00 AM`,
              },
              {
                id: 2,
                locationLocalTime: `${threeDaysFromNow}, 5:00:00 AM`,
              },
              {
                id: 3,
                locationLocalTime: `${threeDaysFromNow}, 4:15:00 AM`,
              },
            ],
          },
          {
            id: 3,
            date: sevenDaysFromNow,
            slots: [
              {
                id: 1,
                locationLocalTime: `${sevenDaysFromNow}, 2:00:00 AM`,
              },
              {
                id: 2,
                locationLocalTime: `${sevenDaysFromNow}, 5:00:00 AM`,
              },
              {
                id: 3,
                locationLocalTime: `${sevenDaysFromNow}, 4:15:00 AM`,
              },
            ],
          },
        ],
      };
      const { data } = response;
      this.setState({
        data,
        isReady: true,
      });
    };
    try {
      await request();
    } catch (error) {
      this.setState({
        data: [],
        isReady: true,
      });
      enqueueSnackbar(errorParse(error));
    }
  }

  renderLoading() {
    const { t, classes } = this.props;
    return (
      <Grid container alignItems="center" justify="center">
        <Grid xs={6} item align="center">
          <div className={classes.loading}>
            <CircularProgress />
          </div>
          <Typography align="center" variant="subtitle1">
            {t('select.time.availability')}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { t, classes } = this.props;
    const {
      date,
      isReady,
      startDate,
      minDate,
      maxDate,
    } = this.state;
    return (
      <Grid container justify="center" alignItems="center">
        <Hidden only={['xs']}>
          <Grid item xs={12} md={6}>
            <Grid container justify="center" alignItems="center">
              <Today className={classes.today} />
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          {isReady ? (
            <Calendar
              activeStartDate={new Date(startDate.format())}
              className={classes.calendar}
              minDate={new Date(minDate)}
              maxDate={new Date(maxDate)}
              tileDisabled={this.checkIfEnabled}
              tileClassName={this.getCustomMarigin}
              showNeighboringMonth={false}
              onActiveDateChange={this.onActiveDateChange}
              formatMonthYear={(locale, dateMonth) => (`${t(moment(dateMonth).format('MMMM'))} ${moment(dateMonth).format('YYYY')}`)}
              formatShortWeekday={(locale, dateDay) => (t(moment(dateDay).format('ddd')))}
              minDetail="month"
              next2Label=""
              prev2Label=""
              value={date}
              onClickDay={this.onClickDay}
            />
          ) : this.renderLoading()}
        </Grid>
      </Grid>
    );
  }
}

SelectDate.propTypes = propTypes;
const SelectDateStyled = withStyles(styles, { withTheme: true })(SelectDate);
export default withTranslation()(withSnackbar(SelectDateStyled));
