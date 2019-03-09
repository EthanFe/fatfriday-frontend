import React, { Component } from 'react';
import EventDisplay from './EventDisplay';
import {group} from '../utility.js'
import {connect} from 'react-redux'

class EventsList extends Component {
  render() {
    const invitesByEvent = group(this.props.invites, "event_id")
    const placeSuggestionsByEvent = group(this.props.placeSuggestions, "event_id")
    const messagesByEvent = group(this.props.messages, "event_id")
    const sortedEvents = this.props.events.sort((event1, event2) => new Date(event1.event_date).getTime() - new Date(event2.event_date).getTime())
    return (
      <div className="events-list">
        {sortedEvents.map(event => <EventDisplay data={event}
                                                  key={event.id}
                                                  invites={invitesByEvent[event.id] || []}
                                                  placeSuggestions={placeSuggestionsByEvent[event.id] || []}
                                                  messages={messagesByEvent[event.id] || []}
                                                  />)}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    events: state.events,
    activeEvent: state.activeEvent,
    invites: state.invites,
    placeSuggestions: state.placeSuggestions,
    messages: state.messages
  }
}

export default connect(mapStateToProps)(EventsList);