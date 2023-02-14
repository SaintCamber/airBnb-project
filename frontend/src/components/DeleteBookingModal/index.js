import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { deleteBooking } from "../../store/Spots";
import { deleteBookingThunk } from "../../store/bookings";

import { useHistory } from "react-router-dom";


const DeleteUpdateModal=({booking,oldState,UpdateOldState})=>{
    console.log("the booking is",booking)
   let {closeModal} = useModal()
   let dispatch = useDispatch()
    let history = useHistory()
    const handleClick = (e)=>{
        e.preventDefault()
         dispatch(deleteBookingThunk(booking.id))
         .then(()=>{
            let newState = {...oldState}
            delete newState[booking.id] 
            UpdateOldState({...oldState} )})

            closeModal()
         }
          
        
     

    

    return (
        <>
        <div className="modal">
        <form className="Form">
            <h2>Are you certain you'd like to cancel this booking?</h2>
            <button className="FormButton" onClick={e=>handleClick(e)}>yes</button>
            <button className="FormButton" onClick={closeModal}>no</button>
            
        </form>
        </div>
        </>
    )
}

export default DeleteUpdateModal