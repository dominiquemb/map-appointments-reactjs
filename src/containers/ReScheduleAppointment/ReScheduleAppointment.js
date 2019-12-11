import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Avatar,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  date: PropTypes.string.isRequired,
  onReSchedule: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  cancelTxt: PropTypes.string.isRequired,
  reScheduleTxt: PropTypes.string.isRequired,
  appointmentTypeText: PropTypes.string.isRequired,
};

const styles = theme => ({
  avatarContainer: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '20px',
    },
  },
  avatar: {
    width: '155px',
    height: '155px',
  },
  reSchedule: {
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '15px',
    },
  },
  cancel: {
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '15px',
    },
  },
  confirmWrapper: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    padding: '50px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
      marginBottom: 60,
    },
  },
  confirmDetailsText: {
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  confirmText: {
    display: 'inline-block',
    textAlign: 'left',
    marginTop: '0px',
  },
  confirmDetails: {
    marginTop: '30px',
  },
  h4: {
    fontWeight: '300',
    color: '#211023',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  h5: {
    fontWeight: '300',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  dateText: {
    fontWeight: '300',
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  appointmentAddressContainer: {
    padding: '25px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  controlButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});

const ReScheduleAppointment = ({
  classes,
  location,
  date,
  onReSchedule,
  onCancel,
  title,
  cancelTxt,
  reScheduleTxt,
  appointmentTypeText,
}) => (
  <div className={classes.confirmWrapper}>
    <div className={classes.confirmText}>
      <div className={classes.confirmTitle}>
        <Typography variant="h4" align="center" className={classes.h4}>
          {title}
        </Typography>
      </div>
      <div className={classes.confirmDetails}>
        <Grid container alignItems="center" className={classes.confirmDetailsText}>
          <Grid item>
            <Avatar className={classes.avatar} src={location.thumbnail} />
          </Grid>
          <Grid item className={classes.appointmentAddressContainer}>
            <Typography variant="h5" className={classes.h5}>
              {appointmentTypeText}
            </Typography>
            <Typography variant="h5" className={classes.dateText}>
              {date}
            </Typography>
            <Typography variant="h5" className={classes.h5}>
              {location.address}
            </Typography>
            <Typography variant="h5" className={classes.h5}>
              {`${location.name}, ${location.state} ${location.zip}`}
            </Typography>
            <Typography variant="h5" className={classes.h5}>
              {location.phone}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
    <Grid container alignItems="center" justify="space-between">

      <Grid item xs={12} md={6} className={classes.cancel}>
        <Button size="large" variant="outlined" color="primary" onClick={onCancel} className={classes.controlButton}>
          {cancelTxt}
        </Button>
      </Grid>
      <Grid item xs={12} md={6} className={classes.reSchedule} align="center">
        <Button size="large" variant="contained" color="primary" onClick={onReSchedule} className={classes.controlButton}>
          {reScheduleTxt}
        </Button>
      </Grid>
    </Grid>
  </div>
);

ReScheduleAppointment.propTypes = propTypes;
export default withStyles(styles, { withTheme: true })(ReScheduleAppointment);
