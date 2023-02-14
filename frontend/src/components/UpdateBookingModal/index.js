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
    console.log("the bookings while checkavailability runs",bookings)
if(endDate-startDate<=1){
  alert("minimum two days")
 return}
    // console.log("checking availability");
    // console.log("bookings bookings bookings ", bookings);
    let unavailable = [];
    bookings.forEach((booking) => {
      let start = new Date(booking.startDate);
      let end = new Date(booking.endDate);
      while (start <= end) {
        unavailable.push(start);
        start.setDate(start.getDate()+1);
        console.log("unavailable",unavailable)
      }
    });
    const startDateMatch = unavailable.find(
      (date) => date.toString() === new Date(startDate).toString()
      
    );
    const endDateMatch = unavailable.find(
      (date) => date.toString() === new Date(endDate).toString()
    );
    if (startDateMatch || endDateMatch) {
      alert("unavailable");
      return false;
    }
    if(endDate<startDate){
      alert("invalid Date range")
      return false
    }
    if(startDate<new Date()){
      alert("invalid Start Date")
     return false

    }
    return true
  };


  const disableButton = () => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    if (end.getTime() > start.getTime() ) return false;
    if (start <= new Date()) return false;
    if (end - start < 2) return false;
    else return true;
  };

  console.log(bookings);
  return (
    <div className="modal">
      <h1>Update booking</h1>
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
            type="date"
            className={"formInput"}
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
        <button disabled={disableButton()} className={"FormButton"}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBookingModal;
