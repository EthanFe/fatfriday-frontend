import React, { Component } from 'react';
import NewEventInput from './NewEventInput';
import EventsList from './EventsList';
import './styles.css';
import LoginArea from './LoginArea';

export default class MainView extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main-view">
          <div className="login-and-events-wrapper">
            <h2>Events!</h2>
            <div className="top-bar">
              <div className="login-wrapper">
                <LoginArea 
                  loginUsername={this.props.loginUsername}
                  loginPassword={this.props.loginPassword}
                  loginUsernameChanged={this.props.loginUsernameChanged}
                  loginPasswordChanged={this.props.loginPasswordChanged}
                  loginButtonPressed={this.props.loginButtonPressed}

                  newUsername={this.props.newUsername}
                  newPassword={this.props.newPassword}
                  newUsernameChanged={this.props.newUsernameChanged}
                  newPasswordChanged={this.props.newPasswordChanged}
                  createNewUser={this.props.createNewUser}
                  
                  loggedInAs={this.props.loggedInAs ? this.props.loggedInAs.name : null}
                  logoutButtonPressed={this.props.logoutButtonPressed}
                />
              </div>
              {this.props.loggedInAs !== null ? <NewEventInput newEventName={this.props.newEventName}
                            newEventDate={this.props.newEventDate}
                            newEventNameChanged={this.props.newEventNameChanged}
                            createNewEvent={this.props.createNewEvent}
                            newEventDateChanged={this.props.newEventDateChanged}/> : null}
            </div>
            <div className="events-list-wrapper" data-tip="whee">
              <EventsList events={this.props.events}
                          activeEvent={this.props.activeEvent}
                          invitableUsers={this.props.invitableUsers}
                          invitingUserText={this.props.invitingUserText}
                          invitingUserTextChanged={this.props.invitingUserTextChanged}
                          inviteUser={this.props.inviteUser}
                          invites={this.props.invites}
                          loggedInAs={this.props.loggedInAs}
                          acceptInvitation={this.props.acceptInvitation}
                          placeSearchText={this.props.placeSearchText}
                          placeSearchTextChanged={this.props.placeSearchTextChanged}
                          placeSearchAutocompletes={this.props.placeSearchAutocompletes}
                          suggestPlace={this.props.suggestPlace}
                          placeSuggestions={this.props.placeSuggestions}
                          placeClickedOn={this.props.placeClickedOn}
                          placeMousedOver={this.props.placeMousedOver}
                          mousedOverSuggestionIDs={this.props.mousedOverSuggestionIDs}
                          removeEvent={this.props.removeEvent}
                          onlineUsers={this.props.onlineUsers}
                          eventClickedOn={this.props.eventClickedOn}
                          messages={this.props.messages}
                          currentlyTypingMessage={this.props.currentlyTypingMessage}
                          currentlyTypingMessageChanged={this.props.currentlyTypingMessageChanged}
                          currentlyEditingMessage={this.props.currentlyEditingMessage}
                          currentlyEditingMessageContent={this.props.currentlyEditingMessageContent}
                          currentlyEditingMessageChanged={this.props.currentlyEditingMessageChanged}
                          currentlyEditingMessageContentChanged={this.props.currentlyEditingMessageContentChanged}
                          sendMessage={this.props.sendMessage}
                          editMessage={this.props.editMessage}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}