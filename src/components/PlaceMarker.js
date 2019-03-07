import React, { Component } from 'react';

export default class PlaceMarker extends Component {
  render() {
    return (
      <div className={"place-map-marker" + (this.props.$hover ? " map-marker-hovered" : "")}>
        {this.props.$hover ? this.props.place.placeData.name : null}
      </div>
    )
  }
}