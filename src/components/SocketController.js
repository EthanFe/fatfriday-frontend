import React, { Component } from 'react';
import MainView from './MainView';
import {today} from '../utility.js'

export default class SocketController extends Component {
  state = {
    events: [],
    newEventName: "",
    newEventDate: today(),
    loginUsername: "",
    loginPassword: "",
    newUsername: "",
    newPassword: "",
    loggedInAs: null,
    invitableUsers: [],
    invitingUserText: "",
    invites: [],
    placeSearchText: "",
    placeSearchAutocompletes: [],
    placeSuggestions: [],
    mousedOverSuggestionID: null
  }

  componentDidMount = () => {
    this.setupSocket()
  }

  setupSocket = () => {
    // const url = "http://localhost:3000"
    // const socket = require('socket.io-client')(url);
    const socket = require('socket.io-client')();
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
      token: this.state.loggedInAs.token,
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
      token: this.state.loggedInAs.token,
      user_id: this.state.loggedInAs.id,
      invitee_user_id: userID,
      event_id: eventID
    })
    this.setState({invitingUserText: ""})
  }

  setInitialData = ({events, users, invites, placeSuggestions}) => {
    this.setState({
      events: events,
      invitableUsers: users,
      invites: invites,
      placeSuggestions: placeSuggestions
    })
  }

  loginUsernameChanged = (event) => {
    this.setState({loginUsername: event.target.value})
  }

  loginPasswordChanged = (event) => {
    this.setState({loginPassword: event.target.value})
  }

  loginButtonPressed = (event) => {
    event.preventDefault()
    this.socket.emit("login", {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    })
    this.setState({newUsername: "", newPassword: "", loginUsername: "", loginPassword: ""})
  }

  newUsernameChanged = (event) => {
    this.setState({newUsername: event.target.value})
  }

  newPasswordChanged = (event) => {
    this.setState({newPassword: event.target.value})
  }

  createNewUser = (event) => {
    event.preventDefault()
    this.socket.emit("signUp", {
      username: this.state.newUsername,
      password: this.state.newPassword
    })
    this.setState({newUsername: "", newPassword: "", loginUsername: "", loginPassword: ""})
  }

  loginSuccess = ({user}) => {
    this.setState({loggedInAs: user})
  }

  logoutButtonPressed = () => {
    this.setState({loggedInAs: null})
  }

  acceptInvitation = (event_id) => {
    this.socket.emit("acceptInvitation", {
      token: this.state.loggedInAs.token,
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
          token: this.state.loggedInAs.token,
          user_id: this.state.loggedInAs.id,
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
      token: this.state.loggedInAs.token,
      user_id: this.state.loggedInAs.id,
      place_id: placeID,
      place_name: placeName,
      event_id: eventID
    })
    this.setState({placeSearchText: ""})
  }

  placeClickedOn = (place_id, event_id, alreadyVoted) => {
    this.socket.emit("voteForPlace", {
      token: this.state.loggedInAs.token,
      user_id: this.state.loggedInAs.id,
      place_id: place_id,
      event_id: event_id,
      setVoteTo: !alreadyVoted
    })
  }

  placeMousedOver = (suggestionIDs) => {
    this.setState({mousedOverSuggestionIDs: suggestionIDs})
  }

  render() {
    return <MainView events={this.state.events}
                      newEventName={this.state.newEventName}
                      newEventDate={this.state.newEventDate}
                      createNewEvent={this.createNewEvent}
                      newEventNameChanged={this.newEventNameChanged}
                      newEventDateChanged={this.newEventDateChanged}

                      loginUsername={this.state.loginUsername}
                      loginPassword={this.state.loginPassword}
                      loginUsernameChanged={this.loginUsernameChanged}
                      loginPasswordChanged={this.loginPasswordChanged}
                      loginButtonPressed={this.loginButtonPressed}
                      newUsername={this.state.newUsername}
                      newPassword={this.state.newPassword}
                      newUsernameChanged={this.newUsernameChanged}
                      newPasswordChanged={this.newPasswordChanged}
                      createNewUser={this.createNewUser}
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
                      placeMousedOver={this.placeMousedOver}
                      mousedOverSuggestionIDs={this.state.mousedOverSuggestionIDs}
                      />
  }
}