import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar as MuiAppBar, Toolbar, Hidden, Typography,
} from '@material-ui/core';
import {
  LocationOn, Today, WatchLater, AccountCircle,
} from '@material-ui/icons';

// import logo from '../../assets/images/logo.png';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const styles = theme => ({
  barRoot: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      marginTop: 35,
    },
  },
  appBar: {
    backgroundColor: '#444444',
    color: '#FFFFFF',
    width: 'auto',
    [theme.breakpoints.up('lg')]: {
      margin: 10,
    },
  },
  logo: {
    marginRight: 10,
  },
  appbarText: {
    marginRight: 25,
  },
  icon: {
    marginRight: 5,
  },
  title: {
    flexGrow: 1,
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
};

const defaultProps = {
  name: '-',
  title: '-',
  location: '-',
  date: '-',
  time: '-',
};

const AppBar = ({
  classes, title, name, location, date, time,
}) => (
  <MuiAppBar className={classes.appBar} position="static" color="default">
    <Toolbar className={classes.toolbar}>
      <Hidden lgUp>
        {/* <img src={logo} className={classes.logo} width="50px" alt="Logo" /> */}
        <Typography className={classes.title} variant="h6" color="inherit">
          {title}
        </Typography>
        <LanguageSelector small selected="EN" />
      </Hidden>
      <Hidden mdDown>
        <AccountCircle className={classes.icon} />
        <Typography className={classes.appbarText} variant="h6" color="inherit">
          {name}
        </Typography>
        <LocationOn className={classes.icon} />
        <Typography className={classes.appbarText} variant="h6" color="inherit">
          {location}
        </Typography>
        <Today className={classes.icon} />
        <Typography className={classes.appbarText} variant="h6" color="inherit">
          {date}
        </Typography>
        <WatchLater className={classes.icon} />
        <Typography className={classes.appbarText} variant="h6" color="inherit">
          {time}
        </Typography>
      </Hidden>
    </Toolbar>
  </MuiAppBar>
);

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;
export default withStyles(styles, { withTheme: true })(AppBar);
