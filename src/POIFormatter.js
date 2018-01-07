import React, { Component } from "react";
import { isEmpty, first, last } from "lodash";
import "./POIFormatter.css";

class POIFormatter extends Component {
  render() {
    return (
      <div className="POIFormatter">
        <div className="col">
          <h3>Input</h3>
          <textarea className="input" onChange={this._handleInputChange} />
        </div>
        <div className="col">
          <h3>Output</h3>
          <textarea ref={input => (this._output = input)} className="output" />
        </div>
      </div>
    );
  }

  _format(content) {
    const arrPOIs = [];
    const arrNodes = content.split(",");

    if (arrNodes.length) {
      let poi = [];

      // Remove all redundant characters
      arrNodes.forEach((node, index) => {
        const coord = node.replace(/[^\d.-]/g, "");
        poi.push(coord);

        // Split node
        if (poi.length === 2) {
          arrPOIs.push(poi);
          poi = [];
        }

        return arrPOIs;
      });

      // check missing end node
      if (!isEmpty(arrPOIs)) {
        const firstNode = first(arrPOIs);
        const lastNode = last(arrPOIs);
        if (firstNode[0] !== lastNode[0] || firstNode[1] !== lastNode[1]) {
          arrPOIs.push(arrPOIs[0]);
        }
      }
    }

    return arrPOIs;
  }

  _handleInputChange = e => {
    e.preventDefault();

    const content = e.target.value;
    if (!isEmpty(content)) {
      const arrNodes = this._format(content);
      const result = [arrNodes];
      this._output.value = `"coordinates": ${JSON.stringify(result, null, 4)}`;
    }
  };
}

export default POIFormatter;
