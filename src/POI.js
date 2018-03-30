import React, { Component } from 'react'
import { isEmpty, map, first, last } from 'lodash'
import POIInput from './POIInput'
import POIOutput from './POIOutput'
import POIMap from './POIMap'
import './POI.css'

const FORMAT_TYPE = {
  LNG_LAT: 'LNG_LAT',
  LAT_LNG: 'LAT_LNG',
}

class POI extends Component {
  state = {
    editable: false,
    formatType: FORMAT_TYPE.LNG_LAT,
    coordinates: [],
    rawContent: '',
  }

  renderEditButton() {
    return (
      <button className="btn btn-outline-primary" onClick={this._toggleEdit}>
        <span className="fa fa-edit" /> Edit POI
      </button>
    )
  }

  renderSaveButton() {
    return (
      <div className="POI__buttons">
        <button className="btn btn-outline-danger" onClick={this._toggleEdit}>
          <span className="fa fa-close" /> Reset
        </button>
        <button className="btn btn-outline-success" onClick={this._handleOnSave}>
          <span className="fa fa-save" /> Save
        </button>
      </div>
    )
  }

  render() {
    const { editable, coordinates, formatType } = this.state

    return (
      <div className="POI">
        <div className="row row-input">
          <div className="col-md-12">
            <section className="POI__controls">
              Format:
              <div className="form-check">
                <input
                  type="radio"
                  id="lng_lat"
                  name="formatType"
                  className="form-check-input"
                  value={FORMAT_TYPE.LNG_LAT}
                  checked={formatType === FORMAT_TYPE.LNG_LAT}
                  onChange={this._handleFormatChange}
                />
                <label className="form-check-label" htmlFor="lng_lat">
                  {`{ lng, lat }`}
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="lat_lng"
                  name="format"
                  className="form-check-input"
                  value={FORMAT_TYPE.LAT_LNG}
                  checked={formatType === FORMAT_TYPE.LAT_LNG}
                  onChange={this._handleFormatChange}
                />
                <label className="form-check-label" htmlFor="lat_lng">
                  {`{ lat, lng }`}
                </label>
              </div>
            </section>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="POI__label">Input</label>
              <POIInput onChange={this._handleOnChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="POI__label">Output</label>
              <POIOutput coordinates={coordinates} />
            </div>
          </div>
        </div>
        <div className="row row-btn">
          <div className="col-md-12 text-md-center">
            {editable ? this.renderSaveButton() : this.renderEditButton()}
          </div>
        </div>
        <div className="row row-map">
          <div className="col-md-12">
            <POIMap
              editable={editable}
              hideMap={isEmpty(coordinates)}
              coordinates={coordinates}
              getPolygon={this._getPolygon}
            />
          </div>
        </div>
      </div>
    )
  }

  _getPolygon = ref => {
    this._polygon = ref
  }

  _toggleEdit = () => {
    this.setState({ editable: !this.state.editable })
  }

  _formatCoordinates(content) {
    if (isEmpty(content)) {
      this.setState({ coordinates: [] })
      return
    }

    const coordinates = []
    const arrNodes = content.split(',')

    if (arrNodes.length) {
      let poi = []

      // Remove all redundant characters
      arrNodes.forEach((node, index) => {
        const coord = node.replace(/[^\d.-]/g, '')
        if (this.state.formatType === FORMAT_TYPE.LAT_LNG) {
          poi.unshift(+coord)
        } else {
          poi.push(+coord)
        }

        // Split node
        if (poi.length === 2) {
          coordinates.push(poi)
          poi = []
        }
      })

      // check missing end node
      if (!isEmpty(coordinates)) {
        const firstNode = first(coordinates)
        const lastNode = last(coordinates)
        if (firstNode[0] !== lastNode[0] || firstNode[1] !== lastNode[1]) {
          coordinates.push(coordinates[0])
        }
      }
    }

    // Save data
    this.setState({ coordinates })
  }

  _handleOnChange = e => {
    e.preventDefault()
    const rawContent = e.target.value
    this.setState({ rawContent }, () => {
      this._formatCoordinates(rawContent)
    })
  }

  _handleOnSave = e => {
    e.preventDefault()

    if (this._polygon) {
      const data = this._polygon.getPaths()
      const paths = data.b[0].b || []
      const coordinates = map(paths, path => [path.lng(), path.lat()])

      // Update new data
      this.setState({ coordinates, editable: false })
    }
  }

  _handleFormatChange = e => {
    this.setState({ formatType: e.target.value }, () => {
      this._formatCoordinates(this.state.rawContent)
    })
  }
}

export default POI
