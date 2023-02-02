import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './dateSelector.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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