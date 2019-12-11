import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import {
  Grid, Paper, Button, Typography,
} from '@material-ui/core';

// import logo from '../assets/images/logo.png';

const styles = theme => ({
  btn: {
    marginTop: '10px',
  },
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
  content: {
    margin: '15px 0',
  },
});

const propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const LoginPage = ({ classes, t }) => (
  <Grid justify="center" alignItems="center" className={classes.container} container>
    <Paper className={classes.paper}>
      <div className={classes.logoContainer}>
        <Typography align="center">
          {/* <img src={logo} alt="Logo" className={classes.logo} /> */}
        </Typography>
      </div>
      <Fragment>
        <Typography variant="h6">
          {t('login.contact.support')}
        </Typography>
        <Typography className={classes.content}>
          {t('login.technical.problem')}
        </Typography>
        <Link
          to="/login"
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.btn}
          >
            {t('login.go.back.to.login')}
          </Button>
        </Link>
      </Fragment>
    </Paper>
  </Grid>
);

LoginPage.propTypes = propTypes;
const LoginPageStyled = withStyles(styles, { withTheme: true })(LoginPage);
const LoginPageTranslated = withTranslation()(LoginPageStyled);
export default LoginPageTranslated;
