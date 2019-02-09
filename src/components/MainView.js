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
            <div className="login-wrapper">
              <LoginArea 
                loginName={this.props.loginName}
                loginNameChanged={this.props.loginNameChanged}
                loginButtonPressed={this.props.loginButtonPressed}
                loggedInAs={this.props.loggedInAs ? this.props.loggedInAs.name : null}
                logoutButtonPressed={this.props.logoutButtonPressed}
              />
            </div>
            <div className="events-list-wrapper">
              <h2>Events!</h2>
              {this.props.loggedInAs !== null ? <NewEventInput newEventName={this.props.newEventName}
                            newEventDate={this.props.newEventDate}
                            newEventNameChanged={this.props.newEventNameChanged}
                            createNewEvent={this.props.createNewEvent}
                            newEventDateChanged={this.props.newEventDateChanged}/> : null}
              <EventsList events={this.props.events}
                          invitableUsers={this.props.invitableUsers}
                          invitingUserText={this.props.invitingUserText}
                          invitingUserTextChanged={this.props.invitingUserTextChanged}
                          inviteUser={this.props.inviteUser}
                          invites={this.props.invites}
                          loggedInAs={this.props.loggedInAs}
                          acceptInvitation={this.props.acceptInvitation}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}