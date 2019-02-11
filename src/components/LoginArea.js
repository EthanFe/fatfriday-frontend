import React, { Component } from 'react';

export default class LoginArea extends Component {
  render() {
    return this.props.loggedInAs === null ? (
      <div className="login-area">
        <form>
          <input type="text" placeholder="Username" value={this.props.loginUsername} onChange={this.props.loginUsernameChanged}/>
          <input type="password" placeholder="Password" value={this.props.loginPassword} onChange={this.props.loginPasswordChanged}/>
          <div><button onClick={this.props.loginButtonPressed}>Login</button></div>
        </form>
        <form>
          <input type="text" placeholder="Username" value={this.props.newUsername} onChange={this.props.newUsernameChanged}/>
          <input type="password" placeholder="Password" value={this.props.newPassword} onChange={this.props.newPasswordChanged}/>
          <div><button onClick={this.props.createNewUser}>Sign Up</button></div>
        </form>
      </div>
    ) : (
      <div className="login-area">
        <div className="logged-in-text">Logged in as {this.props.loggedInAs}</div>
        <div><button onClick={this.props.logoutButtonPressed}>Logout</button></div>
      </div>
    )
  }
}