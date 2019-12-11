import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

import withScheduler from '../../context/withScheduler';

const styles = theme => ({
  container: {
    flex: '0 0 auto',
    backgroundColor: theme.palette.background.default,
    padding: 15,
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    paddingLeft: 250,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 15,
    },
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  nextContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const propTypes = {
  t: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  scheduler: PropTypes.oneOfType([PropTypes.object]).isRequired,
  children: PropTypes.node,
  confirmed: PropTypes.bool,
  disableNext: PropTypes.bool,
};

const defaultProps = {
  children: null,
  confirmed: false,
  disableNext: false,
};

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      t,
      classes,
      onSubmit,
      children,
      scheduler,
      confirmed,
      onConfirm,
      disableNext,
    } = this.props;
    const activeStep = scheduler.getCurrentStep();
    const totalSteps = scheduler.getTotalSteps();
    const lastStep = totalSteps === activeStep;
    const showBackBtn = activeStep > 0;
    const showNextBtn = activeStep < totalSteps;

    return (
      <Grid
        container
        alignItems="center"
        justify="space-between"
        classes={{ container: classes.container }}
      >
        <Grid item xs={4}>
          {showBackBtn && !confirmed && (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={scheduler.back}
            >
              {t('controls.back')}
            </Button>
          )}
        </Grid>
        <Grid item xs={4}>
          {children}
        </Grid>
        <Grid item xs={4}>
          {showNextBtn && !confirmed && !lastStep && (
            <div className={classes.nextContainer}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={async () => {
                  await onSubmit();
                  scheduler.next();
                }}
                disabled={disableNext}
              >
                {t('controls.next')}
              </Button>
            </div>
          )}
          {lastStep && !confirmed && (
            <div className={classes.nextContainer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={async () => {
                  await onConfirm();
                }}
                disabled={disableNext}
              >
                {t('controls.confirm')}
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;
const ControlsStyled = withStyles(styles)(Controls);
const ControlsTranslated = withTranslation()(withScheduler(ControlsStyled));
export default ControlsTranslated;
