import React, { Component } from 'react';
import VoteCount from './VoteCount.js';
import FlipMove from 'react-flip-move';
import GoogleMapReact from 'google-map-react';
import PlaceMarker from './PlaceMarker';

export default class PlacesList extends Component {
  render() {
    const latitude = 29.747055
    const longitude = -95.372617
    const sortedPlaces = this.props.placeSuggestions.sort((place1, place2) => place2.votes.length - place1.votes.length)
    return (
      <div>
        <div className="event-display-place-list">
          <FlipMove>
            {sortedPlaces.map(place => {
              const votedFor = this.votedFor(place)
              const entryClassName = "event-display-place-list-entry" + (votedFor ? " voted-for" : "")
              const id = `${place.google_place_id}${this.props.eventID}`
              return (
                <div className="event-display-place-list-entry-container"
                    key={id}
                    onMouseOver={() => this.props.placeMousedOver({event_id: this.props.eventID, google_place_id: place.google_place_id})}
                    onMouseOut={() => this.props.placeMousedOver(null)}>
                  <VoteCount votes={place.votes.length} id={id}/>
                  {this.props.viewingAsMember ? (
                    <div className={`${entryClassName} clickable`}
                        onClick={() => this.props.placeClickedOn(place.google_place_id, this.props.eventID, votedFor)}>
                      {place.placeData.name} 
                    </div>
                  ) : (
                    <div className={`${entryClassName}`}>
                      {place.placeData.name} 
                    </div>
                  )}
                </div>
              )
            })}
          </FlipMove>
        </div>
        <div className="map-wrapper" style={{ height: '300px', width: '300px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={{
              lat: latitude,
              lng: longitude
            }}
            defaultZoom={11}
          >
            {this.props.placeSuggestions.map(place => <PlaceMarker lat={place.placeData.location.latitude} lng={place.placeData.location.longitude} place={place}/>)}
          </GoogleMapReact>
        </div>
      </div>
    )
  }

  votedFor = (place) => {
    return this.props.loggedInAs && place.votes.find(place => place.user_id === this.props.loggedInAs.id) !== undefined
  }
}