import React, { PureComponent } from "react";
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
const ZOOM = 16;
const OPTIONS = {
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 3
};

class POIMap extends PureComponent {
  static propTypes = {
    editable: PropTypes.bool.isRequired,
    hideMap: PropTypes.bool.isRequired,
    coordinates: PropTypes.array,
    onComplete: PropTypes.func
  };

  static defaultProps = {
    editable: false,
    hideMap: true,
    coordinates: []
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.props.getPolygon(this._polygon)
  }
  
  render() {
    const { editable, hideMap, coordinates } = this.props;
    if (hideMap) return null;

    const start = first(coordinates);
    const center = { lng: start[0], lat: start[1] };
    const arrPaths = coordinates.map(coord => ({
      lng: coord[0],
      lat: coord[1]
    }));


    return (
      <GoogleMap defaultZoom={ZOOM} defaultCenter={center}>
        <Polygon
          ref={node => (this._polygon = node)}
          draggable={editable}
          editable={editable}
          paths={arrPaths}
          options={OPTIONS}
        />
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=${VERSION}.exp&libraries=${LIBS}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(POIMap);
