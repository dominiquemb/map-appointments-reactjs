import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Hidden,
} from '@material-ui/core';
import { WatchLater } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { withSnackbar } from 'notistack';

import api from '../../services/api';
import errorParse from '../../utils/errorParse';


const propTypes = {
  t: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  selectedTime: PropTypes.oneOfType([PropTypes.object]),
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  slots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const defaultProps = {
  selectedTime: null,
};

const lightestGray = '#d4d4d4';

const styles = theme => ({
  container: {
    margin: '30px',
    alignSelf: 'flex-start',
  },
  watchLater: {
    fontSize: '265px',
    color: lightestGray,
  },
  buttonContainer: {
    [theme.breakpoints.down('md')]: {
      padding: '25px',
    },
  },
  fullWidthButton: {
    padding: '15px 18px',
    color: '#444444',
    textAlign: 'left',
    width: '100%',
    margin: '5px',
    marginBottom: '5px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&:hover': {
      backgroundColor: '#211023',
      color: '#ffffff !important',
    },
    '&:hover h6': {
      color: '#ffffff !important',
    },
    '&:hover subtitle1': {
      color: '#ffffff !important',
    },
  },
  button: {
    padding: '15px 18px',
    color: '#444444',
    textAlign: 'left',
    width: '80%',
    margin: '5px',
    marginBottom: '5px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&:hover': {
      backgroundColor: '#211023',
      color: '#ffffff !important',
    },
    '&:hover h6': {
      color: '#ffffff !important',
    },
    '&:hover subtitle1': {
      color: '#ffffff !important',
    },
  },
  selectedButton: {
    backgroundColor: '#211023',
    color: '#ffffff !important',
  },
  item: {
    textAlign: 'left',
  },
  h6: {
    fontSize: '16px',
    textTransform: 'none',
    fontWeight: 'bold',
    lineHeight: '1.3',
    '&:hover': {
      color: '#ffffff',
    },
  },
  subtitle1: {
    textTransform: 'none',
    fontSize: '13px',
    lineHeight: '1.3',
    '&:hover': {
      color: '#ffffff',
    },
  },
  selectedButtonText: {
    color: '#ffffff !important',
  },
  resultsContainer: {
    height: '448px',
    overflow: 'auto',
  },
  loading: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hsatText: {
    marginBottom: 20,
    padding: 10,
  },
  hsatTextColor: {
    color: '#444444',
  },
  hsatColumn: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mobileReturnHeader: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: '17px',
    },
  },
  returnTime: {
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px',
    },
  },
  selectTimeContainer: {
    padding: '30px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
    },
  },
  hsatRow: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    margin: '5px 0px',
  },
});


const extractHour = time => (
  moment(time).utc().format('h:mm A')
);

const extractTrainingTime = (t, time) => (
  `${t(moment(time).utc().format('ddd'))}, ${t(moment(time).utc().format('MMM'))} ${moment(time).utc().format('D, h:mm A')}`
);

const extractReturn = (t, time) => (
  `${t(moment(time).utc().format('ddd'))}, ${t(moment(time).utc().format('MMM'))} ${moment(time).utc().format('D, h:mm A')}`
);

class SelectTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: props.selectedTime,
      data: [],
      isReady: false,
      hasLinkedSlot: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchReturnSlots = this.fetchReturnSlots.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  getContent() {
    const { t, classes } = this.props;
    const {
      isReady,
      data,
      selectedTime,
      hasLinkedSlot,
    } = this.state;
    console.log(data);
    let content = this.renderLoading();
    if (isReady) {
      if (data.length > 0) {
        if (hasLinkedSlot) {
          content = (
            data.map(pair => (
              <Grid item xs={12} align="center" justify="center" key={pair[0].id} className={classes.hsatRow}>
                <Fragment>
                  <Grid container justify="center" align="center">

                    <Hidden only={['xs', 'sm']}>
                      <Grid className={classes.hsatColumn} item align="center" justify="center">
                        {`${t('select.time.training')}:`}
                      </Grid>
                      <Grid className={classes.hsatColumn} item align="center" justify="center">
                        {`${t('select.time.return')}:`}
                      </Grid>
                    </Hidden>

                    <Hidden only={['md', 'lg', 'xl']}>
                      <Grid className={classes.hsatColumn} item align="center" justify="center">
                        {`${t('select.time.training')}:`}
                      </Grid>
                    </Hidden>

                    <Grid className={classes.hsatColumn} item align="center" justify="center">
                      <Button
                        fullWidth
                        className={
                            (selectedTime === pair[0].id)
                              ? `${classes.button} ${classes.selectedButton}`
                              : `${classes.button}`
                          }
                        onClick={() => this.handleSelect(pair[0], pair[1])}
                      >
                        {`${extractTrainingTime(t, pair[0].locationLocalTime)}`}
                      </Button>
                    </Grid>


                    <Hidden only={['md', 'lg', 'xl']}>
                      <Grid className={classes.mobileReturnHeader} item align="center" justify="center">
                        {`${t('select.time.return')}:`}
                      </Grid>
                    </Hidden>

                    <Grid className={classes.hsatColumn} item align="center" justify="center">
                      <Button
                        fullWidth
                        className={
                            (selectedTime === pair[0].id)
                              ? `${classes.button} ${classes.selectedButton}`
                              : `${classes.button}`
                          }
                        onClick={() => this.handleSelect(pair[0], pair[1])}
                      >
                        {`${extractReturn(t, pair[1].locationLocalTime)}`}
                      </Button>
                    </Grid>
                  </Grid>
                </Fragment>
              </Grid>
            ))
          );
        } else {
          content = (
            data.map(time => (
              <Grid item xs={12} align="center" key={time.id}>
                <Button
                  fullWidth
                  variant="contained"
                  className={
                    (selectedTime === time.id)
                      ? `${classes.button} ${classes.selectedButton}`
                      : `${classes.button}`
                  }
                  onClick={() => this.handleSelect(time)}
                >
                  {extractHour(time.locationLocalTime)}
                </Button>
              </Grid>
            ))
          );
        }
      } else {
        content = this.renderEmpty();
      }
    }
    return content;
  }

  fetchReturnSlots = async (slots) => {
    const slotsIds = slots.map(s => s.id);
    const linkedIds = slots.map(s => s.linkedSlot);
    const ids = slotsIds.concat(linkedIds);
    const response = await api.appointments.getReturnSlots({ ids });
    const { data } = response;
    return data;
  }

  handleSelect(time, returnTime = null) {
    const { onSelect } = this.props;
    onSelect('time', time);
    if (returnTime !== null) {
      onSelect('returnTime', returnTime);
    }
    this.setState({
      selectedTime: time.id,
    });
  }

  async fetchData() {
    this.setState({ isReady: false });
    const { enqueueSnackbar, slots } = this.props;
    const request = async () => {
      const data = slots;
      // const hasLinkedSlot = slots.find(slot => (slot.linkedSlot !== null));
      // if (hasLinkedSlot) {
      //   data = await this.fetchReturnSlots(slots);
      // }

      this.setState({
        data,
        isReady: true,
        hasLinkedSlot: false,
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
      <Grid xs={6} item align="center">
        <div className={classes.loading}>
          <CircularProgress />
        </div>
        <Typography align="center" variant="subtitle1">
          {t('select.time.availability')}
        </Typography>
      </Grid>
    );
  }

  renderEmpty() {
    const { t } = this.props;
    return (
      <div>
        <Typography align="center" variant="subtitle1">
          {t('select.time.results')}
        </Typography>
      </div>
    );
  }

  render() {
    const { t, classes } = this.props;
    const { hasLinkedSlot } = this.state;
    return (
      <Grid container justify="center" alignItems="center" className={classes.selectTimeContainer}>
        <Hidden only={['xs']}>
          <Grid item xs={12} md={6}>
            <Grid container justify="center" alignItems="center">
              <WatchLater className={classes.watchLater} />
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6} className={classes.buttonContainer}>
          {hasLinkedSlot && (
            <Grid container alignItems="center" justify="center" className={classes.hsatText}>
              <Typography align="justify" variant="subtitle2" className={classes.hsatTextColor}>
                {t('select.time.returntime')}
              </Typography>
            </Grid>
          )}
          <Grid container alignItems="center" justify="center">
            {this.getContent()}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SelectTime.propTypes = propTypes;
SelectTime.defaultProps = defaultProps;
const SelectTimeStyled = withStyles(styles, { withTheme: true })(SelectTime);
export default withTranslation()(withSnackbar(SelectTimeStyled));
