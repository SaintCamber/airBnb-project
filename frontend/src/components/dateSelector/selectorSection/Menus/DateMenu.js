import React, { useEffect, useRef, useState } from "react";
import "./DateMenu.css";

const DateMenu = ({option}) => {
  const DateMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);



  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleClicks = (e)=>{
    e.preventDefault()
    if (DateMenuRef.current.contains(e.target)){
      setShowMenu(true)
    }
    else setShowMenu(false)

  }

  return (
    <div className="dateMenu" ref={DateMenuRef}>{option === '0' ? "Check in" : "Check out"}
     
        <div className={`dateMenuButton ${showMenu ? "selected" : "hide"}`}>
          <label htmlFor="dateInput">Select a date:</label>
          <input
            className="dateMenuDropdown"
            type="date"
            id="dateInput"
            name="dateInput"
            value={date}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]} // Set min date to today
            max={new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]}
          />
        </div>
      
    </div>
  );
};

export default DateMenu;
