import { csrfFetch } from "./csrf";

// Action types
export const CHECK_BOOKINGS = "bookings/check";
export const CREATE_BOOKING = "bookings/create";
export const UPDATE_BOOKING = "bookings/update";
export const DELETE_BOOKING = "bookings/delete";
export const CURRENT_BOOKINGS_LIST = "bookings/current";

// Action creators
export const checkBookings = (bookings) => ({
  type: CHECK_BOOKINGS,
  payload: bookings,
});

export const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  payload: booking,
});

export const updateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  payload: booking,
});

export const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  payload: bookingId,
});

export const setCurrentBookingsList = (bookings) => ({
  type: CURRENT_BOOKINGS_LIST,
  payload: bookings,
});

// Thunks
export const CheckBookingsThunk= (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/Spots/${spotId}/bookings`);
    if (response.ok) {
      const bookings = await response.json();
      dispatch(checkBookings(bookings));
    }
  } catch (err) {
    console.error(err);
  }
};

export const createBookingThunk = (booking) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
      method: "post",
      body: JSON.stringify({
        startDate: booking.startDate,
        endDate: booking.endDate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createBooking(data));
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateBookingThunk = (booking) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
      method: "put",
      body: JSON.stringify({
        startDate: booking.startDate,
        endDate: booking.endDate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateBooking(data));
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteBooking(bookingId));
    }
  } catch (err) {
    console.error(err);
  }
};

export const currentUserBookings  = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/Bookings/current");
    if (response.ok) {
      const data = await response.json();
      dispatch(setCurrentBookingsList(data));
    }
  } catch (err) {
    console.error(err);
  }
};

// Reducer
const initialState = {
    curBookings: {},
    userBookings: {},
  };
  
  const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHECK_BOOKINGS:
        const curBookings = {};
        action.payload.Bookings.forEach(
          (booking) => (curBookings[booking.id] = { ...booking })
        );
        return { ...state, curBookings };
      case CREATE_BOOKING:
        return {
          ...state,
          curBookings: {
            ...state.curBookings,
            [action.payload.id]: { ...action.payload },
          },
        };
      case UPDATE_BOOKING:
        return {
          ...state,
          curBookings: {
            ...state.curBookings,
            [action.payload.id]: { ...action.payload },
          },
        };
      case DELETE_BOOKING:
        const updatedCurBookings = { ...state.curBookings };
        delete updatedCurBookings[action.payload];
        return { ...state, curBookings: updatedCurBookings };
      case CURRENT_BOOKINGS_LIST:
        return {
          ...state,
          userBookings: { ...action.payload },
        };
      default:
        return state;
    }
  };
  
  export default bookingsReducer;
  