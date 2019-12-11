import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Avatar,
  Link,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ProgressiveImage from 'react-progressive-image-loading';


const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  body1: PropTypes.string.isRequired,
  body2: PropTypes.string.isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  date: PropTypes.string.isRequired,
  returnDate: PropTypes.string,
  appointmentTypeText: PropTypes.string.isRequired,
  sessionTxt: PropTypes.string.isRequired,
  secondsTxt: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const defaultProps = {
  returnDate: null,
};


const styles = theme => ({
  avatar: {
    width: '180px',
    height: '180px',
    backgroundColor: '#211023',
    backgroundImage: 'linear-gradient(to bottom right, #442146, #217395)',
    margin: 'auto',
  },
  doneWrapper: {
    textAlign: 'center',
  },
  h3: {
    fontWeight: '300',
    color: '#211023',
    margin: '30px 0px',
  },
  h4: {
    fontWeight: '300',
    color: '#211023',
    margin: '20px 0px 20px 0px',
  },
  h5: {
    color: '#211023',
    fontWeight: '300',
  },
  appointmentTypeText: {
    marginTop: 20,
    fontWeight: '300 !important',
  },
  dateText: {
    marginBottom: 20,
    fontWeight: '300 !important',
  },
  locationText: {
    marginTop: 20,
    marginBottom: 20,
  },
  link: {
    color: theme.palette.secondary.main,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});

class ConfirmDone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 120,
    };
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    this.secondsRemaining = 120;
    this.intervalHandle = null;
    this.startCountDown();
  }

  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.secondsRemaining = 120;
  }

  tick() {
    const { onDone } = this.props;
    const sec = this.secondsRemaining - 1;
    this.setState({ countdown: sec });
    if (sec === 0) {
      onDone();
    }
    this.secondsRemaining = this.secondsRemaining - 1;
  }

  render() {
    const {
      classes,
      title,
      subtitle,
      body1,
      body2,
      location,
      date,
      returnDate,
      appointmentTypeText,
      sessionTxt,
      secondsTxt,
    } = this.props;
    const { countdown } = this.state;
    return (
      <div className={classes.doneWrapper}>
        <Typography variant="h4" className={classes.h3}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.appointmentTypeText}>
          {appointmentTypeText}
        </Typography>
        <Typography variant="h5" className={(returnDate) ? classes.h5 : classes.dateText}>
          {date}
        </Typography>
        {returnDate && (
          <Typography variant="h5" className={classes.dateText}>
            {returnDate}
          </Typography>
        )}
        <ProgressiveImage
          preview={location.thumbnail}
          src={location.thumbnail}
          render={
            (src, style) => (
              <Avatar
                className={classes.avatar}
                style={style}
                src={src}
              />
            )
          }
        />
        <div className={classes.locationText}>
          <Typography variant="h5" className={classes.h5}>
            {location.address}
          </Typography>
          <Typography variant="h5" className={classes.h5}>
            {`${location.name}, ${location.state} ${location.zip}`}
          </Typography>
          <Typography variant="h5" className={classes.h5}>
            {location.phone}
          </Typography>
        </div>
        <Typography variant="h5" className={classes.h5}>
          {subtitle}
        </Typography>
        <Typography variant="h5" className={classes.h5}>
          {body1}
        </Typography>
        <Typography variant="body2" className={classes.h3}>
          {`${sessionTxt} ${countdown} ${secondsTxt}.`}
        </Typography>
      </div>
    );
  }
}

ConfirmDone.propTypes = propTypes;
ConfirmDone.defaultProps = defaultProps;
export default withStyles(styles, { withTheme: true })(ConfirmDone);
