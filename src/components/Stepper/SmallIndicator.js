import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#85b2c5',
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  iconContainerActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  iconContainerCompleted: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  icon: {
    color: '#68818b',
    fontSize: 20,
  },
  iconActive: {
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
  iconCompleted: {
    color: '#444444',
    fontSize: 20,
  },
  line: {
    borderTop: '2px solid',
    borderColor: '#85b2c5',
    minWidth: 25,
  },
  lineCompleted: {
    borderTop: '2px solid',
    borderColor: '#eaeaea',
    minWidth: 25,
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.object]).isRequired,
  active: PropTypes.bool,
  last: PropTypes.bool,
  complete: PropTypes.bool,
};

const defaultProps = {
  active: false,
  last: false,
  complete: false,
};

const SmallIndicator = ({
  icon, classes, active, last, complete,
}) => {
  let iconContainerStyle = classes.iconContainer;
  let iconStyle = classes.icon;
  let lineStyle = classes.line;

  if (active) {
    iconContainerStyle = classes.iconContainerActive;
    iconStyle = classes.iconActive;
  }

  if (complete) {
    iconContainerStyle = classes.iconContainerCompleted;
    iconStyle = classes.iconCompleted;
    lineStyle = classes.lineCompleted;
  }

  return (
    <Grid item>
      <Grid container alignItems="center" justify="center" spacing={0} direction="row">
        <Grid item>
          <div className={iconContainerStyle}>
            {React.cloneElement(icon, { className: iconStyle })}
          </div>
        </Grid>
        {!last && (
          <Grid item>
            <Grid container alignItems="center" justify="flex-start" spacing={0}>
              <Grid item>
                <div className={lineStyle} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

SmallIndicator.propTypes = propTypes;
SmallIndicator.defaultProps = defaultProps;
export default withStyles(styles)(SmallIndicator);
