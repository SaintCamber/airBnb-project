import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { deleteBookingThunk } from "../../store/bookings";
import { currentUserBookings } from "../../store/bookings";
import { useEffect } from "react";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingsList = (userId) => {
  let dispatch = useDispatch();
  let [bookings, setBookings] = useState({});
  let history = useHistory()
  console.log("inside current bookings");
  const deleteBooking = async (e) => {
    e.preventDefault();

    await dispatch(deleteBookingThunk(e.target.id))
        
    
  };
  let things = useSelector((state) =>
    Object.values(state.bookings.userBookings)
  );
  useEffect(() => {
    console.log("dispatch currentUSerBookings");
    dispatch(currentUserBookings());
  }, [dispatch]);
  return (
    <div>
       
      <ul>
        {things.map((booking) =>
         
            <li key={`booking#${booking.id}`}>
              <span style={{marignRight:"20px"}}>
              {booking.spot.address}
              </span>
              <span>
              {booking.startDate.split("T")[0]}:{booking.endDate.split("T")[0]}

              </span>
              {
                new Date(booking.startDate)>new Date() ? <button id={`${booking.id}`} onClick={deleteBooking}>
              
                delete
              </button>:""
              }
            </li>
         
        )}
      </ul>
    </div>
  );
};

export default BookingsList;
