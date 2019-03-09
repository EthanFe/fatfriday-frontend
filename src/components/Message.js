import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import { changeCurrentlyEditingMessage, changeCurrentlyEditingMessageContent, editMessage, deleteMessage } from '../actions';

class Message extends PureComponent {
  render() {
    return (
      <div className="event-display-messages-message-container" key={this.props.message.id}>
        <div className="event-display-messages-message-upper">
          {this.viewingAsMessageAuthor() && !this.props.editing ? (
            <div className="event-display-messages-message-editdelete-buttons">
              <div className="event-display-messages-message-edit-button" onClick={() => this.props.changeCurrentlyEditingMessage(this.props.message.id, this.props.message.message_body)}>Edit</div>
              <div className="event-display-messages-message-delete-button" onClick={() => this.props.deleteMessage(this.props.message.id)}>Delete</div>
            </div>
          ) : null}
          <div className="event-display-messages-message-timestamps">
            <div className="event-display-messages-message-timestamp basic-timestamp">{new Date(this.props.message.created_on).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="event-display-messages-message-timestamp full-timestamp">{new Date(this.props.message.created_on).toLocaleString()}</div>
          </div>
        </div>
        {this.props.editing ? (
          <div>
            <input type="text" placeholder="Message" value={this.props.currentlyEditingMessageContent} onChange={(event) => this.props.changeCurrentlyEditingMessageContent(event.target.value)}/>
            <span><button onClick={this.editMessage}>Edit</button></span>
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

  editMessage = () => {
    this.props.editMessage(this.props.loggedInAs.token, this.props.loggedInAs.id, this.props.message.id, this.props.currentlyEditingMessageContent)
  }

  deleteMessage = () => {
    this.props.sendMessage(this.props.loggedInAs.token, this.props.loggedInAs.id, this.props.message.id)
  }

  viewingAsMessageAuthor = () => {
    return this.props.loggedInAs && this.props.loggedInAs.id === this.props.message.user_id
  }
}

const mapStateToProps = (state, props) => {
  return {
    loggedInAs: state.loggedInAs,
    editing: state.currentlyEditingMessage === props.message.id,
    currentlyEditingMessageContent: state.currentlyEditingMessageContent
  }
}

const mapActionsToProps = {
  changeCurrentlyEditingMessage: changeCurrentlyEditingMessage,
  changeCurrentlyEditingMessageContent: changeCurrentlyEditingMessageContent,
  editMessage: editMessage,
  deleteMessage: deleteMessage
}

export default connect(mapStateToProps, mapActionsToProps)(Message);