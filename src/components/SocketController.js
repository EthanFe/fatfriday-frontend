import React, { Component } from 'react';
import MainView from './MainView';
import {today} from '../utility.js'

export default class SocketController extends Component {
  state = {
    events: [],
    newEventName: "",
    newEventDate: today()
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
  }

  createNewEvent = () => {
    this.socket.emit("createNewEvent", {
      name: this.state.newEventName,
      username: "exampleusername",
      date: this.state.newEventDate.getTime()
    })
    this.setState({newEventName: "", newEventDate: today()})
  }

  newEventNameChanged = (event) => {
    this.setState({newEventName: event.target.value})
  }

  newEventDateChanged = (event) => {
    console.log(event)
    this.setState({newEventDate: event})
  }

  updateEventList = (events) => {
    console.log(events)
    this.setState({events: events})
  }

  eventCreated = ({eventName, creatorUsername}) => {
    this.setState({events: [...this.state.events, {name: eventName}]})
  }

  render() {
    return <MainView events={this.state.events}
                      newEventName={this.state.newEventName}
                      newEventDate={this.state.newEventDate}
                      createNewEvent={this.createNewEvent}
                      newEventNameChanged={this.newEventNameChanged}
                      newEventDateChanged={this.newEventDateChanged}/>
  }
}