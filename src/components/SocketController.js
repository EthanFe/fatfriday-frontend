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
    invites: [],
    placeSearchText: "",
    placeSearchAutocompletes: [],
    placeSuggestions: []
  }

  componentDidMount = () => {
    this.setupSocket()
  }

  setupSocket = () => {
    const url = "http://localhost:3000"
    const socket = require('socket.io-client')(url);
    this.socket = socket
    socket.on("initialData", this.setInitialData)
    socket.on("eventList", this.updateEventList)
    socket.on("invitableUsersList", this.updateInvitableUsersList)
    socket.on("loggedIn", this.loginSuccess)
    socket.on("invitesList", this.updateInvitesList)
    socket.on("placeNameMatches", this.setPlaceSearchAutocompletes)
    socket.on("placeSuggestions", this.updatePlaceSuggestions)
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

  updatePlaceSuggestions = (placeSuggestions) => {
    this.setState({placeSuggestions: placeSuggestions})
  }
  
  inviteUser = (userID, eventID) => {
    this.socket.emit("inviteUserToEvent", {
      user_id: userID,
      event_id: eventID
    })
  }

  setInitialData = ({events, users, invites, placeSuggestions}) => {
    this.setState({
      events: events,
      invitableUsers: users,
      invites: invites,
      placeSuggestions: placeSuggestions
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

  placeSearchTextChanged = (text) => {
    const autoCompleteBuildupTime = 250 //ms

    if (this.autoCompleteBuildupTimer !== null) {
      clearTimeout(this.autoCompleteBuildupTimer)
      this.autoCompleteBuildupTimer = null
    }
    if (text !== "") {
      this.autoCompleteBuildupTimer = setTimeout(() => {
        this.socket.emit("placeTextEntered", {
          text: text
        })
        this.autoCompleteBuildupTimer = null
      }, autoCompleteBuildupTime)
    } else {
      this.setState({placeSearchAutocompletes: []})
    }

    this.setState({
      placeSearchText: text
    })
  }

  setPlaceSearchAutocompletes = (places) => {
    this.setState({placeSearchAutocompletes: places})
  }

  suggestPlace = (placeID, placeName, eventID) => {
    this.socket.emit("suggestPlace", {
      user_id: this.state.loggedInAs.id,
      place_id: placeID,
      place_name: placeName,
      event_id: eventID
    })
  }

  placeClickedOn = (place_id, event_id, alreadyVoted) => {
    this.socket.emit("voteForPlace", {
      user_id: this.state.loggedInAs.id,
      place_id: place_id,
      event_id: event_id,
      setVoteTo: !alreadyVoted
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
                      placeSearchText={this.state.placeSearchText}
                      placeSearchTextChanged={this.placeSearchTextChanged}
                      placeSearchAutocompletes={this.state.placeSearchAutocompletes}
                      suggestPlace={this.suggestPlace}
                      placeSuggestions={this.state.placeSuggestions}
                      placeClickedOn={this.placeClickedOn}
                      />
  }
}