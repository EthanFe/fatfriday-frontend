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
    mousedOverSuggestionID: null,
    messages: [],
    currentlyTypingMessage: "",
    currentlyEditingMessage: null,
    currentlyEditingMessageContent: "",
    onlineUsers: [],
    activeEvent: null
  }

  componentDidMount = () => {
    this.setupSocket()
  }

  setupSocket = () => {
    const socket = require('socket.io-client')("http://localhost:3000");
    // const socket = require('socket.io-client')();
    this.socket = socket
    socket.on("initialData", this.setInitialData)
    socket.on("eventList", this.updateEventList)
    socket.on("invitableUsersList", this.updateInvitableUsersList)
    socket.on("loggedIn", this.loginSuccess)
    socket.on("invitesList", this.updateInvitesList)
    socket.on("placeNameMatches", this.setPlaceSearchAutocompletes)
    socket.on("placeSuggestions", this.updatePlaceSuggestions)
    socket.on("messages", this.updateMessages)
    socket.on("onlineUsers", this.updateOnlineUsers)
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
    this.setState({
      events: events,
      activeEvent: this.state.activeEvent === null && events.length > 0 ? this.earliestEvent(events).id : this.state.activeEvent
    })
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

  updateMessages = (messages) => {
    this.setState({messages: messages})
  }
  
  updateOnlineUsers = (onlineUsers) => {
    this.setState({onlineUsers: onlineUsers})
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

  setInitialData = ({events, users, invites, placeSuggestions, messages, onlineUserIDs}) => {
    this.setState({
      events: events,
      invitableUsers: users,
      invites: invites,
      placeSuggestions: placeSuggestions,
      messages: messages,
      onlineUsers: onlineUserIDs,
      activeEvent: events.length > 0 ? this.earliestEvent(events).id : null
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
    this.socket.emit("logout", {
      token: this.state.loggedInAs.token,
      user_id: this.state.loggedInAs.id
    })
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

  removeEvent = (event_id) => {
    this.socket.emit("removeEvent", {
      token: this.state.loggedInAs.token,
      user_id: this.state.loggedInAs.id,
      event_id: event_id
    })
  }

  currentlyTypingMessageChanged = (event) => {
    this.setState({currentlyTypingMessage: event.target.value})
  }

  sendMessage = (event, event_id) => {
    event.preventDefault()
    this.socket.emit("sendMessage", {
      token: this.state.loggedInAs.token,
      user_id: this.state.loggedInAs.id,
      event_id: event_id,
      message: this.state.currentlyTypingMessage
    })
    this.setState({currentlyTypingMessage: ""})
  }

  editMessage = (event, message_id) => {
    event.preventDefault()
    this.socket.emit("editMessage", {
      token: this.state.loggedInAs.token,
      user_id: this.state.loggedInAs.id,
      message_id: message_id,
      new_message: this.state.currentlyEditingMessageContent
    })
    this.setState({currentlyEditingMessage: null, currentlyEditingMessageContent: ""})
  }

  currentlyEditingMessageChanged = (message_id) => {
    this.setState({
      currentlyEditingMessage: message_id,
      currentlyEditingMessageContent: this.state.messages.find(message => message.id === message_id).message_body
    })
  }

  currentlyEditingMessageContentChanged = (event) => {
    this.setState({currentlyEditingMessageContent: event.target.value})
  }

  eventClickedOn = (event_id) => {
    this.setState({activeEvent: event_id})
  }

  earliestEvent = (events) => {
    return events.sort((event1, event2) => new Date(event1.event_date).getTime() - new Date(event2.event_date).getTime())[0]
  }

  render() {
    return <MainView
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

              events={this.state.events}
              activeEvent={this.state.activeEvent}
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
              removeEvent={this.removeEvent}
              messages={this.state.messages}
              currentlyTypingMessage={this.state.currentlyTypingMessage}
              currentlyTypingMessageChanged={this.currentlyTypingMessageChanged}
              currentlyEditingMessage={this.state.currentlyEditingMessage}
              currentlyEditingMessageContent={this.state.currentlyEditingMessageContent}
              currentlyEditingMessageChanged={this.currentlyEditingMessageChanged}
              currentlyEditingMessageContentChanged={this.currentlyEditingMessageContentChanged}
              sendMessage={this.sendMessage}
              editMessage={this.editMessage}
              onlineUsers={this.state.onlineUsers}
              eventClickedOn={this.eventClickedOn}
            />
  }
}