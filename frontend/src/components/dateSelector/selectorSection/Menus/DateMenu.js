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
         
        </div>
      
    </div>
  );
};

export default DateMenu;
