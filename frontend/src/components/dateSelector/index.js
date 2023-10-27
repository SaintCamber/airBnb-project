import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './dateSelector.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SelectorSection from './selectorSection/index.js';
import './dateSelector.css'



//current cersion of the search bar in a more basic format to speed the process
//along.

export default function DateSelector() {
   const dispatch = useDispatch()
   const history = useHistory()
   const [curMenu, setCurMenu] = useState("")
   const [destination, setDestination] = useState('');
   const [checkInDate, setCheckInDate] = useState('');
   const [checkOutDate, setCheckOutDate] = useState('');
   const [numGuests, setNumGuests] = useState(1);
   
   const handleSearch = async (e) => {
      e.preventDefault()
      const queryObj = {}
      if (destination) {
         queryObj.location = destination
      }
      if (checkInDate) {
         queryObj.startDate = checkInDate
      }
      if (checkOutDate) {
         queryObj.endDate = checkOutDate
      }
      if (numGuests) {
         queryObj.guests = numGuests
      }

      //checks for the queryObj
      // console.log(queryObj)
      // the destination needs has to exist, otherwise we for sure don't have a
      // spot there. so some kind of geo coding needs to happen to check the
      // given location against earth.
      // the backend is expecting an object that looks like :
      // location: {
  //   city: "San Francisco",
  //   state: "California",
  //   country: "United States",
  //   lat: 37.7749295,
  //   lng: -122.4194155,
  // }

  // which means i need to convert the given location into it's lat and lng as
  // well as the city state and country. so i need to geocode the given location
  // and then send the lat and lng to the backend. what is the easiest way to
  // geocode probably google? so lets go get the almight google to help out real
  // fast, shall we? 

      const geoCode = (destination)=>{





      }
  
      
     
     

   }


   
   
     const handleDestinationChange = (e) => {
       setDestination(e.target.value);
     };
   
     const handleCheckInDateChange = (e) => {
       setCheckInDate(e.target.value);
     };
   
     const handleCheckOutDateChange = (e) => {
       setCheckOutDate(e.target.value);
     };
   
     const handleNumGuestsChange = (e) => {
       setNumGuests(e.target.value);
     };
   


     return (
      <div className="searchBar">
      <div className="Anywhere">Anywhere</div>
      <div className="anyWeek">Any Week</div>
      <div className="Who">Add Guests</div>
      <div><FontAwesomeIcon className="SearchIcon" style={{color : "white"}} icon={faMagnifyingGlass}/></div>
      </div>
     )
     }
   