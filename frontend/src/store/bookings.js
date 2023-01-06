import { csrfFetch } from "./csrf";
export const check = "check";
const create = "create";
const deleteBooking = "delete";
const currentBookingsList = "current";
const checkBooking = (curBookings) => {
  return {
    type: check,
    curBookings,
  };
};
const deleteABooking = (bookingId) => {
  return { type: deleteBooking, bookingId };
};
const createBooking = (booking) => {
  return { type: create, booking };
};
const currentBookings = (data) => {
  return { type: currentBookingsList, data };
};

let initialState = { CurBookings: {}, userBookings: {} };
export const CheckBookingsThunk = (spotId) => async (dispatch) => {
  console.log("bookingSpotId", spotId);
  let response = await csrfFetch(`/api/Spots/${spotId}/bookings`);
  if (response.ok) {
    let bookings = await response.json();
    console.log("checkingbookings",bookings);
    await dispatch(checkBooking(bookings));
    return bookings;
  }
};
export const createBookingThunk = (Book) => async (dispatch) => {
  console.log("creating booking");
  let response = await csrfFetch(`/api/spots/${Book.spotId}/bookings`, {
    method: "post",
    body: JSON.stringify({ startDate: Book.startDate, endDate: Book.endDate }),
  });
  if (response.ok) {
    let data = await response.json();
    console.log("the data inside create booking",data)
    dispatch(createBooking(data));
    return data;
  }
  console.log("response booking thunk not ok");
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  console.log("delete booking thunk called");
  let response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("delete response ok");
    dispatch(deleteABooking(bookingId));
  }
};
export const currentUserBookings = () => async (dispatch) => {
    console.log('inside the current user thunk')
  let response = await csrfFetch("/api/Bookings/current");
  if (response.ok) {
    const data = await response.json();
    console.log("currentBookings", data);
    dispatch(currentBookings(data));
    return data;
  }
};
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case check:
      console.log('inside case check')
      let currentBookings = {}
      console.log("the check action is ",action)
      console.log("thefirst booking is:",action.curBookings.Bookings[0])
      action.curBookings.Bookings.forEach(booking=>currentBookings[booking.id]={...booking})
      let UpdateState = {...state}
      delete UpdateState.CurBookings
      console.log("the current bookings should be ",currentBookings)
      UpdateState.CurBookings={...currentBookings}
      console.log("the updated state is ",UpdateState)
      return UpdateState
    case create:
      let newState = { ...state };
      let current = { ...state.CurBookings };
      console.log("current:inside create of booking reducer", current);
      delete newState.CurBookings;
      newState.CurBookings = { ...current };
      newState.CurBookings[action.booking.id]=action.booking
      return newState;

    case deleteBooking:
      let bookingState = { ...state };
      console.log("testing testing testing", bookingState.userBookings);
      console.log(action)
      delete bookingState.userBookings[action.bookingId]
      return bookingState;
    case currentBookingsList:
      console.log("inside bookings reducer");
      let bookings = Object.values(action.data.Bookings)
      console.log("bookings action", action);
      console.log("bookings", bookings);
      let newBookingState={}
        bookings.forEach(booking=>newBookingState[booking.id]=booking)
      return { ...state,userBookings:{...newBookingState} };
    default:
      return state;
  }
};

export default bookingsReducer;
