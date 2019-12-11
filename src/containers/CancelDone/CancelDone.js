import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Done } from '@material-ui/icons';


const propTypes = {
  onDone: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  sessionTxt: PropTypes.string.isRequired,
  secondsTxt: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};


const styles = () => ({
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
  done: {
    color: '#ffffff',
    fontSize: '140px',
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
});

class CancelDone extends React.Component {
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
      sessionTxt,
      secondsTxt,
    } = this.props;
    const { countdown } = this.state;
    return (
      <div className={classes.doneWrapper}>
        <Avatar className={classes.avatar}>
          <Done className={classes.done} />
        </Avatar>
        <Typography variant="h3" className={classes.h3}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h4" className={classes.h4}>
            {subtitle}
          </Typography>
        )}
        <Typography variant="body2" className={classes.h3}>
          {`${sessionTxt} ${countdown} ${secondsTxt}.`}
        </Typography>
      </div>
    );
  }
}

CancelDone.propTypes = propTypes;
export default withStyles(styles, { withTheme: true })(CancelDone);
