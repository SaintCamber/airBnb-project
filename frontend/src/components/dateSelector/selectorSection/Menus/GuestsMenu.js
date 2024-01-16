import React from "react";
import { useDispatch, useSelector, } from "react-redux";
import { updateGuests } from "../../../../store/search.js";
import { useState,useRef,useEffect } from "react";
import "./GuestsMenu.css"

const GuestsMenu = () => {
  // Implement the logic and functionality for selecting the number of guests
  // and the number of infants
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(true);
  const Guests = useSelector(state => state.Search.guests) || 1
  const guestMenuRef = useRef(null)

  const handleClickOutside = (e)=>{
   return !guestMenuRef.current.contains(e.target) ? setShowMenu(prev=>!prev) : ""
  }

  

  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutside)
    return document.removeEventListener("mousedown",handleClickOutside)
  },[])

  return (
    <div className="guestsMenu">
    {Guests}
    {showMenu && (
      <div className="guestsMenuDropdown">
      <div className="guestsMenuFunc">
      <button onClick={()=>{dispatch(updateGuests(Guests-1))}}>-</button>
      <div>{Guests}</div>
      <button onClick={()=>{dispatch(updateGuests(Guests+1))}}>+</button>
      </div>
  
      </div>
    )}
      

    </div>
  );
};

export default GuestsMenu;






