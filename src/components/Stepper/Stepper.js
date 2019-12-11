import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import withScheduler from '../../context/withScheduler';
import Indicator from './Indicator';
import SmallIndicator from './SmallIndicator';
import DotIndicator from './DotIndicator';

const styles = () => ({
  container: {
    paddingLeft: 33,
    paddingTop: 43,
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  scheduler: PropTypes.oneOfType([PropTypes.object]).isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    }),
  ).isRequired,
};

class Stepper extends React.Component {
  componentWillMount() {
    const { scheduler, steps } = this.props;
    scheduler.setTotalSteps(steps.length);
  }

  render() {
    const { steps, classes, scheduler } = this.props;
    const activeStep = scheduler.getCurrentStep();
    const totalSteps = scheduler.getTotalSteps();

    return (
      <Fragment>
        <Hidden only={['xs', 'sm', 'md']}>
          <Grid
            container
            classes={{ container: classes.container }}
            spacing={0}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {steps.map(step => (
              <Indicator
                key={step.index}
                label={step.label}
                icon={step.icon}
                active={step.overrideActive ? step.isActive : step.index === activeStep}
                last={totalSteps === step.index}
                complete={activeStep > step.index}
              />
            ))}
          </Grid>
        </Hidden>
        <Hidden only={['xs', 'lg', 'xl']}>
          <Grid container spacing={0} direction="row" justify="center" alignItems="center">
            {steps.map(step => (
              <SmallIndicator
                key={step.index}
                label={step.label}
                icon={step.icon}
                active={step.overrideActive ? step.isActive : step.index === activeStep}
                last={totalSteps === step.index}
                complete={activeStep > step.index}
              />
            ))}
          </Grid>
        </Hidden>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <Grid container spacing={0} direction="row" justify="center" alignItems="center">
            {steps.map(step => (
              <DotIndicator
                key={step.index}
                label={step.label}
                icon={step.icon}
                active={step.overrideActive ? step.isActive : step.index === activeStep}
                last={totalSteps === step.index}
                complete={activeStep > step.index}
              />
            ))}
          </Grid>
        </Hidden>
      </Fragment>
    );
  }
}

Stepper.propTypes = propTypes;
export default withStyles(styles)(withScheduler(Stepper));
