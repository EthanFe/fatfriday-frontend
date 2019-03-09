import io from 'socket.io-client';
import { SOCKET_EMIT } from './actions';

export const createMySocketMiddleware = (url) => {
  return storeAPI => {
      const socket = io.connect(url);

      const events = [
        {name: "initialData", function: "setInitialData"},
        {name: "eventList", function: "updateEventList"},
        {name: "invitableUsersList", function: "updateInvitableUsersList"},
        {name: "loggedIn", function: "loginSuccess"},
        {name: "invitesList", function: "updateInvitesList"},
        {name: "placeNameMatches", function: "setPlaceSearchAutocompletes"},
        {name: "placeSuggestions", function: "updatePlaceSuggestions"},
        {name: "messages", function: "updateMessages"},
        {name: "onlineUsers", function: "updateOnlineUsers"},
      ]

      events.forEach(event => {
        socket.on(event.name, socketPayload => {
          storeAPI.dispatch({
            type : event.function,
            payload : socketPayload
          });
        })
      })

      return next => action => {
        if (action.type === SOCKET_EMIT) {
            socket.emit(action.payload.eventType, action.payload.socketPayload);
            return;
        }
        return next(action);
      }
  }
}