import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { Grid, Paper, Typography } from '@material-ui/core';

import LoginForm from '../containers/LoginForm/LoginForm';
// import logo from '../assets/images/logo.png';

const styles = theme => ({
  container: {
    minHeight: '100vh',
  },
  paper: {
    width: '280px',
    padding: theme.spacing.unit * 3,
    '@media (max-width: 320px)': {
      width: '240px',
    },
    '@media (max-width: 240px)': {
      width: '255px',
    },
  },
  logoContainer: {
    marginTop: '-135px',
    marginLeft: '-24px',
    marginRight: '-24px',
    marginBottom: '8px',
    padding: '40px',
  },
  logo: {
    width: '150px',
  },
});

const propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const LoginPage = ({
  match,
  classes,
  history,
}) => (
  <Grid justify="center" alignItems="center" className={classes.container} container>
    <Paper className={classes.paper}>
      <div className={classes.logoContainer}>
        <Typography align="center">
          {/* <img src={logo} alt="Logo" className={classes.logo} /> */}
        </Typography>
      </div>
      <LoginForm
        match={match}
        history={history}
      />
    </Paper>
  </Grid>
);

LoginPage.propTypes = propTypes;
const LoginPageStyled = withStyles(styles, { withTheme: true })(LoginPage);
const LoginPageTranslated = withTranslation()(LoginPageStyled);
export default LoginPageTranslated;
