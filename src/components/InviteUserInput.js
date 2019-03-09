import React, { Component } from 'react';
import {connect} from 'react-redux'
import Autocomplete from 'react-autocomplete'
import { changeInvitingUserText, inviteUser } from '../actions';
import { autocompleteDropdownStyle } from './autocompleteStyle';

class InviteUserInput extends Component {
  render() {
    return (
      <div className="invite-user-field">
        <div className="invite-user-label">Invite to Event</div>
        <Autocomplete
          getItemValue={(item) => item.name}
          items={this.props.invitableUsers}
          renderItem={(item, isHighlighted) =>
            <div style={{
              background: isHighlighted ? 'lightgray' : 'white',
              color: this.props.invites.find(invite => invite.user_id === item.id) !== undefined ? '#67960f80' : 'black'
            }}>
              {item.name}
            </div>
          }
          value={this.props.invitingUserText}
          onChange={(event) => this.props.changeInvitingUserText(event.target.value)}
          onSelect={(value, item) => this.props.inviteUser(this.props.loggedInAs.token, this.props.loggedInAs.id, item.id, this.props.eventID)}
          shouldItemRender={(user, input) => this.doesNameContainInput(user.name, input)}
          menuStyle={autocompleteDropdownStyle}
        />
      </div>
    )
  }

  doesNameContainInput = (name, input) => {
    return name.toLowerCase().indexOf(input.toLowerCase()) !== -1
  }
}

const mapStateToProps = (state, props) => {
  return {
    loggedInAs: state.loggedInAs,
    invitingUserText: state.invitingUserText,
    invitableUsers: state.users.filter(user => !state.loggedInAs || user.id !== state.loggedInAs.id)
  }
}

const mapActionsToProps = {
  changeInvitingUserText: changeInvitingUserText,
  inviteUser: inviteUser
}

export default connect(mapStateToProps, mapActionsToProps)(InviteUserInput);