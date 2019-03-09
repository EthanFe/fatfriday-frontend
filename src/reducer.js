import { NEW_EVENT_CREATED, CHANGE_LOGIN_USERNAME, CHANGE_LOGIN_PASSWORD, CLEAR_LOGIN_FIELDS, LOGGED_OUT, CHANGE_NEW_EVENT_NAME, CHANGE_NEW_EVENT_DATE, CHANGE_INVITING_USER_TEXT, CLEAR_INVITING_USER_TEXT, CHANGE_PLACE_SEARCH_TEXT, CLEAR_PLACE_SEARCH_TEXT, CLEAR_PLACE_SEARCH_AUTOCOMPLETES, MOUSE_OVER_PLACE, CLICK_ON_EVENT, CLEAR_CURRENTLY_TYPING_MESSAGE, CHANGE_CURRENTLY_TYPING_MESSAGE, CHANGE_CURRENTLY_EDITING_MESSAGE, CHANGE_CURRENTLY_EDITING_MESSAGE_CONTENT, CLEAR_CURRENTLY_EDITING_MESSAGE } from './actions';
import {today} from './utility.js'

const rootReducer = (state = {}, {type, payload}) => {
  let newState = Object.assign({}, state)
  switch (type) {
    // messages from socket
    case "setInitialData":
      newState = Object.assign(newState, payload)
      newState.activeEvent = newState.events.length > 0 ? earliestEvent(newState.events).id : null
      // const {events, users, invites, placeSuggestions, messages, onlineUsers} = payload
      return newState
    case "updateEventList":
      newState.events = payload
      newState.activeEvent = newState.activeEvent === null && newState.events.length > 0 ? earliestEvent(newState.events).id : newState.activeEvent
      return newState
    case "updateInvitableUsersList":
      newState.users = payload
      return newState
    case "loginSuccess":
      newState.loggedInAs = payload.user
      return newState
    case "updateInvitesList":
      newState.invites = payload
      return newState
    case "setPlaceSearchAutocompletes":
      console.log(payload)
      newState.placeSearchAutocompletes = payload
      return newState
    case "updatePlaceSuggestions":
      newState.placeSuggestions = payload
      return newState
    case "updateMessages":
      newState.messages = payload
      return newState
    case "updateOnlineUsers":
      newState.onlineUsers = payload
      return newState

    // -- frontend-limited effects
    // general
    case CLICK_ON_EVENT:
      newState.activeEvent = payload.event_id
      return newState

    // login/out
    case CHANGE_LOGIN_USERNAME:
      newState.loginUsername = payload.username
      return newState
    case CHANGE_LOGIN_PASSWORD:
      newState.loginPassword = payload.password
      return newState
    case CLEAR_LOGIN_FIELDS:
      newState.loginUsername = ""
      newState.loginPassword = ""
      return newState
    case LOGGED_OUT:
      newState.loggedInAs = null
      return newState
    
    // event creation
    case CHANGE_NEW_EVENT_NAME:
      newState.newEventName = payload.name
      return newState
    case CHANGE_NEW_EVENT_DATE:
      newState.newEventDate = payload.date
      return newState
    case NEW_EVENT_CREATED:
      newState.newEventName = ""
      newState.newEventDate = today()
      return newState
    
    // inviting users to events
    case CHANGE_INVITING_USER_TEXT:
      newState.invitingUserText = payload.text
      return newState
    case CLEAR_INVITING_USER_TEXT:
      newState.invitingUserText = ""
      return newState
    
    // suggesting places
    case CHANGE_PLACE_SEARCH_TEXT:
      newState.placeSearchText = payload.text
      return newState
    case CLEAR_PLACE_SEARCH_TEXT:
      newState.placeSearchText = ""
      return newState
    case CLEAR_PLACE_SEARCH_AUTOCOMPLETES:
      newState.placeSearchAutocompletes = []
      return newState

    // voting on places
    case MOUSE_OVER_PLACE:
      newState.mousedOverSuggestionIDPair = payload.idObject
      return newState
    
    // chat
    case CHANGE_CURRENTLY_TYPING_MESSAGE:
      newState.currentlyTypingMessage = payload.text
      return newState
    case CLEAR_CURRENTLY_TYPING_MESSAGE:
      newState.currentlyTypingMessage = ""
      return newState
    case CHANGE_CURRENTLY_EDITING_MESSAGE:
      newState.currentlyEditingMessage = payload.message_id
      newState.currentlyEditingMessageContent = payload.existingMessage
      return newState
    case CHANGE_CURRENTLY_EDITING_MESSAGE_CONTENT:
      newState.currentlyEditingMessageContent = payload.text
      return newState
    case CLEAR_CURRENTLY_EDITING_MESSAGE:
      newState.currentlyEditingMessage = null
      newState.currentlyEditingMessageContent = ""
      return newState

    default:
      return state
  }
}

const earliestEvent = (events) => {
  return events.sort((event1, event2) => new Date(event1.event_date).getTime() - new Date(event2.event_date).getTime())[0]
}

export default rootReducer