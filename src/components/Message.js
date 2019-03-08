import React, { PureComponent } from 'react';

export default class Message extends PureComponent {
  render() {
    return (
      <div className="event-display-messages-message-container" key={this.props.message.id}>
        <div className="event-display-messages-message-upper">
          {this.props.viewingAsMessageAuthor && !this.props.editing ? (
            <div className="event-display-messages-message-editdelete-buttons">
              <div className="event-display-messages-message-edit-button" onClick={() => this.props.currentlyEditingMessageChanged(this.props.message.id)}>Edit</div>
              <div className="event-display-messages-message-delete-button" onClick={() => this.props.deleteMessage(this.props.message.id)}>Delete</div>
            </div>
          ) : null}
          <div className="event-display-messages-message-timestamps">
            <div className="event-display-messages-message-timestamp basic-timestamp">{new Date(this.props.message.created_on).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="event-display-messages-message-timestamp full-timestamp">{new Date(this.props.message.created_on).toLocaleString()}</div>
          </div>
        </div>
        {this.props.currentlyEditingMessage === this.props.message.id ? (
          <div>
            <input type="text" placeholder="Message" value={this.props.currentlyEditingMessageContent} onChange={this.props.currentlyEditingMessageContentChanged}/>
            <span><button onClick={event => this.props.editMessage(event, this.props.message.id)}>Edit</button></span>
          </div>
        ) : (
          <div className="event-display-messages-message">
            <div className="event-display-messages-message-username">{this.props.username}: </div>
            <div className="event-display-messages-message-text">{this.props.message.message_body}</div>
          </div>
        )}
      </div>
    )
  }
}