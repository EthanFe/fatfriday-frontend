import React, { Component } from 'react';
import { login, changeLoginUsername, changeLoginPassword, createNewUser, logout } from '../actions';
import {connect} from 'react-redux'

class LoginArea extends Component {
  render() {
    return this.props.loggedInAs === null ? (
      <div className="login-area">
        <form>
          <input type="text" placeholder="Username" value={this.props.loginUsername} onChange={event => this.props.changeLoginUsername(event.target.value)}/>
          <input type="password" placeholder="Password" value={this.props.loginPassword} onChange={event => this.props.changeLoginPassword(event.target.value)}/>
          <div>
            <div><button onClick={event => {event.preventDefault(); this.props.login(this.props.loginUsername, this.props.loginPassword)}}>Login</button></div>
            <div><button onClick={event => {event.preventDefault(); this.props.createNewUser(this.props.loginUsername, this.props.loginPassword)}}>Sign Up</button></div>
          </div>
        </form>
      </div>
    ) : (
      <div className="login-area">
        <div className="logged-in-text">Logged in as {this.props.loggedInAs.name}</div>
        <div><button onClick={() => this.props.logout(this.props.loggedInAs.token, this.props.loggedInAs.id)}>Logout</button></div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    loggedInAs: state.loggedInAs,
    loginUsername: state.loginUsername,
    loginPassword: state.loginPassword
  }
}

const mapActionsToProps = {
  login: login,
  createNewUser: createNewUser,
  logout: logout,
  changeLoginUsername: changeLoginUsername,
  changeLoginPassword: changeLoginPassword
}

export default connect(mapStateToProps, mapActionsToProps)(LoginArea);