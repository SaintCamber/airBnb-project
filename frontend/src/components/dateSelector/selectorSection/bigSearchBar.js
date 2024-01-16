import React, { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import LocationMenu from "./Menus/LocationMenu.js";
import DateMenu from "./Menus/DateMenu.js";
import GuestsMenu from "./Menus/GuestsMenu.js";
import {updateSearch} from "../../../store/search.js"
import { useHistory } from 'react-router-dom'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./bigSearchBar.css";
import "./Menus/LocationMenu.css";
import "./Menus/DateMenu.css";

export default function BigSearchBar() {
  const ulRef = useRef();
  const u1Ref = useRef();
  const u2Ref = useRef();
  const u3Ref = useRef();
  const [menu, setCurMenu] = useState("");
  const dispatch = useDispatch()
//   consider the merits of changing this to a single call for the whole search
//   object and then keying into that for the desired values to make less calls
//   to useSelector since i imagine that's more efficient?

  const location = useSelector((state) => state.Search.location);
  const checkInDate = useSelector((state)=> state.Search.checkIn)
  const checkOutDate = useSelector((state)=> state.Search.checkOut)
  const guests = useSelector((state)=> state.Search.guests)
  const res = useSelector((state)=> state.Search.search)

  const history = useHistory()

  

  const handleClicks = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (ulRef.current.contains(e.target)) {
      if (u1Ref.current.contains(e.target)) {
        setCurMenu("anywhere");
      } else if (u2Ref.current.contains(e.target)) {
        setCurMenu("anyWeek");
      } else if (u3Ref.current.contains(e.target)) {
        setCurMenu("Guests");
      }
    } else setCurMenu("");
  };
  const submitSearch = async ()=>{
    // startDate=2023-01-01&endDate=2023-01-05&State=California
    if(location==="Anywhere") return
    let search = {startDate:checkInDate,endDate:checkOutDate,State:location}
    dispatch(updateSearch(search))
    history.push(`/Search`)
  }
  return (
    <div ref={ulRef} onClick={handleClicks} className="bigSearchBar">
      <div id="anywhere" ref={u1Ref} className={`AnywhereBig`}>
        {menu !== "anywhere" ? (
          location === "" ? (
            "Anywhere"
          ) : (
            location
          )
        ) : (
          <LocationMenu />
        )}
      </div>
      <div id="anyWeek" ref={u2Ref} className="anyWeekBig">
        {menu !== "anyWeek" && <div className="SearchHeading">Any Week</div>}
        {menu === "anyWeek" && (
          <>
            {" "}
            <div className="DateBig">
              <DateMenu option={"0"} />
            </div>
            <div className="DateBig">
              <DateMenu option={"1"} />
            </div>
          </>
        )}
      </div>
      <div id="Guests" ref={u3Ref} className="numGuestsBig">

        {menu === "Guests" ? <GuestsMenu /> : `add Guests`}
      </div>
      <div onClick={submitSearch}>
            <FontAwesomeIcon className="SearchIconBig"  icon={faMagnifyingGlass} />
          </div>
    </div>
  );
}
