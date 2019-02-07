import React, { Component } from 'react';
import anime from 'animejs'
import EventDisplay from './EventDisplay';

export default class EventsList extends Component {
  componentDidUpdate = (prevProps) => {
    const animation = anime({
      targets: '.event-name',
      color: "#000000",
      easing: 'easeInQuint',
      duration: 500,
      "font-size": "12px"
    });
    animation.restart()
  }
    
  render() {
    const sortedEvents = this.props.events.sort((event1, event2) => new Date(event1.event_date).getTime() - new Date(event2.event_date).getTime())
    return (
      <div className="events-list">
        {sortedEvents.map(event => <EventDisplay data={event}/>)}
      </div>
    )
  }
}