import React, { Component } from 'react';
import MainView from './MainView';
import {today} from '../utility.js'

export default class SocketController extends Component {
  state = {
    events: [],
    newEventName: "",
    newEventDate: today(),
    loginName: "",
    loggedInAs: null,
    invitableUsers: [],
    invitingUserText: "",
    invites: []
  }

  componentDidMount = () => {
    this.setupSocket()
  }

  setupSocket = () => {
    const url = "http://localhost:3000"
    const socket = require('socket.io-client')(url);
    this.socket = socket
    socket.on("eventList", this.updateEventList)
    socket.on("invitableUsersList", this.updateInvitableUsersList)
    socket.on("loggedIn", this.loginSuccess)
    socket.on("invitesList", this.updateInvitesList)
    socket.on("initialData", this.setInitialData)
  }

  createNewEvent = () => {
    this.socket.emit("createNewEvent", {
      name: this.state.newEventName,
      user_id: this.state.loggedInAs.id,
      date: this.state.newEventDate.getTime()
    })
    this.setState({newEventName: "", newEventDate: today()})
  }

  newEventNameChanged = (event) => {
    this.setState({newEventName: event.target.value})
  }

  newEventDateChanged = (event) => {
    this.setState({newEventDate: event})
  }

  updateEventList = (events) => {
    this.setState({events: events})
  }

  updateInvitableUsersList = (users) => {
    this.setState({invitableUsers: users})
  }

  updateInvitesList = (invites) => {
    this.setState({invites: invites})
  }

  invitingUserTextChanged = (text) => {
    this.setState({invitingUserText: text})
  }
  
  inviteUser = (userID, eventID) => {
    this.socket.emit("inviteUserToEvent", {
      user_id: userID,
      event_id: eventID
    })
  }

  setInitialData = ({events, users, invites}) => {
    this.setState({
      events: events,
      invitableUsers: users,
      invites: invites
    })
  }

  loginNameChanged = (event) => {
    this.setState({loginName: event.target.value})
  }

  loginButtonPressed = (event) => {
    event.preventDefault()
    this.socket.emit("login", {
      username: this.state.loginName
    })
  }

  loginSuccess = (user) => {
    this.setState({loginName: "", loggedInAs: user})
  }

  logoutButtonPressed = () => {
    this.setState({loggedInAs: null})
  }

  acceptInvitation = (event_id) => {
    this.socket.emit("acceptInvitation", {
      user_id: this.state.loggedInAs.id,
      event_id: event_id
    })
  }

  render() {
    return <MainView events={this.state.events}
                      newEventName={this.state.newEventName}
                      newEventDate={this.state.newEventDate}
                      createNewEvent={this.createNewEvent}
                      newEventNameChanged={this.newEventNameChanged}
                      newEventDateChanged={this.newEventDateChanged}
                      loginName={this.state.loginName}
                      loginNameChanged={this.loginNameChanged}
                      loginButtonPressed={this.loginButtonPressed}
                      loggedInAs={this.state.loggedInAs}
                      logoutButtonPressed={this.logoutButtonPressed}
                      invitableUsers={this.state.invitableUsers}
                      invitingUserText={this.state.invitingUserText}
                      invitingUserTextChanged={this.invitingUserTextChanged}
                      inviteUser={this.inviteUser}
                      invites={this.state.invites}
                      acceptInvitation={this.acceptInvitation}
                      />
  }
}