import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import logo from '../assets/images/icon-page-not-found.png';

const styles = () => ({
  container: {
    minHeight: '100vh',
  },
  content: {
    paddingLeft: 50,
    '@media (max-width: 600px)': {
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 80,
    lineHeight: 1,
    color: '#CCCCCC',
  },
  subTitle: {
    fontSize: 28,
    lineHeight: 2,
    color: '#CCCCCC',
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const Page404 = ({ classes }) => (
  <Grid justify="center" alignItems="center" className={classes.container} container>
    <img src={logo} alt="404-logo" />
    <div className={classes.content}>
      <Typography className={classes.title} component="h2">
        404
      </Typography>
      <Typography className={classes.subTitle} component="h3">
        Page not Found
      </Typography>
    </div>
  </Grid>
);

Page404.propTypes = propTypes;
export default withStyles(styles, { withTheme: true })(Page404);
