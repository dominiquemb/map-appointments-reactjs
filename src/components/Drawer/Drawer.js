import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Drawer as MuiDrawer, Hidden, ListItem } from '@material-ui/core';

// import logo from '../../assets/images/logo.png';


const styles = theme => ({
  logo: {
    display: 'block',
    margin: '0 auto',
  },
  logoContainer: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: 20,
    marginTop: 15,
  },
  drawerPaper: {
    borderRight: 0,
    width: theme.drawer.width,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
    backgroundColor: theme.palette.secondary.main,
  },
});

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const Drawer = ({
  classes,
  children,
}) => (
  <Hidden mdDown>
    <MuiDrawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
      <ListItem className={classes.logoContainer} disableGutters>
        {/* <img src={logo} width="120px" className={classes.logo} alt="Logo" /> */}
      </ListItem>
      {children}
    </MuiDrawer>
  </Hidden>
);

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;
const DrawerStyled = withStyles(styles, { withTheme: true })(Drawer);
export default withRouter(DrawerStyled);
