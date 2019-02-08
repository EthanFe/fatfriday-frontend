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
    invitingUserText: ""
  }

  componentDidMount = () => {
    this.setupSocket()
  }

  setupSocket = () => {
    const url = "http://localhost:3000"
    const socket = require('socket.io-client')(url);
    this.socket = socket
    socket.on("eventCreated", this.eventCreated)
    socket.on("eventList", this.updateEventList)
    socket.on("invitableUsersList", this.updateInvitableUsersList)
    socket.on("loggedIn", this.loginSuccess)
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

  invitingUserTextChanged = (text) => {
    this.setState({invitingUserText: text})
  }
  
  inviteUser = (username, eventID) => {
    this.socket.emit("inviteUserToEvent", {
      username: username,
      event_id: eventID
    })
  }

  eventCreated = ({eventName, creatorUsername}) => {
    this.setState({events: [...this.state.events, {name: eventName}]})
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
                      loggedInAs={this.state.loggedInAs ? this.state.loggedInAs.name : null}
                      logoutButtonPressed={this.logoutButtonPressed}
                      invitableUsers={this.state.invitableUsers}
                      invitingUserText={this.state.invitingUserText}
                      invitingUserTextChanged={this.invitingUserTextChanged}
                      inviteUser={this.inviteUser}
                      />
  }
}