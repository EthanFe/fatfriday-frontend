import React, { Component } from 'react';
import MainView from './MainView';

export default class SocketController extends Component {
  state = {
    events: [],
    newEventName: ""
  }

  componentDidMount = () => {
    this.setupSocket()
  }

  setupSocket = () => {
    const url = "http://localhost:3000"
    const socket = require('socket.io-client')(url);
    this.socket = socket
    socket.on("eventCreated", this.eventCreated)
  }

  createNewEvent = () => {
    this.socket.emit("createNewEvent", {name: this.state.newEventName, username: "exampleusername"})
    // console.log("Making new event with name " + this.state.newEventName)
    this.setState({newEventName: ""})
  }

  newEventNameChanged = (event) => {
    this.setState({newEventName: event.target.value})
  }

  eventCreated = ({eventName, creatorUsername}) => {
    this.setState({events: [...this.state.events, {name: eventName}]})
  }

  render() {
    return <MainView events={this.state.events}
                      newEventName={this.state.newEventName}
                      createNewEvent={this.createNewEvent}
                      newEventNameChanged={this.newEventNameChanged}/>
  }
}