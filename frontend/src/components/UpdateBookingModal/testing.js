import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  UpdateBookingThunk,
  CheckBookingsThunk,
  currentUserBookings,
} from "../../store/bookings";
import "../cssStuffs/modals.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UpdateBookingModal = ({ oldBooking, userBookings, setUserBookings }) => {
  const [startDate, setStartDate] = useState(new Date(oldBooking.startDate));
  const [endDate, setEndDate] = useState(new Date(oldBooking.endDate));
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  //console.log("-------OLDBOOKING---------", oldBooking);
  //console.log("StartDate",startDate,"endDate",endDate)

  const dispatch = useDispatch();
  const spotBookings = useSelector((state) => state.bookings?.CurBookings);
  let bookings = Object.values(spotBookings);
  let destroyOldBooking = bookings?.find(
    (booking) => booking.id === oldBooking.id
  );
  //console.log("thr booking to destroy", destroyOldBooking);
  bookings = bookings?.filter((booking) => booking?.id !== destroyOldBooking?.id);
  useEffect(() => {
    dispatch(CheckBookingsThunk(oldBooking.spotId));
  }, [startDate, endDate, oldBooking.spotId, dispatch]);
  //console.log("-------BOOKINGS---------", bookings);

  function updateBooking() {
    let newBooking = { ...oldBooking, startDate, endDate };
    //console.log("-------NEWBOOKING---------", newBooking);
    dispatch(UpdateBookingThunk(newBooking)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    dispatch(currentUserBookings()).then(setUserBookings({ ...userBookings }));

    closeModal();
  }

  const checkAvailability = () => {
    //console.log("the bookings while checkavailability runs",bookings)
    if(endDate-startDate<=1){
      alert("minimum two days")
      return
    }
    let unavailable = [];
    bookings.forEach((booking) => {
      let start = new Date(booking?.startDate);
      let end = new Date(booking?.endDate);
      while (start <= end) {
        unavailable.push(start);
        start.setDate(start.getDate()+1);
        //console.log("unavailable",unavailable)
      }
    });
    const startDateMatch = unavailable.find(
      (date) => date.toString() === startDate.toString()
    );
    const endDateMatch = unavailable.find(
      (date) => date.toString() === endDate.toString()
    );
    if (startDateMatch || endDateMatch) {
      alert("a booking already exists during that time period, please try again");
      return false;
    }
    if(endDate<=startDate){
      alert("invalid Date range")
      return false
    }
    if(startDate<=new Date()){
      alert("invalid Start Date")
      return false
    }
    return true
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  }

  const handleEndDateChange = (date) => {
    setEndDate(date);
  }
  const buildUnavailableArray = (bookings, startDate, endDate) => {
    const unavailable = [];
    bookings?.forEach((booking) => {
      const start = new Date(booking?.startDate);
      const end = new Date(booking?.endDate);
      while (start <= end) {
        unavailable.push(start.toDateString());
        start.setDate(start.getDate() + 1);
      }
    });
    return unavailable;
  };
  const tileDisabled = ({ activeStartDate, date, view }) => {
    let check = buildUnavailableArray(bookings, startDate, endDate);
    return check.includes(date.toDateString());
  };

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
              "unable to create booking, please try again"
            );
          }
        }}
      >
        <h3 style={{textAlign:"center"}}>Start Date</h3>
        <div style={{display:"flex",flexDirection:"center"}}>
          <Calendar
            style={{width:"50vw",maxWidth:"100%"}}
            name="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            minDate={new Date()}
            tileDisabled={tileDisabled}
          />
        </div>
          <h3 style={{textAlign:"center"}}>End Date</h3>
        <div  style={{display:"flex",flexDirection:"center"}}>
          <Calendar
              style={{width:"50vw",maxWidth:"100%"}}  
            name="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            minDate={startDate}
            tileDisabled={tileDisabled}
          />
        </div>
        <button className="FormButton" type="submit">Update Booking</button>
      </form>
    </div>
  );
      }
      
      export default UpdateBookingModal;