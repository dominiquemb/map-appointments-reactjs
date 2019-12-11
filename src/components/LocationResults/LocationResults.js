import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ProgressiveImage from 'react-progressive-image-loading';
import withAuth from '../../context/withAuth';

const propTypes = {
  selectionHandler: PropTypes.func,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  preloading: PropTypes.bool,
  locations: PropTypes.oneOfType([PropTypes.array]).isRequired,
  selectedLocation: PropTypes.number,
};

const defaultProps = {
  selectionHandler: null,
  preloading: false,
  selectedLocation: null,
};

const styles = theme => ({
  container: {
    margin: '30px',
    alignSelf: 'flex-start',
  },
  mobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  nonmobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  buttonContent: {
    flexWrap: 'wrap',
  },
  avatarContainer: {
    width: '70px',
    display: 'flex-item',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px',
    },
  },
  buttonTextContainer: {
    flexGrow: '1',
    display: 'flex-item',
  },
  loadingWrapper: {
    display: 'flex',
    height: '500px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '15px 18px',
    color: '#444444',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
    marginBottom: '5px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#211023',
      color: '#ffffff !important',
    },
    '&:hover h6': {
      color: '#ffffff !important',
    },
    '&:hover subtitle1': {
      color: '#ffffff !important',
    },
  },
  selectedButton: {
    backgroundColor: '#211023',
    color: '#ffffff !important',
  },
  avatar: {
    width: '55px',
    height: '55px',
    marginRight: '10px',
  },
  item: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  h6: {
    fontSize: '16px',
    textTransform: 'none',
    fontWeight: 'bold',
    lineHeight: '1.3',
    whiteSpace: 'normal',
    '&:hover': {
      color: '#ffffff',
    },
  },
  subtitle1: {
    textTransform: 'none',
    fontSize: '13px',
    lineHeight: '1.3',
    whiteSpace: 'normal',
    '&:hover': {
      color: '#ffffff',
    },
  },
  selectedButtonText: {
    color: '#ffffff !important',
  },
  resultsContainer: {
    height: '448px',
    overflow: 'auto',
  },
  resultsContainerPreloading: {
    height: '0px',
    overflow: 'hidden',
  },
});

const LocationResults = ({
  locations: data,
  selectionHandler,
  selectedLocation,
  preloading,
  classes,
}) => (
  <div className={
    (preloading)
      ? classes.resultsContainerPreloading
      : classes.resultsContainer}
  >
    {data.length > 0 && (data.map(location => (
      <Button
        key={location.id}
        variant="contained"
        fullWidth
        className={
          (selectedLocation === location.id)
            ? `${classes.button} ${classes.selectedButton}`
            : `${classes.button}`
              }
        onClick={() => selectionHandler(location)}
      >
        <Grid container justify="flex-start" className={classes.buttonContent}>
          <div className={classes.avatarContainer}>
            <ProgressiveImage
              preview={location.thumbnail}
              src={location.thumbnail}
              render={(src, style) => <Avatar className={classes.avatar} style={style} src={src} />}
            />
          </div>
          <div className={classes.buttonTextContainer}>
            <Typography
              variant="h6"
              display="block"
              noWrap
              className={
                (selectedLocation === location.id)
                  ? `${classes.h6} ${classes.selectedButtonText}`
                  : `${classes.h6}`
              }
            >
              {location.name}

            </Typography>
            <Typography
              variant="subtitle1"
              display="block"
              noWrap
              className={
                (selectedLocation === location.id)
                  ? `${classes.subtitle1} ${classes.selectedButtonText}`
                  : `${classes.subtitle1}`
                    }
            >
              {location.address}

            </Typography>
            <Typography
              variant="subtitle1"
              display="block"
              noWrap
              className={
                (selectedLocation === location.id)
                  ? `${classes.subtitle1} ${classes.selectedButtonText}`
                  : `${classes.subtitle1}`
                    }
            >
              {location.city}
            </Typography>
          </div>
        </Grid>
      </Button>
    )))}
  </div>
);

LocationResults.propTypes = propTypes;
LocationResults.defaultProps = defaultProps;
export default withStyles(styles, { withTheme: true })(withAuth(LocationResults));
