import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { deleteSpotThunk } from "../../store/Spots";
import { useHistory } from "react-router-dom";
import '../cssStuffs/modals.css'

const DeleteSpotModal=({spot,oldState,setter})=>{
    let user = useSelector(state=>state.session.user)
    
    let id = user.id
    let owner = spot.ownerId
    const history = useHistory();
  const dispatch = useDispatch();
  let [state,setState] = useState()
  const { closeModal } = useModal();

    const handleClick = (e)=>{
        e.preventDefault()
         dispatch(deleteSpotThunk(spot.id))
         closeModal()
            let newState = {...oldState}
            delete newState[spot.id]
            setter(newState)
        }
     

    

    return (
        <>
        <div className="modal">
            <form className='Form'>
            <h2>Are you certain you'd like to delete this spot?</h2>
            <h5>{spot.name}: {spot.address}</h5>
            <button className="FormButton" onClick={handleClick}>yes</button>
            <button className="FormButton" onClick={closeModal}>cancel</button>

            </form>
        </div>
        </>
    )
}

export default DeleteSpotModal