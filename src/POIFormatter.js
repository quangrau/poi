import React, { Component } from "react";
import { first, last } from 'lodash';
import "./POIFormatter.css";

const defaultValue = `
"coordinates": [
  [
    [
      101.68452858924866,
      3.13444197223343
    ],
    [
      101.6854190826416,
      3.13283505317092
    ],
    [
      101.68767213821411,
      3.1341313014070913
    ],
    [
      101.68982863426208,
      3.1360381760588703
    ],
    [
      101.68949604034424,
      3.136595239907731
    ],
    [
      101.6859233379364,
      3.136316708020398
    ],
    [
      101.68452858924866,
      3.13444197223343
    ]
  ]
`;

class POIFormatter extends Component {
  render() {
    return (
      <div className="POIFormatter">
        <div className="col">
          <h3>Input</h3>
          <textarea
            className="input"
            onChange={this._handleInputChange}
            defaultValue={defaultValue}
          />
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
      arrNodes.forEach((node, index) => {
        // Remove all redundant characters
        const coord = node.replace(/[^\d.-]/g, "");
        poi.push(coord);

        // Split node
        if (poi.length === 2) {
          arrPOIs.push(poi);
          poi = [];
        }

        return arrPOIs
      });

      // check missing end node
      const firstNode = first(arrPOIs)
      const lastNode = last(arrPOIs)
      console.log(firstNode, lastNode)
      if (firstNode[0] !== lastNode[0] || firstNode[1] !== lastNode[1]) {
        arrPOIs.push(arrPOIs[0])
      }
    }

    return arrPOIs;
  }

  _handleInputChange = e => {
    const content = e.target.value;
    const arrNodes = this._format(content);
    const result = [arrNodes]

    this._output.value = `"coordinates": ${JSON.stringify(result, null, 4)}`;
  };
}

export default POIFormatter;
