
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { deleteBookingThunk } from "../../store/bookings";
import { currentUserBookings } from "../../store/bookings";
import  UpdateBookingModal  from "../UpdateBookingModal/testing";
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
  //console.log("inside current bookings");
  
  useEffect(() => {
    dispatch(currentUserBookings());
  }, [dispatch,userBookings]);
  return (
    <>
    <h1>Manage Bookings</h1>
    <div style={{width:"100%",display:"flex",flexDirection:"row-reverse",justifyContent:"space-around",flexWrap:"wrap"}}>
        {Object.values(things).map((booking) => (
          <div className='bookingTile'>

            <span style={{ marignRight: "20px" }}>{booking.spot.address}</span>
            <span>
              From{booking.startDate.split("T")[0]} Until{booking.endDate.split("T")[0]}
            </span>
            <div style={{display:"flex",flexDirection:'row'}}>{new Date(booking.startDate) > new Date() ? (
              <OpenModalMenuItem
              className="modalButton"
              itemText={<button className="modalButton">Cancel</button>}
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
              ""
            )}
            {new Date(booking.startDate) > new Date() ? (
              <OpenModalMenuItem
              className="modalButton"
              itemText={<button className="modalButton">Update</button>}
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
              ""
            )}</div>

            
          </div>
        ))}
    </div>
  </>);
};

export default BookingsList;

