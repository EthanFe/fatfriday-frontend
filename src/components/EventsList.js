import React, { Component } from 'react';
import EventDisplay from './EventDisplay';
import {group} from '../utility.js'

export default class EventsList extends Component {
  render() {
    const invitesByEvent = group(this.props.invites, "event_id")
    const placeSuggestionsByEvent = group(this.props.placeSuggestions, "event_id")
    const messagesByEvent = group(this.props.messages, "event_id")
    const sortedEvents = this.props.events.sort((event1, event2) => new Date(event1.event_date).getTime() - new Date(event2.event_date).getTime())
    return (
      <div className="events-list">
        {sortedEvents.map(event => <EventDisplay data={event}
                                                  key={event.id}
                                                  invitableUsers={this.props.invitableUsers}
                                                  invitingUserText={this.props.invitingUserText}
                                                  invitingUserTextChanged={this.props.invitingUserTextChanged}
                                                  inviteUser={this.props.inviteUser}
                                                  invites={invitesByEvent[event.id] || []}
                                                  loggedInAs={this.props.loggedInAs}
                                                  eventOwned={this.props.loggedInAs && this.props.loggedInAs.id === event.created_by}
                                                  acceptInvitation={this.props.acceptInvitation}
                                                  placeSearchText={this.props.placeSearchText}
                                                  placeSearchTextChanged={this.props.placeSearchTextChanged}
                                                  placeSearchAutocompletes={this.props.placeSearchAutocompletes}
                                                  suggestPlace={this.props.suggestPlace}
                                                  placeSuggestions={placeSuggestionsByEvent[event.id] || []}
                                                  placeClickedOn={this.props.placeClickedOn}
                                                  placeMousedOver={this.props.placeMousedOver}
                                                  mousedOverSuggestion={this.props.mousedOverSuggestionIDs && (placeSuggestionsByEvent[event.id] || []).find(suggestion =>
                                                    suggestion.event_id === this.props.mousedOverSuggestionIDs.event_id &&
                                                    suggestion.google_place_id === this.props.mousedOverSuggestionIDs.google_place_id
                                                    )}
                                                  removeEvent={this.props.removeEvent}
                                                  messages={messagesByEvent[event.id] || []}
                                                  currentlyTypingMessage={this.props.currentlyTypingMessage}
                                                  currentlyTypingMessageChanged={this.props.currentlyTypingMessageChanged}
                                                  sendMessage={this.props.sendMessage}
                                                  />)}
      </div>
    )
  }
}