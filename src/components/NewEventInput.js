import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import {connect} from 'react-redux'
import { createNewEvent, changeNewEventName, changeNewEventDate } from '../actions';

class NewEventInput extends Component {
  render() {
    return (
      <div className="new-event-input">
        <div>
          <input type="text" placeholder="Event Name" value={this.props.newEventName} onChange={event => this.props.changeNewEventName(event.target.value)}/>
          <DateTimePicker value={this.props.newEventDate} onChange={this.props.changeNewEventDate}/>
        </div>
        <button onClick={this.createNewEvent}>Create New Event</button>
      </div>
    )
  }

  createNewEvent = () => {
    this.props.createNewEvent(this.props.loggedInAs.token, this.props.loggedInAs.id, this.props.newEventName, this.props.newEventDate.getTime())
  }
}

const mapStateToProps = (state, props) => {
  return {
    loggedInAs: state.loggedInAs,
    newEventName: state.newEventName,
    newEventDate: state.newEventDate
  }
}

const mapActionsToProps = {
  changeNewEventName: changeNewEventName,
  changeNewEventDate: changeNewEventDate,
  createNewEvent: createNewEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(NewEventInput);