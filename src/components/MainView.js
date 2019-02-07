import React, { Component } from 'react';
import NewEventInput from './NewEventInput';
import EventsList from './EventsList';
import './styles.css';

export default class MainView extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main-view">
          <h2>Events!</h2>
          <NewEventInput newEventName={this.props.newEventName}
                        newEventDate={this.props.newEventDate}
                        newEventNameChanged={this.props.newEventNameChanged}
                        createNewEvent={this.props.createNewEvent}
                        newEventDateChanged={this.props.newEventDateChanged}/>
          <EventsList events={this.props.events}/>
        </div>
      </div>
    )
  }
}