import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { UpdateBookingThunk, CheckBookingsThunk } from "../../store/bookings";
import "../cssStuffs/modals.css";

const UpdateBookingModal = ({ oldBooking,userBookings,setUserBookings }) => {
  const [startDate, setStartDate] = useState(oldBooking.startDate);
  const [endDate, setEndDate] = useState(oldBooking.endDate);
  const { closeModal } = useModal();
  console.log("-------OLDBOOKING---------", oldBooking);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CheckBookingsThunk(oldBooking.spotId));
  },[startDate,endDate]);
  const spotBookings = useSelector((state) =>  state.bookings.CurBookings)
    const bookings = Object.values(spotBookings);
  console.log("-------BOOKINGS---------", bookings);

  async function updateBooking(e) {
    e.preventDefault();
    let newBooking = { ...oldBooking, startDate, endDate };
    console.log("-------NEWBOOKING---------", newBooking);
    await dispatch(UpdateBookingThunk(newBooking));
    setUserBookings({...userBookings})
    closeModal();
  }
  const checkAvailability = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let available = true;
    bookings.filter((book)=>book.id===oldBooking.id).forEach((booking) => {
      let bookingStart = new Date(booking.startDate);
      let bookingEnd = new Date(booking.endDate);
      if (start >= bookingStart && start <= bookingEnd) {
        available = false;
      }
      if (end >= bookingStart && end <= bookingEnd) {
        available = false;
      }
    });
    return available;
  };

  console.log(bookings);
  return (
    <div className="modal">
      <h1>Update booking</h1>
      <form
        className="Form"
        onSubmit={(e) => {
          e.preventDefault();
          if (checkAvailability(startDate, endDate)===true) {
            updateBooking(e);
          } else {
            alert(
              "unable to create booking, please try again with different dates"
            );
          }
        }}>
        <p className='pForm'>Start Date</p>
        <label style={{ height: "4em" }}>
          <input
            min={new Date()}
            id={"startDate"}
            value={startDate.toString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            className={"formInput"}
          />
        </label>
        <p className='pForm'>End Date</p>
        <label style={{ height: "4em" }}>
          <input
            id={"endDate"}
            value={endDate.toString().split("T")[0]}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            className={"formInput"}
          />
        </label>
        <button className={"FormButton"}>Update</button>
      </form>
    </div>
  );
};

export default UpdateBookingModal;
