import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
} from 'react-google-maps';
import config from '../../config';

const propTypes = {
  coordinates: PropTypes.oneOfType([PropTypes.object]).isRequired,
  markers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onMount: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
  zoom: PropTypes.number.isRequired,
};

class GoogleMapWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = { openState: false };

    this.map = {};
    this.toggleClose = this.toggleClose.bind(this);
  }

  toggleOpen = marker => () => {
    this.setState({ openState: marker.id });
  }

  toggleClose() {
    this.setState({ openState: false });
  }

  render() {
    const {
      zoom,
      height,
      onMount,
      markers,
      coordinates,
    } = this.props;
    const { openState } = this.state;

    const GoogleMapExample = withScriptjs(withGoogleMap(props => ( // eslint-disable-line
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={coordinates}
        ref={gmap => gmap && onMount(gmap, google)} // eslint-disable-line
      >
        {markers.length > 0 && (markers.map(marker => (
          <Marker
            key={marker.id}
            position={{ lng: marker.coordinates.lng, lat: marker.coordinates.lat }}
            name={marker.name}
            title={marker.address}
            onClick={this.toggleOpen(marker)}
          >
            { openState === marker.id && (
              <InfoWindow onCloseClick={this.toggleClose}>
                <div>
                  <div><strong>{marker.address}</strong></div>
                  <div>{`${marker.city}, ${marker.state} ${marker.zip}`}</div>
                  <div>{marker.phone}</div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )))}
      </GoogleMap>
    )));

    return (
      <div>
        <GoogleMapExample
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.map.key}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height, width: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

GoogleMapWrapper.propTypes = propTypes;
export default GoogleMapWrapper;
