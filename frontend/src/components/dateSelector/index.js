import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './dateSelector.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SelectorSection from './selectorSection/index.js';
import './dateSelector.css'


// right then the front end my old nemesis lets do this or whatever
// what i want the fornt end bit for this to look like is a single search bar
// that is gonna have some sections and when one of those sections is clicked it
// opens up i'm thinking another component maybe that has the stuff for that
// section manipulation(?) and then switches between the different sections when 
// they are clicked so they can be animated for the user to be amaaaaazed by.

// making it a component that houses the different sections is useful cause here
// to add the functionality for the different sections i would have just get to
// throw in three lines and be done with it. hopefully.. 

// well section component first it is and then back here i guess.

export default function DateSelector() {
   const dispatch = useDispatch()
   const history = useHistory()
   const [location, setLocation] = useState("")
   const [startDate, setStartDate] = useState("")
   const [endDate, setEndDate] = useState("")
   const [guests, setGuests] = useState(1)
   const [showGuests, setShowGuests] = useState(false)
   const [curMenu, setCurMenu] = useState("")
   
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
     

   }


   return (
      <div className="bar" >
         <SelectorSection location={location} setLocation={setLocation} curMenu={curMenu} setCurMenu={setCurMenu} >  </SelectorSection>

         </div>
   )
   }

   //  return (

   //  <div className="bar" >
   //     <span className="dateButton">
   //       <input className="dateInput" type="text" placeholder="anywhere" value={location} onChange={(e) => setLocation(e.target.value)}/>
   //     </span>
   //     <div className="wrapper">
   //     <span className="dateButton">
   //       <input className="dateInput" type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
   //     </span>

   //     </div>
   //     <span className="dateButton">add Guests<div style={{borderRadius:"100%",backgroundColor:"#FF385C",width:"30px",height:"30px",justifyContent:"center",display:"flex",alignContent:"center",alignItems:'center',    marginLeft: "15px"}}>
   //     <FontAwesomeIcon style={{color:"white"}}icon={faMagnifyingGlass}/> 

   //     </div></span>
   //  </div>
          
    
   //  );