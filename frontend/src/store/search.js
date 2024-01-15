import { csrfFetch } from "./csrf";


const SET_SEARCH = 'search/setSearch';
const SET_LOCATION = 'search/setLocation';
const SET_CHECK_IN = 'search/setCheckIn';
const SET_CHECK_OUT = 'search/setCheckOut';
const SET_GUESTS = 'search/setGuests';

const setSearch = (search) => ({
    type: SET_SEARCH,
    search
});

const setLocation = (location) => ({
    type: SET_LOCATION,
    location
});

const setCheckIn = (checkIn) => ({
    type: SET_CHECK_IN,
    checkIn
});

const setCheckOut = (checkOut) => ({
    type: SET_CHECK_OUT,
    checkOut
});

const setGuests = (guests) => ({
    type: SET_GUESTS,
    guests
});

export const updateSearch = (search) => async (dispatch) => {
    let results = await csrfFetch(`/api/spots/search/${search}`);
    dispatch(setSearch(search));
};

export const updateLocation = (location) => async (dispatch) => {
            dispatch(setLocation(location))}

export const updateCheckIn = (checkIn) => async (dispatch) => {

            dispatch(setCheckIn(checkIn))}
export const updateCheckOut = (checkOut) => async (dispatch) => {
    
                dispatch(setCheckOut(checkOut))}
export const updateGuests = (guests) => async (dispatch) => {
    
                    dispatch(setGuests(guests))}
const initialState = { search: '', location: 'Anywhere', checkIn: '', checkOut: '', guests: '' };

const searchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SEARCH:
            newState = Object.assign({}, state);
            newState.search = action.search;
            return newState;
        case SET_LOCATION:
            newState = Object.assign({}, state);
            newState.location = action.location;
            return newState;
        case SET_CHECK_IN:
            newState = Object.assign({}, state);
            newState.checkIn = action.checkIn;
            return newState;
        case SET_CHECK_OUT:
            newState = Object.assign({}, state);
            newState.checkOut = action.checkOut;
            return newState;
        case SET_GUESTS:
            newState = Object.assign({}, state);
            newState.guests = action.guests;
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
