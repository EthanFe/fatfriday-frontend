import React, { Component } from 'react';
import anime from 'animejs'

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
    return (
      <div className="events-list">
        {this.props.events.map(event => <span className="event-name">{event.name}</span>)}
      </div>
    )
  }
}