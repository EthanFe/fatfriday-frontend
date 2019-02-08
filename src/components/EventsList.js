import React, { Component } from 'react';
import EventDisplay from './EventDisplay';

export default class EventsList extends Component {
  render() {
    const sortedEvents = this.props.events.sort((event1, event2) => new Date(event1.event_date).getTime() - new Date(event2.event_date).getTime())
    return (
      <div className="events-list">
        {sortedEvents.map(event => <EventDisplay data={event}
                                                  key={event.id}
                                                  invitableUsers={this.props.invitableUsers}
                                                  invitingUserText={this.props.invitingUserText}
                                                  invitingUserTextChanged={this.props.invitingUserTextChanged}
                                                  inviteUser={this.props.inviteUser}/>)}
      </div>
    )
  }
}