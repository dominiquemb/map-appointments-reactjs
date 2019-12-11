import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import * as geolib from 'geolib';
import isMobile from '../../utils/isMobile';
// import api from '../../services/api';
import LocationsJson from '../../pages/Locations';

import LocationSearchForm from '../../components/LocationSearchForm/LocationSearchForm';
import LocationResults from '../../components/LocationResults/LocationResults';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import errorParse from '../../utils/errorParse';

import Storage from '../../services/storage';

const propTypes = {
  t: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  location: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updatePreloadData: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  preloadData: PropTypes.oneOfType([PropTypes.array]),
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const defaultProps = {
  preloadData: [],
  location: false,
};

function processResults(data) {
  let markersArray = [];
  let returnResults = {};

  if ('results' in data) {
    if (data.results.length > 0) {
      markersArray = data.results.map((result) => {
        if ('coordinates' in result) {
          if ('lng' in result.coordinates && 'lat' in result.coordinates) {
            returnResults = {
              coordinates: {
                lng: result.coordinates.lng,
                lat: result.coordinates.lat,
              },
              id: result.id,
              name: result.name,
              address: result.address,
              zip: result.zip,
              city: result.city,
              phone: result.phone,
              state: result.state.slice(0, 2).toUpperCase(),
            };
          } else if ('coordinates' in result.coordinates) {
            returnResults = {
              coordinates: {
                lng: result.coordinates.coordinates[1],
                lat: result.coordinates.coordinates[0],
              },
              id: result.id,
              name: result.name,
              address: result.address,
              zip: result.zip,
              city: result.city,
              phone: result.phone,
              state: result.state.slice(0, 2).toUpperCase(),
            };
          }
        }
        return returnResults;
      });
    }
  }
  return markersArray;
}

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
});

class FindLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filters: {},
      loading: true,
      google: false,
      selectedLocation: undefined,
      selectedCoordinates: { lng: -118.313, lat: 34.622 },
      mapZoomLevel: 7,
      mobileMapZoomLevel: 6,
      markers: [],
      noResultsFound: false,
    };
    if (!this.map) {
      this.map = {};
    }
    this.onMount = this.onMount.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { preloadData, location } = this.props;
    const { selectedLocation } = this.state;

    const dataObject = {};
    dataObject.results = preloadData;

    if (location !== null && selectedLocation === undefined) {
      this.setState({ selectedLocation: location.id });
    }

    this.processFetchedData(dataObject);
  }

  componentDidUpdate(oldProps) {
    const { preloadData } = this.props;
    const { data, markers } = this.state;

    if (
      !data
      || markers.length === 0
      || (preloadData.length > 0 && oldProps.preloadData.length === 0
      )) {
      const dataObject = {};
      dataObject.results = preloadData;

      this.processFetchedData(dataObject);
    }
  }

  onMount(ref, google) {
    const { location } = this.props;
    const { selectedLocation, markers, google: googleDefined } = this.state;
    if (ref) {
      this.map = ref;

      if (!googleDefined && google) {
        this.setState({ google });
      }
    }

    if (location !== null && selectedLocation !== undefined && markers.length > 1) {
      let coords = false;

      markers.map((marker) => {
        if (marker.id === location.id) {
          if ('lat' in location.coordinates && 'lng' in location.coordinates) {
            coords = location.coordinates;
          } else if ('lat' in marker.coordinates && 'lng' in marker.coordinates) {
            coords = location.coordinates;
          }
        }
        return true;
      });

      if (coords) {
        location.coordinates = { coordinates: coords };
      }

      this.selectionHandler(location, false);
    }
  }

  getLocationOfUser(input) {
    let userCoords = {};
    const {
      reset,
      data,
      inputArray,
      searchFilters,
      newFilters,
    } = input;

    if ('geolocation' in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // for when getting location is a success
          userCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          this.processMarkers({
            userCoords,
            reset,
            data,
            inputArray,
            searchFilters,
            newFilters,
          });
        },
        () => {
        // for when getting location results in an error
          this.processMarkers({
            reset,
            data,
            inputArray,
            searchFilters,
            newFilters,
          });
        },
      );
    } else {
      // geolocation is not supported
      // get your location some other way
      this.processMarkers({
        reset,
        data,
        inputArray,
        searchFilters,
        newFilters,
      });
    }
  }

  processMarkers(input) {
    const {
      userCoords,
      inputArray,
      searchFilters,
      data,
      reset,
      newFilters,
    } = input;
    let markersDistances = [];
    if (userCoords) {
      markersDistances = inputArray.map(markerCoords => (
        {
          distance: geolib.getDistance(userCoords, {
            longitude: markerCoords.coordinates.lng,
            latitude: markerCoords.coordinates.lat,
          }),
          coordinates: {
            lat: markerCoords.coordinates.lat,
            lng: markerCoords.coordinates.lng,
          },
          name: markerCoords.name,
          address: markerCoords.address,
          id: markerCoords.id,
          zip: markerCoords.zip,
          city: markerCoords.city,
          phone: markerCoords.phone,
          state: markerCoords.state,
        }
      ));

      markersDistances.sort((a, b) => ((a.distance > b.distance) ? 1 : -1));
    } else {
      markersDistances = inputArray.map(markerCoords => (
        {
          coordinates: {
            lat: markerCoords.coordinates.lat,
            lng: markerCoords.coordinates.lng,
          },
          name: markerCoords.name,
          address: markerCoords.address,
          id: markerCoords.id,
          zip: markerCoords.zip,
          city: markerCoords.city,
          phone: markerCoords.phone,
          state: markerCoords.state,
        }
      ));
    }

    let searchFiltersIsNull = false;
    let resetSearchFilters = false;

    if (searchFilters !== null) {
      if ('query' in searchFilters) {
        if (searchFilters.query === '') {
          resetSearchFilters = true;
          searchFiltersIsNull = true;
        }
      }
    } else {
      searchFiltersIsNull = true;
    }

    if ((searchFiltersIsNull && userCoords)) {
      markersDistances = markersDistances.slice(0, 21);
    }

    const geolibCoords = markersDistances.map(marker => ({
      longitude: marker.coordinates.lng,
      latitude: marker.coordinates.lat,
    }));

    let geolibCenter = geolib.getCenter(geolibCoords);
    geolibCenter = { lat: geolibCenter.latitude, lng: geolibCenter.longitude };

    const closestMarkers = markersDistances.map(marker => (marker.coordinates));

    this.focusOnMapMarkers(closestMarkers);

    let noResultsFound = false;

    if (!Storage.getObject('locations') && data.results.length === 0) {
      noResultsFound = true;
    } else if (data.results.length === 0) {
      const storedData = Storage.getObject('locations');
      if (storedData.length === 0) {
        noResultsFound = true;
      }
    }

    if (resetSearchFilters) {
      this.setState({
        data: data.results,
        filters: reset ? {} : newFilters,
        selectedCoordinates: geolibCenter,
        selectedLocation: undefined,
        mapZoomLevel: 7,
        mobileMapZoomLevel: 6,
        markers: markersDistances,
        loading: false,
        searching: false,
      });
    } else {
      this.setState({
        data: data.results,
        filters: reset ? {} : newFilters,
        selectedCoordinates: geolibCenter,
        markers: markersDistances,
        loading: false,
        searching: false,
        noResultsFound,
      });
    }
  }

  processFetchedData(data, searchFilters = null, reset = false) {
    const markersArray = processResults(data);
    const { filters } = this.state;
    const newFilters = searchFilters || filters;

    this.getLocationOfUser({
      reset,
      data,
      inputArray: markersArray,
      searchFilters,
      newFilters,
    });
  }

  async fetchData(searchFilters = null, reset = false) {
    let searching = false;

    if (searchFilters !== null) {
      searching = true;
    } else {
      searching = false;
    }

    this.setState({ loading: true, searching });

    // const { enqueueSnackbar } = this.props;
    const { filters } = this.state;
    const newFilters = searchFilters || filters;
    const params = Object.assign(
      { page: 1, limit: 21 },
      reset ? {} : newFilters,
    );

    const request = async () => {
      // const response = await api.locations.getAll(params);

      const response = LocationsJson;

      if (params.query) {
        response.data.results = LocationsJson.data.results.filter(
          location => location.city.toLowerCase() === params.query.toLowerCase(),
        );
      }

      const { data } = response;
      const markersArray = processResults(data);

      this.getLocationOfUser({
        reset,
        data,
        inputArray: markersArray,
        searchFilters,
        newFilters,
      });
    };

    try {
      await request();
    } catch (error) {
      this.setState({
        data: [],
        filters: newFilters,
        loading: false,
        searching: false,
      });
      // enqueueSnackbar(errorParse(error));
    }
  }

  selectionHandler(location, triggerCallback) {
    const { onSelect, updatePreloadData } = this.props;
    const { markers } = this.state;
    let formattedCoords = {};
    const formattedMarker = location;
    let coordinates = false;

    if ('lat' in location.coordinates && 'lng' in location.coordinates) {
      // eslint-disable-next-line prefer-destructuring
      coordinates = location.coordinates;
    } else if ('coordinates' in location.coordinates) {
      // eslint-disable-next-line prefer-destructuring
      coordinates = location.coordinates.coordinates;
    }

    if (coordinates) {
      if (coordinates instanceof Array) {
        if (coordinates.length === 2) {
          formattedCoords = {
            lng: parseFloat(coordinates[1].toFixed(3)),
            lat: parseFloat(coordinates[0].toFixed(3)),
          };
        }
      } else {
        // already formatted correctly, no need to do anything
        formattedCoords = coordinates;
      }
    }

    formattedMarker.coordinates = formattedCoords;

    if (triggerCallback !== false) {
      onSelect('location', location);
      updatePreloadData(markers);
    }

    this.focusOnMapMarkers([formattedMarker]);

    this.setState({
      selectedLocation: location.id,
      selectedCoordinates: formattedCoords,
      mapZoomLevel: 14,
      mobileMapZoomLevel: 13,
      markers: [formattedMarker],
    });
  }

  focusOnMapMarkers(markerCoords) {
    const { google } = this.state;

    if (!google) {
      return false;
    }

    let LatLngList = [];

    // eslint-disable-next-line no-undef
    LatLngList = markerCoords.map(coords => new google.maps.LatLng(coords.lat, coords.lng));

    // Create a new viewpoint bound
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();
    //  Go through each...
    for (let i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i += 1) {
      //  And increase the bounds to take this point
      bounds.extend(LatLngList[i]);
    }

    //  Fit these bounds to the map
    this.map.panToBounds(bounds, 100);

    return LatLngList;
  }

  renderSearch() {
    const fields = [
      {
        id: 'query',
        name: 'query',
        label: 'Search by City',
        margin: 'normal',
        type: 'text',
        validateAs: 'string',
        maxSize: 12,
        minSize: 12,
        defaultVal: '',
        icon: (<SearchIcon />),
        required: false,
      },
    ];

    return (
      <LocationSearchForm
        onSubmit={this.fetchData}
        onReset={() => this.fetchData(null, true)}
        fields={fields}
      />
    );
  }

  render() {
    const { t, classes, preloadData } = this.props;
    const {
      data,
      selectedLocation,
      selectedCoordinates,
      markers,
      mapZoomLevel,
      mobileMapZoomLevel,
      loading,
      searching,
      noResultsFound,
    } = this.state;
    const searchComponent = this.renderSearch();
    let showSpinner = loading;

    if (preloadData.length > 0 && !searching) {
      showSpinner = false;
    }

    let coordinates = selectedCoordinates;
    let retrievedMarkers = markers;
    if (noResultsFound) {
      coordinates = {
        lat: 34.051902,
        lng: -118.245698,
      };
      retrievedMarkers = [];
    }

    return (
      <Grid container justify="center" spacing={40} alignItems="flex-start" classes={{ container: classes.container }}>
        <Grid item xs={12} className={classes.mobile}>
          { !showSpinner && isMobile() && (
            <div>
              {searchComponent}
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          { !isMobile() && (
            <GoogleMap
              coordinates={coordinates}
              markers={retrievedMarkers}
              height="500px"
              zoom={mapZoomLevel}
              onMount={(ref, google) => this.onMount(ref, google)}
            />
          )}
          { isMobile() && (
            <GoogleMap
              coordinates={selectedCoordinates}
              markers={markers}
              height="270px"
              zoom={mobileMapZoomLevel}
              onMount={(ref, google) => this.onMount(ref, google)}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {showSpinner && (
            <div className={classes.loadingWrapper}>
              <CircularProgress />
            </div>
          )}

          { !showSpinner && !isMobile() && (
            <div className={classes.nonmobile}>
              {searchComponent}
            </div>
          )}

          { !showSpinner && !noResultsFound && (
            <LocationResults
              locations={(data.length === 0) ? preloadData : data}
              selectionHandler={location => this.selectionHandler(location)}
              selectedLocation={selectedLocation}
            />
          )}
          {noResultsFound && !searching && (
            <Typography>{t('scheduler.noresultsfound')}</Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}

FindLocation.propTypes = propTypes;
FindLocation.defaultProps = defaultProps;
const FindLocationTranslated = withTranslation()(FindLocation);
export default withStyles(styles, { withTheme: true })(withSnackbar(FindLocationTranslated));
