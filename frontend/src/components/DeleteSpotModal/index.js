import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { deleteSpotThunk } from "../../store/Spots";
import { useHistory } from "react-router-dom";


const DeleteSpotModal=()=>{
    let user = useSelector(state=>state.session.user)
    let Spot = useSelector(state=>state.spots.SingleSpot)
    let id = user.id
    let owner = Spot.ownerId
    const history = useHistory();
  const dispatch = useDispatch();
  let [state,setState] = useState()
  const { closeModal } = useModal();

    const handleClick = (e)=>{
        e.preventDefault()
        return dispatch(deleteSpotThunk(Spot.id)).then(closeModal).then(history.push('/'))
    }

    

    return (
        <>
        <div>
            <h2>Are you certain you'd like to delete this spot?</h2>
            <button onClick={handleClick}>yes</button>
            <button onClick={closeModal}>cancel</button>
        </div>
        </>
    )
}

export default DeleteSpotModal