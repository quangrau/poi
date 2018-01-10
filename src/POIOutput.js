import React from "react";
import PropTypes from "prop-types";

const POIOutput = ({ coordinates }) => {
  const value = JSON.stringify([coordinates], null, 4);
  const formattedValue = `"coordinates": ${value}`;
  const handleSelectAll = () => this._output.select()

  return (
    <textarea
      readOnly={true}
      ref={input => (this._output = input)}
      className="form-control POI__input"
      value={formattedValue}
      onClick={handleSelectAll}
    />
  );
};

POIOutput.propTypes = {
  coordinates: PropTypes.array
};

export default POIOutput;
