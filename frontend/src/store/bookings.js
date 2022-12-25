import { csrfFetch } from "./csrf";
export const check = 'check';
const create = 'create'
const checkBooking=(curBookings) =>{return {
    type:check,
    curBookings
}}

const createBooking =(booking) =>{
    return {type:create,
        booking}
    }
    
    let initialState = {CurBookings:{}}
    export const CheckBookingsThunk=(spotId)=>async dispatch=>{
        console.log("bookingSpotId",spotId)
        let response = await csrfFetch(`/api/Spots/${spotId}/bookings`)
        if(response.ok){
            let bookings = await response.json()
            console.log(bookings)
            dispatch(checkBooking(bookings))
            return bookings
    }
    return 1
}
export const createBookingThunk=(Book)=>async dispatch =>{
    console.log('creating booking')
let response = await csrfFetch(`/api/spots/${Book.spotId}/bookings`,{
    method:"post",
    body:JSON.stringify(
        {startDate:Book.startDate,
        endDate:Book.endDate}
    )
})
if(response.ok){
    let data = await response.json()
    dispatch(createBooking(data))
    return data
}
console.log('response booking thunk not ok')
}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case check:
        return { ...state, CurBookings: action.curBookings };
      case create:
        let newState= {...state}
        let current = {...state.CurBookings}
        console.log("current:inside create of booking reducer",current)
        let realList = {...current.Bookings,...action.booking}
        console.log('realList inside create of booking reducer')
        delete newState.CurBookings
        newState.CurBookings=realList
        return newState
      default:
        return state;
    }
  };

export default bookingsReducer