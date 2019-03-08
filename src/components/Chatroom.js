import React, { Component } from 'react';
import anime from 'animejs'

export default class Chatroom extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    const sortedMessages = this.props.messages.sort((message1, message2) => new Date(message1.created_on).getTime() - new Date(message2.created_on).getTime())
    return (
      <div className="event-display-messages">
        <div className="event-display-messages-header">Chat</div>
        <div className={"event-display-messages-list event-id-" + this.props.eventID} ref="messageList">
          {sortedMessages.map(message => {
            const editing = this.props.currentlyEditingMessage === message.id
            return (
              <div className="event-display-messages-message-container" key={message.id}>
                <div className="event-display-messages-message-upper">
                  {this.viewingAsMessageAuthor(message) && !editing ? (
                    <div className="event-display-messages-message-editdelete-buttons">
                      <div className="event-display-messages-message-edit-button" onClick={() => this.props.currentlyEditingMessageChanged(message.id)}>Edit</div>
                      <div className="event-display-messages-message-delete-button" onClick={() => this.props.deleteMessage(message.id)}>Delete</div>
                    </div>
                  ) : null}
                  <div className="event-display-messages-message-timestamps">
                    <div className="event-display-messages-message-timestamp basic-timestamp">{new Date(message.created_on).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    <div className="event-display-messages-message-timestamp full-timestamp">{new Date(message.created_on).toLocaleString()}</div>
                  </div>
                </div>
                {this.props.currentlyEditingMessage === message.id ? (
                  <div>
                    <input type="text" placeholder="Message" value={this.props.currentlyEditingMessageContent} onChange={this.props.currentlyEditingMessageContentChanged}/>
                    <span><button onClick={event => this.props.editMessage(event, this.props.eventID)}>Edit</button></span>
                  </div>
                ) : (
                  <div className="event-display-messages-message">
                    <div className="event-display-messages-message-username">{this.props.users[message.user_id].name}: </div>
                    <div className="event-display-messages-message-text">{message.message_body}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {this.props.viewingAsMember ? (
          <div className="event-display-messages-text-entry">
            <form>
              <input type="text" placeholder="Message" value={this.props.currentlyTypingMessage} onChange={this.props.currentlyTypingMessageChanged}/>
              <div><button onClick={event => this.props.sendMessage(event, this.props.eventID)}>Send</button></div>
            </form>
          </div>
        ) : null}
      </div>
    )
  }

  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    anime({
      targets: '.event-display-messages-list.event-id-' + this.props.eventID,
      easing: 'easeOutQuart',
      direction: 'normal',
      duration: 350,
      autoplay: false,
      scrollTop: maxScrollTop > 0 ? maxScrollTop : 0
    }).restart()
  }

  viewingAsMessageAuthor = (message) => {
    return this.props.loggedInAs && this.props.loggedInAs.id === message.user_id
  }
}