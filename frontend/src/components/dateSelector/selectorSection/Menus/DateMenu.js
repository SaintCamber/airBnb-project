import React, { useEffect, useRef, useState } from "react";
import "./DateMenu.css";

const DateMenu = ({ date, setDate, closeMenu }) => {
  const DateMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (DateMenuRef.current && !DateMenuRef.current.contains(event.target)) {
      toggleMenu();
      closeMenu();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [closeMenu]); // Make sure to include closeMenu in the dependency array

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="dateMenu" ref={DateMenuRef}>
     
        <div className={`dateMenuButton ${showMenu ? "selected" : ""}`}>
          <label htmlFor="dateInput">Select a date:</label>
          <input
            className="dateMenuDropdown"
            type="date"
            id="dateInput"
            name="dateInput"
            value={date}
            onClick={toggleMenu}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]} // Format min and max as ISO date strings
            max={new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]}
          />
        </div>
      
    </div>
  );
};

export default DateMenu;
