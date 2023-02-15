import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useHistory } from 'react-router-dom'
import { deleteSpotReview } from '../../store/Reviews'


const DeleteReviewModal=(review)=>{



    return (
        <>
        <div className="modal">
           <form className="form">
            <h2>Are you certain you'd like to delete this spot?</h2>
            <h5>{spot.name}: {spot.address}</h5>
            <button className="formButton" onClick={handleClick}>yes</button>
            <button className="formButton" onClick={closeModal}>cancel</button>

           </form>
        </div>
        </>
    )
}

export default DeleteReviewModal