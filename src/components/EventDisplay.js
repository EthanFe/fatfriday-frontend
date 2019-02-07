import React, { Component } from 'react';

export default class EventDisplay extends Component {
  render() {
    console.log(new Date(this.props.data.event_date))
    return (
      <div className="event-display">
        <span className="event-name">{this.props.data.name}</span>
        <span className="event-date">{new Date(this.props.data.event_date).toLocaleString()}</span>
      </div>
    )
  }
}
