import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete'
import {index} from "../utility.js"
import VoteCount from './VoteCount.js';
import FlipMove from 'react-flip-move';

export default class EventDisplay extends Component {
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
    const sortedPlaces = this.props.placeSuggestions.sort((place1, place2) => place2.votes.length - place1.votes.length)

    const usersExcludingSelf = this.props.invitableUsers.filter(user => !this.props.loggedInAs || user.id !== this.props.loggedInAs.id)

    const usersWhoVotedForMousedOver = (this.props.mousedOverSuggestion && this.props.mousedOverSuggestion.votes.map(vote => vote.user_id)) || []
    return (
      <div className="event-display">
        <div className="event-display-main">
          <div className="event-display-members">
            <div className="invited-users-list">
              <div>Users going:</div>
              {inviteAcceptedUsers.map(user => <div key={user.id} className={usersWhoVotedForMousedOver.includes(user.id) ? "voted-user" : ""}>{user.name}</div> )}
            </div>
          </div>
          <div className="event-display-title">
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
                  menuStyle={this.dropDownStyle}
                />
              </div>
            ) : null}
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
                <button className="join-event-button" onClick={() => this.props.acceptInvitation(this.props.data.id)}>Join Event</button>
              </div>
            ) : null}
          </div>
        </div>
        {viewingAsMember ? (
          <div className="event-display-place-suggestion">
            <div className="invite-user-label">Suggest a Place</div>
            <Autocomplete
              getItemValue={(item) => item.placeName}
              items={this.props.placeSearchAutocompletes}
              renderItem={(item, isHighlighted) =>
                <div style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                  {item.placeName}
                </div>
              }
              value={this.props.placeSearchText}
              onChange={(event) => this.props.placeSearchTextChanged(event.target.value)}
              onSelect={(value, item) => this.props.suggestPlace(item.placeID, item.placeName, this.props.data.id)}
              shouldItemRender={(place, input) => this.doesNameContainInput(place.placeName, input)}
              menuStyle={this.dropDownStyle}
            />
          </div>
        ) : null}
        <div className="event-display-place-list">
          <FlipMove>
            {sortedPlaces.map(place => {
              const votedFor = this.votedFor(place)
              const entryClassName = "event-display-place-list-entry" + (votedFor ? " voted-for" : "")
              const id = `${place.google_place_id}${this.props.data.id}`
              return (
                <div className="event-display-place-list-entry-container"
                     key={id}
                     onMouseOver={() => this.props.placeMousedOver({event_id: this.props.data.id, google_place_id: place.google_place_id})}
                     onMouseOut={() => this.props.placeMousedOver(null)}>
                  <VoteCount votes={place.votes.length} id={id}/>
                  {viewingAsMember ? (
                    <div className={`${entryClassName} clickable`}
                        onClick={() => this.props.placeClickedOn(place.google_place_id, this.props.data.id, votedFor)}>
                      {place.name} 
                    </div>
                  ) : (
                    <div className={`${entryClassName}`}>
                      {place.name} 
                    </div>
                  )}
                </div>
              )
            })}
          </FlipMove>
        </div>
      </div>
    )
  }

  doesNameContainInput = (name, input) => {
    return name.toLowerCase().indexOf(input.toLowerCase()) !== -1
  }

  viewingAsMember = (inviteAcceptedUsers) => {
    return this.props.loggedInAs && (inviteAcceptedUsers.find(invite => 
      invite.id === this.props.loggedInAs.id
    ) !== undefined)
  }

  votedFor = (place) => {
    return this.props.loggedInAs && place.votes.find(place => place.user_id === this.props.loggedInAs.id) !== undefined
  }
}
