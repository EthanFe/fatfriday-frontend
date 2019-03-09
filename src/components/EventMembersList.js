import React, { Component } from 'react';
import {connect} from 'react-redux'
import UserDisplay from './UserDisplay';

class EventMembersList extends Component {
  render() {
    const usersWhoVotedForMousedOver = (this.props.mousedOverSuggestion && this.props.mousedOverSuggestion.votes.map(vote => vote.user_id)) || []
    return (
      <div className="invited-users-list">
        <div>Users going:</div>
        {this.props.users.map(user => <UserDisplay key={user.id} votedOnMousedOver={usersWhoVotedForMousedOver.includes(user.id)} name={user.name} online={this.props.onlineUsers.includes(user.id)}/> )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const mousedOverSuggestion = state.mousedOverSuggestionIDPair && props.placeSuggestions.find(suggestion =>
    suggestion.event_id === state.mousedOverSuggestionIDPair.event_id &&
    suggestion.google_place_id === state.mousedOverSuggestionIDPair.google_place_id)
  return {
    mousedOverSuggestion: mousedOverSuggestion,
    onlineUsers: state.onlineUsers
  }
}

export default connect(mapStateToProps)(EventMembersList);