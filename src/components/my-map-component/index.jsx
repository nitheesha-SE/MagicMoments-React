import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withProps, withState } from 'recompose';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDop4rv216SLFFmCpyW2vwWyZhj-Gwgee0&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', '', 'mapCenter', 'onNearbyGroceryStores'),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      fetchPlaces: ({ updatePlaces }) => {
        const bounds = refs.map.getBounds();
        const service = new google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
        );
        const request = {
          bounds,
          type: ['supermarket'],
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            updatePlaces(results);
            window.onNearbyGroceryStores(results.length > 0);
          } else {
            window.onNearbyGroceryStores(false);
          }
        });
      },
    };
  }),
)(props => (
  <GoogleMap
    onTilesLoaded={props.fetchPlaces}
    ref={props.onMapMounted}
    onBoundsChanged={props.fetchPlaces}
    defaultZoom={14}
    center={props.mapCenter}
  >
    {props.places &&
      props.places.map(place => (
        <Marker
          key={place.id}
          position={{
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }}
        />
      ))}
  </GoogleMap>
));

MyMapComponent.propTypes = {
  title: PropTypes.string,
  mapCenter: PropTypes.element.isRequired,
  onNearbyGroceryStores: PropTypes.element.isRequired,
};

export default MyMapComponent;
