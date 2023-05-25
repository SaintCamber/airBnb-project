import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './dateSelector.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// begin adding search feature to the date selecor bar
// the user will enter a location, a date, and the number of guests
// the user will then be redirected to the search results page
// the search results page will display all the listings that match the search criteria
export default function DateSelector() {


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