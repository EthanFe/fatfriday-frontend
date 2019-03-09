import React, { Component } from 'react';
import anime from 'animejs'
import Message from './Message';
import {connect} from 'react-redux'
import { changeCurrentlyTypingMessage, sendMessage } from '../actions';

class Chatroom extends Component {
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
            return <Message message={message} username={this.props.users[message.user_id].name} key={message.id}/>
          })}
        </div>
        {this.props.active && this.props.viewingAsMember ? (
          <div className="event-display-messages-text-entry">
            <form>
              <input type="text" placeholder="Message" value={this.props.currentlyTypingMessage} onChange={(event) => this.props.changeCurrentlyTypingMessage(event.target.value)}/>
              <div><button onClick={this.sendMessage}>Send</button></div>
            </form>
          </div>
        ) : null}
      </div>
    )
  }

  sendMessage = (event) => {
    event.preventDefault()
    this.props.sendMessage(this.props.loggedInAs.token, this.props.loggedInAs.id, this.props.eventID, this.props.currentlyTypingMessage)
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

const mapStateToProps = (state, props) => {
  return {
    loggedInAs: state.loggedInAs,
    currentlyTypingMessage: state.currentlyTypingMessage
  }
}

const mapActionsToProps = {
  changeCurrentlyTypingMessage: changeCurrentlyTypingMessage,
  sendMessage: sendMessage
}

export default connect(mapStateToProps, mapActionsToProps)(Chatroom);