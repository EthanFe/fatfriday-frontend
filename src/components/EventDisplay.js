import React, { Component } from 'react';
// import anime from 'animejs'
import Autocomplete from 'react-autocomplete'
import {index} from "../utility.js"

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
    const invitableUsersById = index(this.props.invitableUsers, "id")
    const usersExcludingSelf = this.props.invitableUsers.filter(user => !this.props.loggedInAs || user.id !== this.props.loggedInAs.id)
    return (
      <div className="event-display">
        <div className="event-display-main">
          <span className="event-name">{this.props.data.name}</span>
          <span className="event-date">{new Date(this.props.data.event_date).toLocaleString()}</span>
          {this.props.eventOwned ? (
            <div className="invite-user-field">
              <div className="invite-user-label">Invite to Event</div>
              <Autocomplete
                getItemValue={(item) => item.name}
                items={usersExcludingSelf}
                renderItem={(item, isHighlighted) =>
                  <div style={{
                    background: isHighlighted ? 'lightgray' : 'white',
                    color: this.props.invites.find(invite => invite.user_id === item.id) !== undefined ? '#67960f80' : 'black'
                  }}>
                    {item.name}
                  </div>
                }
                value={this.props.invitingUserText}
                onChange={(event) => this.props.invitingUserTextChanged(event.target.value)}
                onSelect={(value, item) => this.props.inviteUser(item.id, this.props.data.id)}
                shouldItemRender={(user, input) => this.doesNameContainInput(user.name, input)}
              />
            </div>
          ) : null}
        </div>
          <div className="event-display-members">
            <div className="invited-users-list">
              <div>Users already invited:</div>
              {this.props.invites.map(invite => <div key={[invite.user_id, invite.event_id]}>{`${invitableUsersById[invite.user_id].name}`}</div> )}
            </div>
          </div>
      </div>
    )
  }

  doesNameContainInput = (name, input) => {
    return name.toLowerCase().indexOf(input.toLowerCase()) !== -1
  }
}
