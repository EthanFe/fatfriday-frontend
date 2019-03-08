import React, { Component } from 'react';
import anime from 'animejs'
import Message from './Message';

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
            return <Message
              message={message}
              editing={editing}
              currentlyEditingMessage={this.props.currentlyEditingMessage}
              currentlyEditingMessageContent={this.props.currentlyEditingMessageContent}
              currentlyEditingMessageChanged={this.props.currentlyEditingMessageChanged}
              currentlyEditingMessageContentChanged={this.props.currentlyEditingMessageContentChanged}
              editMessage={this.props.editMessage}
              deleteMessage={this.props.deleteMessage}
              username={this.props.users[message.user_id].name}
              viewingAsMessageAuthor={this.viewingAsMessageAuthor(message)}
            />
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