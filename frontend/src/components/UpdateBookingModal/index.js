import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  UpdateBookingThunk,
  CheckBookingsThunk,
  currentUserBookings,
} from "../../store/bookings";
import "../cssStuffs/modals.css";

const UpdateBookingModal = ({ oldBooking, userBookings, setUserBookings }) => {
  const [startDate, setStartDate] = useState(new Date (oldBooking.startDate));
  const [endDate, setEndDate] = useState(new Date(oldBooking.endDate));
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  console.log("-------OLDBOOKING---------", oldBooking);
  console.log("StartDate",startDate,"endDate",endDate)

  const dispatch = useDispatch();
  const spotBookings = useSelector((state) => state.bookings.CurBookings);
  let bookings = Object.values(spotBookings);
  let destroyOldBooking = bookings.find(
    (booking) => booking.id === oldBooking.id
  );
  console.log("thr booking to destroy", destroyOldBooking);
  bookings = bookings.filter((booking) => booking.id !== destroyOldBooking.id);
  useEffect(() => {
    dispatch(CheckBookingsThunk(oldBooking.spotId));
  }, [startDate, endDate, oldBooking.spotId, dispatch]);
  console.log("-------BOOKINGS---------", bookings);

 function updateBooking() {
    let newBooking = { ...oldBooking, startDate, endDate };
    console.log("-------NEWBOOKING---------", newBooking);
    dispatch(UpdateBookingThunk(newBooking)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    dispatch(currentUserBookings()).then(setUserBookings({ ...userBookings }));

    closeModal();
  }
  const checkAvailability = () => {
    if(endDate-startDate<=1){
      alert("minimum two days")
      return false;
    }
  
    const unavailableDates = bookings.reduce((unavailable, booking) => {
      const bookedDates = [];
      let start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      while (start <= end) {
        bookedDates.push(new Date(start));
        start.setDate(start.getDate()+1);
      }
      return [...unavailable, ...bookedDates];
    }, []);
  
    const datesInRange = [];
    let start = new Date(startDate);
    const end = new Date(endDate);
    while (start <= end) {
      datesInRange.push(new Date(start));
      start.setDate(start.getDate()+1);
    }
  
    const overlappingDates = datesInRange.filter(date => unavailableDates.some(unavailableDate => unavailableDate.toString() === date.toString()));
  
    if (overlappingDates.length > 0) {
      alert("A booking already exists during that time period, please try again");
      return false;
    }
    
    if(endDate<=startDate){
      alert("Invalid date range");
      return false;
    }
    
    if(startDate<=new Date()){
      alert("Invalid start date");
      return false;
    }
    
    return true;
  };
  

  // const disableButton = () => {
  //   let start = new Date(startDate);
  //   let end = new Date(endDate);
  //   if (end.getTime() > start.getTime() ) return false;
  //   if (start.getTime() <= new Date().getTime()) return false;
  //   if (end.getTime() - start.getTime() < 2) return false;
  //   else return true;
  // };

  // console.log(bookings);
  return (
    <div className="modal">
      <h1>Update Booking</h1>
      <form
        className="Form"
        onSubmit={(e) => {
          e.preventDefault();

          if (checkAvailability() === true) {
            return updateBooking();
          } else {
            alert(
              "unable to create booking, please try again with different dates"
            );
          }
        }}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <p className="pForm">Start Date</p>
        <label style={{ height: "4em" }}>
          <input
            min={new Date()}
            id={"startDate"}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={"formInput"}
            type="date"
         placeholder="MM/DD/YYYY"
        
     
          />
        </label>
        <p className="pForm">End Date</p>
        <label style={{ height: "4em" }}>
          <input
            id={"endDate"}
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            className={"formInput"}
          />
        </label>
        <button  className={"FormButton"}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBookingModal;
