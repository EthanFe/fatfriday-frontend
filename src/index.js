import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import {createMySocketMiddleware} from './socketMiddleware.js'
import {Provider} from 'react-redux'
import rootReducer from './reducer.js'
import {today} from './utility.js'

const defaultState = {
  events: [],
  newEventName: "",
  newEventDate: today(),
  loginUsername: "",
  loginPassword: "",
  loggedInAs: null,
  invitableUsers: [],
  invitingUserText: "",
  invites: [],
  placeSearchText: "",
  placeSearchAutocompletes: [],
  placeSuggestions: [],
  mousedOverSuggestionIDPair: null,
  messages: [],
  currentlyTypingMessage: "",
  currentlyEditingMessage: null,
  currentlyEditingMessageContent: "",
  onlineUsers: [],
  activeEvent: null
}

export const store = createStore(rootReducer, defaultState, applyMiddleware(createMySocketMiddleware("http://localhost:3000")))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
