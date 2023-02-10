// frontend/src/store/session.js
import { csrfFetch } from './csrf';
//constants used by the reducer for types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const OWNED = 'session/spots'
//action creators for the final pojo sent when logging someone in
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
//same as above but for logging out
const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
const ownedSpots =(spots) =>{
  return {
    type:OWNED,
    payload:spots
  }
}
//action to login a user,looks to be destructuring crediential and password from the use obj passed in as a parameter then defining a response object
// which seems to be the result of a csrfFetch post to api/session so essentially if the user passed in to login is a valid user then this will send a fetch request to the api
//and log in the user than data is set to response.json() meaning the body of the response obj i believe. then dispatch the setUser action creator with a payload of the user 
//stored in data
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  dispatch(populateOwnedSpots())
  return response;
};
//the state of the session in the event no one is logged in is just an object with user set to null.
// frontend/src/store/session.js
// ...
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
  dispatch(populateOwnedSpots())

    return response;
  };

  // frontend/src/store/session.js
  // ...
  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
  // ...

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };
  //this takes the initial state and an action supplied by the end user, if that action equates to SET_USER then this will copy state mutate the copy to reflect 
  //a new user being logged in and then return the newState to the store the same though i guess the opposite for REMOVE_USER
  
export const populateOwnedSpots = () =>async (dispatch)=>{
  let currentUsersSpots = await csrfFetch('/api/spots/current')
  if(currentUsersSpots.ok){
    let data = await currentUsersSpots.json()
    console.log("current users spots",data)
    dispatch(ownedSpots(data))
  }
  return currentUsersSpots
}

const initialState = { user: null,userOwnedSpots:{} };
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      newState.userOwnedSpots = {}
      return newState;
      case OWNED:
        newState = Object.assign({},state)
        let currentSpots = {}
        action.payload.Spots.forEach((spot)=>currentSpots[spot.id]=spot)
        
        newState["userOwnedSpots"] = {...currentSpots}
        return newState
    default:
      return state;
  }
};
// this gets exported to be given to the root reducer that will hold all the reducers for the app
export default sessionReducer;