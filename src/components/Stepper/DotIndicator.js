import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  dot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#85b2c5',
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  dotActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  dotCompleted: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  line: {
    borderTop: '2px solid',
    borderColor: '#85b2c5',
    minWidth: 15,
  },
  lineCompleted: {
    borderTop: '2px solid',
    borderColor: '#eaeaea',
    minWidth: 15,
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  active: PropTypes.bool,
  last: PropTypes.bool,
  complete: PropTypes.bool,
};

const defaultProps = {
  active: false,
  last: false,
  complete: false,
};

const DotIndicator = ({
  classes, active, last, complete,
}) => {
  let dotStyle = classes.dot;
  let lineStyle = classes.line;

  if (active) {
    dotStyle = classes.dotActive;
  }

  if (complete) {
    dotStyle = classes.dotCompleted;
    lineStyle = classes.lineCompleted;
  }

  return (
    <Grid item>
      <Grid container alignItems="center" justify="center" spacing={0} direction="row">
        <Grid item>
          <div className={dotStyle} />
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

DotIndicator.propTypes = propTypes;
DotIndicator.defaultProps = defaultProps;
export default withStyles(styles)(DotIndicator);
