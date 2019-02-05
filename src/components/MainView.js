import React, { Component } from 'react';
import NewEventInput from './NewEventInput';
import EventsList from './EventsList';
import './styles.css';

export default class MainView extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main-view">
          <div className="columns">
            <span>Events!</span>
            <NewEventInput newEventName={this.props.newEventName}
                          newEventNameChanged={this.props.newEventNameChanged}
                          createNewEvent={this.props.createNewEvent}/>
          </div>
          <EventsList events={this.props.events}/>
        </div>
      </div>
    )
  }
}