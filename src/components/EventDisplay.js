import React, { Component } from 'react';
import {index} from "../utility.js"
import Chatroom from './Chatroom.js';
import PlacesList from './PlacesList.js';
import InviteUserInput from './InviteUserInput.js';
import EventMembersList from './EventMembersList.js';
import {connect} from 'react-redux'
import { acceptInvitation, clickOnEvent, deleteEvent } from '../actions.js';
import SuggestPlaceInput from './SuggestPlaceInput.js';

class EventDisplay extends Component {
  dropDownStyle = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%',
    "z-index": "1"
  }
  
  render() {
    const invitableUsersById = index(this.props.invitableUsers, "id")

    let inviteAcceptedUsers = this.props.invites.filter(invite => invite.accepted)
    // also display event owner as a member of event
    inviteAcceptedUsers.push({user_id: this.props.data.created_by})
    inviteAcceptedUsers = inviteAcceptedUsers.map(invite => invitableUsersById[invite.user_id])

    const invitePendingUsers = this.props.invites.filter(invite => !invite.accepted).map(invite => invitableUsersById[invite.user_id])
    const viewingAsMember = this.viewingAsMember(inviteAcceptedUsers)
    return (
      <div className={"event-display" + (this.props.active ? " active-event" : " inactive-event")} onClick={() => this.props.clickOnEvent(this.props.data.id)}>
        <div className="event-display-left-column">
          <div className="event-display-main">
            <div className="event-display-members">
              <EventMembersList users={inviteAcceptedUsers} placeSuggestions={this.props.placeSuggestions}/>
            </div>
            <div className="event-display-title">
              <span className="event-name">
                {this.props.data.name}
                {this.viewingAsCreator() ? <span className="delete-event-button" onClick={() => this.props.deleteEvent(this.props.loggedInAs.token, this.props.loggedInAs.id, this.props.data.id)}> (Delete)</span> : null}
              </span>
              <span className="event-date">{new Date(this.props.data.event_date).toLocaleString()}</span>
              {this.props.eventOwned && this.props.active ? <InviteUserInput invites={this.props.invites} eventID={this.props.data.id}/> : null}
            </div>
            <div className="event-display-members">
              <div className="invited-users-list">
                <div>Users already invited:</div>
                {invitePendingUsers.map(user => <div key={user.id}>{user.name}</div> )}
              </div>
              {this.props.loggedInAs && invitePendingUsers.find(invite => {
                return invite.id === this.props.loggedInAs.id
                }) !== undefined ? (
                <div className="join-event">
                  <button className="join-event-button" onClick={() => this.props.acceptInvitation(this.props.loggedInAs.token, this.props.loggedInAs.id, this.props.data.id)}>Join Event</button>
                </div>
              ) : null}
            </div>
          </div>
          {this.props.active ? (
            <div>
              {viewingAsMember ? <SuggestPlaceInput eventID={this.props.data.id}/> : null}
              <PlacesList placeSuggestions={this.props.placeSuggestions}
                          eventID={this.props.data.id}
                          viewingAsMember={viewingAsMember}
                          />
            </div>
          ) : null}
        </div>
        <div className="event-display-right-column">
          <Chatroom
            eventID={this.props.data.id}
            messages={this.props.messages}
            users={index(inviteAcceptedUsers, "id")}
            viewingAsMember={viewingAsMember}
            active={this.props.active}
          />
        </div>
      </div>
    )
  }

  viewingAsMember = (inviteAcceptedUsers) => {
    return this.props.loggedInAs && (inviteAcceptedUsers.find(invite => 
      invite.id === this.props.loggedInAs.id
    ) !== undefined)
  }

  viewingAsCreator = () => {
    return this.props.loggedInAs && this.props.loggedInAs.id === this.props.data.created_by
  }
}

const mapStateToProps = (state, props) => {
  return {
    invitableUsers: state.users,
    loggedInAs: state.loggedInAs,
    eventOwned: state.loggedInAs && state.loggedInAs.id === props.data.created_by,
    active: state.activeEvent === props.data.id
  }
}

const mapActionsToProps = {
  acceptInvitation: acceptInvitation,
  clickOnEvent: clickOnEvent,
  deleteEvent: deleteEvent
}

export default connect(mapStateToProps, mapActionsToProps)(EventDisplay);