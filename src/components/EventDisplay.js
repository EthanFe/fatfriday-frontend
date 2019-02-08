import React, { Component } from 'react';
// import anime from 'animejs'
import Autocomplete from 'react-autocomplete'

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
        <div className="invite-user-field">
          <div className="invite-user-label">Invite to Event</div>
          <Autocomplete
            getItemValue={(item) => item.name}
            items={this.props.invitableUsers}
            renderItem={(item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.name}
              </div>
            }
            value={this.props.invitingUserText}
            onChange={(event) => this.props.invitingUserTextChanged(event.target.value)}
            onSelect={(value) => this.props.inviteUser(value, this.props.data.id)}
            shouldItemRender={(user, input) => this.doesNameContainInput(user.name, input)}
          />
        </div>
      </div>
    )
  }

  doesNameContainInput = (name, input) => {
    return name.toLowerCase().indexOf(input.toLowerCase()) !== -1
  }
}
