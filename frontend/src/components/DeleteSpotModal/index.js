import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { deleteSpotThunk } from "../../store/Spots";
import { useHistory } from "react-router-dom";
import '../cssStuffs/modals.css'
import {removeOwnedSpot} from '../../store/session.js'

const DeleteSpotModal=({spot,oldState,setter})=>{
    let user = useSelector(state=>state.session.user)
    
    let id = user.id
    let owner = spot.ownerId
    const history = useHistory();
  const dispatch = useDispatch();
  let [state,setState] = useState()
  const { closeModal } = useModal();

    const handleClick = async (e)=>{
        e.preventDefault()
        await dispatch(deleteSpotThunk(spot.id))
        await dispatch(removeOwnedSpot(spot.id))
         let newState = {...oldState}
         delete newState[spot.id]
         setter(newState)
         closeModal()
        }
     

    

        return (
            <>
            <div className="modal">
               <form className="Form">
                <h1>Are you certain you'd like to delete this spot?</h1>
                <h3>{spot.name}: {spot.address}</h3>
                <button className="FormButton" onClick={handleClick}>yes</button>
                <button className="FormButton cancel" onClick={closeModal}>cancel</button>
    
               </form>
            </div>
            </>
        )
}

export default DeleteSpotModal