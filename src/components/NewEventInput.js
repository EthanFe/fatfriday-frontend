import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

export default class NewEventInput extends Component {
  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="Event Name" value={this.props.newEventName} onChange={this.props.newEventNameChanged}/>
          <DateTimePicker onChange={this.props.newEventDateChanged} value={this.props.newEventDate}/>
        </div>
        <button onClick={this.props.createNewEvent}>Create New Event</button>
      </div>
    )
  }
}