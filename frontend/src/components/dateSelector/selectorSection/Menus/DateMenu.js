import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckIn, updateCheckOut } from "../../../../store/search.js"; // Make sure to import the appropriate action

import "./DateMenu.css";

const DateMenu = ({ option }) => {
  const DateMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const dispatch = useDispatch();
  
  
    let checkInDate = useSelector((state) => state.Search.checkInDate);
  
  
    let checkOutDate = useSelector((state) => state.Search.checkOutDate);
  

  const handleDateChange = (e) => {
    setDate(e.target.value);

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
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            onBlur={() => {
              if (option === "0") {
                dispatch(updateCheckIn(date));
              } else {
                dispatch(updateCheckOut(date));
              }
              setShowMenu(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateMenu;
