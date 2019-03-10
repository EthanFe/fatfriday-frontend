import React, { Component } from 'react';
import anime from 'animejs'

export default class VoteCount extends Component {
  componentDidMount = () => {
    this.positiveAnimation = anime({
      targets: '.vote-count.' + this.props.id,
      color: "#ffffff",
      easing: 'easeOutQuart',
      direction: 'alternate',
      duration: 350,
      background: "#00B258",
      autoplay: false
    });
    this.negativeAnimation = anime({
      targets: '.vote-count.' + this.props.id,
      color: "#ffffff",
      easing: 'easeOutQuart',
      direction: 'alternate',
      duration: 350,
      background: "#B30300",
      autoplay: false
    });
  }
  
  componentDidUpdate = (prevProps) => {
    if (prevProps.votes < this.props.votes) {
      this.positiveAnimation.restart()
    } else if (prevProps.votes > this.props.votes) {
      this.negativeAnimation.restart()
    }
  }

  render() {
    return <div className={"vote-count " + this.props.id}>{this.props.votes}</div>
  }
}
