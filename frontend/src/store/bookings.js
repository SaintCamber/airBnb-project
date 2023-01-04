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
  return 1;
};
export const createBookingThunk = (Book) => async (dispatch) => {
  console.log("creating booking");
  let response = await csrfFetch(`/api/spots/${Book.spotId}/bookings`, {
    method: "post",
    body: JSON.stringify({ startDate: Book.startDate, endDate: Book.endDate }),
  });
  if (response.ok) {
    let data = await response.json();
    await dispatch(createBooking(data));
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
        console.log('check the action inside getting current bookings',action)
        let CurBookings = {...action.curBookings.Bookings}
        console.log("CurBookings is currently",CurBookings)
      return { ...state,"CurBookings":CurBookings};
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
      let removeBooking = bookingState.userBookings.find(booking=>booking.id===action.bookingId)
      console.log('remove',removeBooking)
     delete bookingState.userBookings[removeBooking.id]
      return bookingState;
    case currentBookingsList:
      console.log("inside bookings reducer");
      let bookings = { ...action.data.Bookings };
      console.log("bookings action", action);
      console.log("bookings", bookings);

      return { ...state, userBookings: { ...bookings } };
    default:
      return state;
  }
};

export default bookingsReducer;
