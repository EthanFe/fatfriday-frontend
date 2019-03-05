import React, { Component } from 'react';

export default class Chatroom extends Component {
  render() {
    this.props.messages.forEach(message => {
      console.log(new Date(message.created_on).toLocaleTimeString())
    })
    return (
      <div className="event-display-messages">
        <div className="event-display-messages-header">Chat</div>
        <div className="event-display-messages-list">
          {this.props.messages.map(message =>
            <div className="event-display-messages-message-container">
              <div className="event-display-messages-message-timestamp basic-timestamp">{new Date(message.created_on).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              <div className="event-display-messages-message-timestamp full-timestamp">{new Date(message.created_on).toLocaleString()}</div>
              <div className="event-display-messages-message">
                <div className="event-display-messages-message-username">{this.props.users[message.user_id].name}: </div>
                <div className="event-display-messages-message-text">{message.message_body}</div>
              </div>
            </div>
          )}
        </div>
        {this.props.viewingAsMember ? (
          <div className="event-display-messages-text-entry">
            <form>
              <input type="text" placeholder="Message" value={this.props.currentlyTypingMessage} onChange={this.props.currentlyTypingMessageChanged}/>
              <div><button onClick={event => this.props.sendMessage(event, this.props.event_id)}>Send</button></div>
            </form>
          </div>
        ) : null}
      </div>
    )
  }
}