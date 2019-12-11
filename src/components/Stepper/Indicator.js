import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#85b2c5',
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  iconContainerActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  iconContainerCompleted: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  icon: {
    color: '#68818b',
  },
  iconActive: {
    color: theme.palette.primary.contrastText,
  },
  iconCompleted: {
    color: '#444444',
  },
  label: {
    fontWeight: 300,
    fontSize: 16,
    color: theme.palette.secondary.contrastText,
    marginLeft: 14,
  },
  labelActive: {
    color: theme.palette.secondary.contrastText,
    marginLeft: 14,
    fontSize: 16,
  },
  line: {
    borderLeft: '2px solid',
    borderColor: '#85b2c5',
    minHeight: 45,
    marginLeft: 20,
  },
  lineCompleted: {
    borderLeft: '2px solid',
    borderColor: '#FFF',
    minHeight: 45,
    marginLeft: 20,
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  last: PropTypes.bool,
  complete: PropTypes.bool,
};

const defaultProps = {
  active: false,
  last: false,
  complete: false,
};

const Indicator = ({
  icon, label, classes, active, last, complete,
}) => {
  let iconContainerStyle = classes.iconContainer;
  let iconStyle = classes.icon;
  let lineStyle = classes.line;
  let labelStyle = classes.label;

  if (active) {
    iconContainerStyle = classes.iconContainerActive;
    iconStyle = classes.iconActive;
    labelStyle = classes.labelActive;
  }

  if (complete) {
    iconContainerStyle = classes.iconContainerCompleted;
    iconStyle = classes.iconCompleted;
    lineStyle = classes.lineCompleted;
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <Grid container alignItems="center" justify="flex-start" spacing={0}>
          <Grid item>
            <div className={iconContainerStyle}>
              {React.cloneElement(icon, { className: iconStyle })}
            </div>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={labelStyle}>
              {label}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {!last && (
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="flex-start" spacing={0}>
            <Grid item>
              <div className={lineStyle} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

Indicator.propTypes = propTypes;
Indicator.defaultProps = defaultProps;
export default withStyles(styles)(Indicator);
