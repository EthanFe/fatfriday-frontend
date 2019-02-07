import React, { Component } from 'react';

export default class LoginArea extends Component {
  render() {
    return this.props.loggedInAs === null ? (
      <div className="login-area">
        <form>
          <input type="text" placeholder="Username" value={this.props.loginName} onChange={this.props.loginNameChanged}/>
          <div><button onClick={this.props.loginButtonPressed}>Login</button></div>
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