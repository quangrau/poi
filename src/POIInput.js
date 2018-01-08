import React from "react";
import PropTypes from "prop-types";

const POIInput = (props) => {
  return (
    <textarea
      className="form-control POI__input"
      onChange={props.onChange}
    />
  );
};

POIInput.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default POIInput;
