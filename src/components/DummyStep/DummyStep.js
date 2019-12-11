import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  title: {
    fontSize: 80,
    lineHeight: 1,
    color: '#CCCCCC',
  },
});

const propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  callback: PropTypes.func.isRequired,
};

const DummyStep = ({ title, classes, callback }) => (
  <div>
    <p className={classes.title}>{title}</p>
    <Button
      variant="contained"
      color="primary"
      onClick={callback}
    >
      Callback
    </Button>
  </div>
);

DummyStep.propTypes = propTypes;
export default withStyles(styles, { withTheme: true })(DummyStep);
