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
    return (
      <div className="event-display-messages">
        <div className="event-display-messages-header">Chat</div>
        <div className={"event-display-messages-list event-id-" + this.props.eventID} ref="messageList">
          {this.props.messages.map(message =>
            <div className="event-display-messages-message-container" key={message.id}>
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
}