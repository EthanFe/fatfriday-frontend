import React, { Component } from 'react';
// import anime from 'animejs'

export default class EventDisplay extends Component {
  // componentDidUpdate = (prevProps) => {
  //   const animation = anime({
  //     targets: '.event-name',
  //     color: "#000000",
  //     easing: 'easeInQuint',
  //     duration: 500,
  //     "font-size": "18px"
  //   });
  //   animation.restart()
  // }

  render() {
    return (
      <div className="event-display">
        <span className="event-name">{this.props.data.name}</span>
        <span className="event-date">{new Date(this.props.data.event_date).toLocaleString()}</span>
      </div>
    )
  }
}
