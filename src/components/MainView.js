import React, { Component } from 'react';
import NewEventInput from './NewEventInput';
import EventsList from './EventsList';
import './styles.css';
import LoginArea from './LoginArea';
import {connect} from 'react-redux'

class MainView extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="main-view">
          <div className="login-and-events-wrapper">
            <h2>Events!</h2>
            <div className="top-bar">
              <div className="login-wrapper">
                <LoginArea/>
              </div>
              {this.props.loggedInAs !== null ? <NewEventInput/> : null}
            </div>
            <div className="events-list-wrapper" data-tip="whee">
              <EventsList/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    loggedInAs: state.loggedInAs
  }
}

export default connect(mapStateToProps)(MainView);