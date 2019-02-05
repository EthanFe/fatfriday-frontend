import React, { Component } from 'react';

export default class NewEventInput extends Component {
  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="Event Name" value={this.props.newEventName} onChange={this.props.newEventNameChanged}/>
        </div>
        <button onClick={this.props.createNewEvent}>Create New Event</button>
      </div>
    )
  }
}