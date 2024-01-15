import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckIn, updateCheckOut } from "../../../../store/search.js"; // Make sure to import the appropriate action
import Calendar from "react-calendar";

import "./DateMenu.css";

const DateMenu = ({ option }) => {
  const DateMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const dispatch = useDispatch();
  
  
    let checkInDate = useSelector((state) => state.Search.checkIn);
  
  
    let checkOutDate = useSelector((state) => state.Search.checkOut);
  

  const handleDateChange = (value) => {
    if (option === "0") {
      setDate(value.toISOString().split("T")[0]);
      dispatch(updateCheckIn(value.toISOString().split("T")[0]));
    }
    if (option === "1") {
      setDate(value.toISOString().split("T")[0]);
      dispatch(updateCheckOut(value.toISOString().split("T")[0]));
    }
  };


  const handleClicks = (e) => {
    e.preventDefault();
    if (DateMenuRef.current.contains(e.target)) {
      setShowMenu(true);
    } else setShowMenu(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (DateMenuRef.current && !DateMenuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div className="dateMenu" ref={DateMenuRef}>
      {option === "0" ? (date===today ? "Check in" : date) :(date===today ? "Check out" : date)}
      <div
        className={`dateMenuButton`}
        onClick={handleClicks}
      >
      </div>
      {showMenu && (
        <div className="dateMenuDropdown">
        <Calendar
          onChange={handleDateChange}
          value={new Date(date)}
          minDate={ option === "0" ? new Date() : new Date(new Date(checkInDate).getTime() + 86400000)}
          
          returnValue="start"
        />  
        
        </div>
      )}
    </div>
  );
};

export default DateMenu;
