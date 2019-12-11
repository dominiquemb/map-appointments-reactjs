import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

// import logo from '../../assets/images/logo.png';

const styles = theme => ({
  container: {
    minHeight: '100vh',
  },
  downloadButton: {
    marginBottom: '20px',
  },
  paper: {
    width: '500px',
    padding: theme.spacing.unit * 3,
    '@media (max-width: 320px)': {
      width: '240px',
    },
    '@media (max-width: 240px)': {
      width: '255px',
    },
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
  recommendText: {
    padding: '30px 0px',
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

class UnsupportedBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid justify="center" alignItems="center" className={classes.container} container>
        <Paper className={classes.paper}>
          <div className={classes.logoContainer}>
            <Typography align="center">
              {/* <img src={logo} alt="Logo" className={classes.logo} /> */}
            </Typography>
          </div>
          <Typography align="center" justify="center" variant="h4">
            Your browser is not supported.
          </Typography>
          <Typography align="center" justify="center" variant="h5" className={classes.recommendText}>
            We recommend that you use the latest version of Google Chrome.
          </Typography>
          <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
            <Button
              className={classes.downloadButton}
              type="submit"
              variant="contained"
              fullWidth={false}
            >
                Download Chrome
            </Button>
          </a>
        </Paper>
      </Grid>
    );
  }
}

UnsupportedBrowser.propTypes = propTypes;
export default withStyles(styles, { withTheme: true })(UnsupportedBrowser);
