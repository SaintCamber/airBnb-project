
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { deleteBookingThunk } from "../../store/bookings";
import { currentUserBookings } from "../../store/bookings";
import  UpdateBookingModal  from "../UpdateBookingModal";
import DeleteBookingModal from "../DeleteBookingModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './index.css'
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const BookingsList = (userId) => {
  let dispatch = useDispatch();
  let things = useSelector((state) =>
    state.bookings.userBookings
  );
  let [userBookings, setUserBookings] = useState({...things});
  const [showMenu,setShowMenu] = useState(false)
  const closeMenu = () => setShowMenu(false);
  let history = useHistory();
  console.log("inside current bookings");
  
  useEffect(() => {
    dispatch(currentUserBookings());
  }, [dispatch,userBookings]);
  return (
    <div>
        {Object.values(things).map((booking) => (
          <div className='bookingTile'>

            <span style={{ marignRight: "20px" }}>{booking.spot.address}</span>
            <span>
              From{booking.startDate.split("T")[0]} Until{booking.endDate.split("T")[0]}
            </span>
            {new Date(booking.startDate) > new Date() ? (
              <OpenModalMenuItem
              className="modalButton"
              itemText={<button>Cancel</button>}
              onItemClick={closeMenu}
              modalComponent={
                <DeleteBookingModal
                className="modalButton"
              onItemClick={closeMenu}
                  booking={booking}
                  oldState={userBookings}
                  UpdateOldState={setUserBookings}
                />
              }
            />
            ) : (
              <div>unable to cancel past bookings</div>
            )}
            {new Date(booking.startDate) > new Date() ? (
              <OpenModalMenuItem
              className="modalButton"
              itemText={<button>Update</button>}
              onItemClick={closeMenu}
              modalComponent={
                <UpdateBookingModal
                className="modalButton"
                itemText={<button>Update</button>}
              onItemClick={closeMenu}
                  oldBooking={booking}
                  userBookings={userBookings}
                  setUserBookings={setUserBookings}
                />
              }
            />
            ) : (
              <div>unable to update past bookings</div>
            )}

            
          </div>
        ))}
    </div>
  );
};

export default BookingsList;

