import React, { Component } from 'react';

export default class UserDisplay extends Component {
  render() {
    return (
      <div className="user-display">
        <span className={"user-display-name" + (this.props.votedOnMousedOver ? "voted-user" : "")}>{this.props.name}</span>
        {this.props.online ? <div className="online-indicator"></div> : null}
      </div>
    )
  }
}