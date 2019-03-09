import {store} from "./index.js"
export const SOCKET_EMIT = 'general:socketEmit'
export const CHANGE_LOGIN_USERNAME = 'loginUI:changeLoginUsername'
export const CHANGE_LOGIN_PASSWORD = 'loginUI:changeLoginPassword'
export const CLEAR_LOGIN_FIELDS = 'loginUI:clearLoginFields'
export const LOGGED_OUT = 'auth:loggedOut'
export const CHANGE_NEW_EVENT_NAME = 'eventUI:changeNewEventName'
export const CHANGE_NEW_EVENT_DATE = 'eventUI:changeNewEventDate'
export const NEW_EVENT_CREATED = 'eventUI:newEventCreated'
export const CHANGE_INVITING_USER_TEXT = 'inviteUI:changeInvitingUserText'
export const CLEAR_INVITING_USER_TEXT = 'inviteUI:clearInvitingUserText'
export const CHANGE_PLACE_SEARCH_TEXT = 'suggestUI:changePlaceSearchText'
export const CLEAR_PLACE_SEARCH_TEXT = 'suggestUI:clearPlaceSearchText'
export const CLEAR_PLACE_SEARCH_AUTOCOMPLETES = 'suggestUI:clearPlaceSearchAutocompletes'
export const MOUSE_OVER_PLACE = 'voteUI:mouseOverPlace'
export const CLICK_ON_EVENT = 'mainUI:clickOnEvent'
export const CHANGE_CURRENTLY_TYPING_MESSAGE = 'messageUI:changeCurrentlyTypingMessage'
export const CLEAR_CURRENTLY_TYPING_MESSAGE = 'messageUI:clearCurrentlyTypingMessage'
export const CHANGE_CURRENTLY_EDITING_MESSAGE = 'messageUI:changeCurrentlyEditingMessage'
export const CHANGE_CURRENTLY_EDITING_MESSAGE_CONTENT = 'messageUI:changeCurrentlyEditingMessageContent'
export const CLEAR_CURRENTLY_EDITING_MESSAGE = 'messageUI:clearCurrentlyEditingMessage'

export function socketEmit(eventType, socketPayload) {
  return {
    type: SOCKET_EMIT,
    payload: {
      eventType: eventType,
      socketPayload: socketPayload
    }
  }
}

export function logout(token, user_id) {
  store.dispatch({ type: LOGGED_OUT })
  return socketEmit("logout", {
    token: token,
    user_id: user_id
  })
}

export function changeLoginUsername(username) {
  return {
    type: CHANGE_LOGIN_USERNAME,
    payload: {username}
  }
}

export function changeLoginPassword(password) {
  return {
    type: CHANGE_LOGIN_PASSWORD,
    payload: {password}
  }
}

export function login(username, password) {
  store.dispatch({ type: CLEAR_LOGIN_FIELDS })
  return socketEmit("login", {
    username: username,
    password: password
  })
}

export function createNewUser(username, password) {
  store.dispatch({ type: CLEAR_LOGIN_FIELDS })
  return socketEmit("signUp", {
    username: username,
    password: password
  })
}

export function changeNewEventName(name) {
  return {
    type: CHANGE_NEW_EVENT_NAME,
    payload: {name}
  }
}

export function changeNewEventDate(date) {
  return {
    type: CHANGE_NEW_EVENT_DATE,
    payload: {date}
  }
}

export function createNewEvent(token, user_id, eventName, eventDate) {
  store.dispatch({ type: NEW_EVENT_CREATED })
  return socketEmit("createNewEvent", {
    token: token,
    name: eventName,
    user_id: user_id,
    date: eventDate
  })
}

export function changeInvitingUserText(text) {
  return {
    type: CHANGE_INVITING_USER_TEXT,
    payload: {text}
  }
}

export function inviteUser(token, user_id, invitee_user_id, event_id) {
  store.dispatch({ type: CLEAR_INVITING_USER_TEXT })
  return socketEmit("inviteUserToEvent", {
    token: token,
    user_id: user_id,
    invitee_user_id: invitee_user_id,
    event_id: event_id
  })
}

export function acceptInvitation(token, user_id, event_id) {
  return socketEmit("acceptInvitation", {
    token: token,
    user_id: user_id,
    event_id: event_id
  })
}

export function changePlaceSearchText(text) {
  return {
    type: CHANGE_PLACE_SEARCH_TEXT,
    payload: {text}
  }
}

export function requestPlaceAutocompletes(token, user_id, text) {
  return socketEmit("placeTextEntered", {
    token: token,
    user_id: user_id,
    text: text
  })
}

export function clearPlaceSearchAutocompletes() {
  return {
    type: CLEAR_PLACE_SEARCH_AUTOCOMPLETES
  }
}

export function suggestPlace(token, user_id, eventID, placeID, placeName) {
  store.dispatch({ type: CLEAR_PLACE_SEARCH_TEXT })
  return socketEmit("suggestPlace", {
    token: token,
    user_id: user_id,
    place_id: placeID,
    place_name: placeName,
    event_id: eventID
  })
}

export function mouseOverPlace(idObject) {
  return {
    type: MOUSE_OVER_PLACE,
    payload: {idObject}
  }
}

export function clickOnPlace(token, user_id, place_id, event_id, alreadyVoted) {
  return socketEmit("voteForPlace", {
    token: token,
    user_id: user_id,
    place_id: place_id,
    event_id: event_id,
    setVoteTo: !alreadyVoted
  })
}

export function clickOnEvent(event_id) {
  store.dispatch({ type: CLEAR_CURRENTLY_TYPING_MESSAGE })
  store.dispatch({ type: CLEAR_CURRENTLY_EDITING_MESSAGE })
  return {
    type: CLICK_ON_EVENT,
    payload: {event_id}
  }
}

export function changeCurrentlyTypingMessage(text) {
  return {
    type: CHANGE_CURRENTLY_TYPING_MESSAGE,
    payload: {text}
  }
}

export function changeCurrentlyEditingMessage(message_id, existingMessage) {
  return {
    type: CHANGE_CURRENTLY_EDITING_MESSAGE,
    payload: {message_id, existingMessage}
  }
}

export function changeCurrentlyEditingMessageContent(text) {
  return {
    type: CHANGE_CURRENTLY_EDITING_MESSAGE_CONTENT,
    payload: {text}
  }
}

export function sendMessage(token, user_id, event_id, message) {
  store.dispatch({ type: CLEAR_CURRENTLY_TYPING_MESSAGE })
  return socketEmit("sendMessage", {
    token: token,
    user_id: user_id,
    event_id: event_id,
    message: message
  })
}

export function editMessage(token, user_id, message_id, new_message) {
  store.dispatch({ type: CLEAR_CURRENTLY_EDITING_MESSAGE })
  return socketEmit("editMessage", {
    token: token,
    user_id: user_id,
    message_id: message_id,
    new_message: new_message
  })
}

export function deleteMessage(token, user_id, message_id) {
  return socketEmit("deleteMessage", {
    token: token,
    user_id: user_id,
    message_id: message_id
  })
}

export function deleteEvent(token, user_id, event_id) {
  return socketEmit("removeEvent", {
    token: token,
    user_id: user_id,
    event_id: event_id
  })
}