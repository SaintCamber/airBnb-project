import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './dateSelector.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getSpots } from '../../store/spots';


// begin adding search feature to the date selecor bar
// alright so the search will work like this:
// 1. user types in a location and clicks the search button
// 2. the location is geocoded to lat and long
// 3. the lat and long are used to search the redux store for spots
// 4. the spots are returned and displayed on the map
// 5. the spots are also displayed in a list below the map
// 6. the user can click on a spot in the list or on the map to view the spot

export default function DateSelector() {
   const dispatch = useDispatch()
   const history = useHistory()
   const [location, setLocation] = useState("")
   const [startDate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [guests, setGuests] = useState(1)
   const [showGuests, setShowGuests] = useState(false)
   
   const handleSearch = async (e) => {
      e.preventDefault()
      const queryObj = {}
      if (location) {
         queryObj.location = location
      }
      if (startDate) {
         queryObj.startDate = startDate
      }
      if (endDate) {
         queryObj.endDate = endDate
      }
      if (guests) {
         queryObj.guests = guests
      }
      

    return (

    <div className="bar" onClick={()=>{alert("feature coming soon!")}}>
       <span className="dateButton">anywhere</span>
       <div className="wrapper">
       <span className="dateButton">any week</span>

       </div>
       <span className="dateButton">add Guests<div style={{borderRadius:"100%",backgroundColor:"#FF385C",width:"30px",height:"30px",justifyContent:"center",display:"flex",alignContent:"center",alignItems:'center',    marginLeft: "15px"}}>
       <FontAwesomeIcon style={{color:"white"}}icon={faMagnifyingGlass}/> 

       </div></span>
    </div>
          
    
    );
  }