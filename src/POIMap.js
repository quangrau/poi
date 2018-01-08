import React from "react";
import { first } from "lodash";
import PropTypes from "prop-types";
import { compose, withProps } from "recompose";
import {
  GoogleMap,
  Polygon,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const API_KEY = "AIzaSyAa-vu00bzP6U0F6yGsoVdLalnjZ1_Vo1c";
const VERSION = 3;
const LIBS = "geometry";

const POIMap = ({ editable, hideMap, coordinates }) => {
  if (hideMap) return null;

  const zoom = 16;
  const start = first(coordinates);
  const center = { lng: start[0], lat: start[1] };
  const arrPath = coordinates.map(coord => ({
    lng: coord[0],
    lat: coord[1]
  }));

  const polylineOptions = {
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 3
  };

  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={center}>
      <Polygon
        editable={editable}
        path={arrPath}
        defaultOptions={polylineOptions}
      />
    </GoogleMap>
  );
};

POIMap.propTypes = {
  editable: PropTypes.bool.isRequired,
  hideMap: PropTypes.bool.isRequired,
  coordinates: PropTypes.array,
  onComplete: PropTypes.func
};

POIMap.defaultProps = {
  editable: false,
  hideMap: true,
  coordinates: []
};

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=${VERSION}.exp&libraries=${LIBS}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(POIMap);
