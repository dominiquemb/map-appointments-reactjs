import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Avatar,
  Hidden,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ProgressiveImage from 'react-progressive-image-loading';
import GoogleMap from '../../components/GoogleMap/GoogleMap';

const propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  date: PropTypes.string.isRequired,
  returnDate: PropTypes.string,
  appointmentTypeText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  returnDate: null,
};

const styles = () => ({
  container: {
    margin: '30px',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: '155px',
    height: '155px',
  },
  avatarContainer: {
    padding: 40,
  },
  mapContainer: {
    marginTop: '50px',
  },
  confirmDetailsText: {
    justifyContent: 'center',
  },
  confirmText: {
    display: 'flex',
    textAlign: 'center',
    paddingTop: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  confirmDetails: {
    width: '100%',
    textAlign: 'center',
  },
  confirmTitle: {
    width: '100%',
    textAlign: 'center',
  },
  appointmentTypeText: {
    marginTop: 30,
    fontWeight: '300 !important',
  },
  h4: {
    fontWeight: '300',
    color: '#211023',
  },
  h5: {
    fontWeight: '300',
  },
});

class ConfirmAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapZoomLevel: 14,
      mobileMapZoomLevel: 13,
    };
  }

  onMount = (ref) => {
    if (ref) {
      this.map = ref;
    }
  }

  render() {
    const { mapZoomLevel, mobileMapZoomLevel } = this.state;
    const {
      classes, location, date, title, returnDate, appointmentTypeText,
    } = this.props;
    return (
      <Grid container justify="center" spacing={40} alignItems="center" classes={{ container: classes.container }}>
        <Hidden only={['xs', 'sm']}>
          <Grid item xs={12} md={6}>
            <GoogleMap
              zoom={mapZoomLevel}
              height="500px"
              markers={[location]}
              onMount={this.onMount}
              coordinates={location.coordinates}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.confirmText}>
              <div className={classes.confirmTitle}>
                <Typography variant="h4" className={classes.h4}>
                  {title}
                </Typography>
                <Typography variant="h5" className={classes.appointmentTypeText}>
                  {appointmentTypeText}
                </Typography>
                <Typography variant="h5" className={classes.h5}>
                  {date}
                </Typography>
                {returnDate && (
                  <Typography variant="h5" className={classes.h5}>
                    {returnDate}
                  </Typography>
                )}
              </div>
              <div className={classes.confirmDetails}>
                <Grid container alignItems="center" justify="center" className={classes.confirmDetailsText}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={40} alignItems="center" className={classes.avatarContainer}>
                      <ProgressiveImage
                        preview={location.thumbnail}
                        src={location.thumbnail}
                        render={
                          (src, style) => (
                            <Avatar
                              className={classes.avatar}
                              style={style}
                              src={src}
                            />
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" className={classes.h5}>
                      {location.address}
                    </Typography>
                    <Typography variant="h5" className={classes.h5}>
                      {`${location.name}, ${location.state} ${location.zip}`}
                    </Typography>
                    <Typography variant="h5" className={classes.h5}>
                      {location.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Hidden>
        <Hidden only={['md', 'lg', 'xl']}>
          <Grid item xs={12}>
            <div className={classes.confirmText}>
              <div className={classes.confirmTitle}>
                <Typography variant="h4" className={classes.h4}>
                  {title}
                </Typography>
                <Typography variant="h5" className={classes.appointmentTypeText}>
                  {appointmentTypeText}
                </Typography>
                <Typography variant="h5" className={classes.h5}>
                  {date}
                </Typography>
                {returnDate && (
                  <Typography variant="h5" className={classes.h5}>
                    {returnDate}
                  </Typography>
                )}
              </div>
              <div className={classes.confirmDetails}>
                <Grid container alignItems="center" justify="center" className={classes.confirmDetailsText}>
                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={40} alignItems="center" className={classes.avatarContainer}>
                      <ProgressiveImage
                        preview={location.thumbnail}
                        src={location.thumbnail}
                        render={(src, style) => (
                          <Avatar
                            className={classes.avatar}
                            style={style}
                            src={src}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" className={classes.h5}>
                      {location.address}
                    </Typography>
                    <Typography variant="h5" className={classes.h5}>
                      {`${location.name}, ${location.state} ${location.zip}`}
                    </Typography>
                    <Typography variant="h5" className={classes.h5}>
                      {location.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <GoogleMap
              zoom={mobileMapZoomLevel}
              height="170px"
              markers={[location]}
              onMount={this.onMount}
              coordinates={location.coordinates}
            />
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

ConfirmAppointment.propTypes = propTypes;
ConfirmAppointment.defaultProps = defaultProps;
export default withStyles(styles, { withTheme: true })(ConfirmAppointment);
