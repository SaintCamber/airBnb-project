import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useHistory } from 'react-router-dom'
import { deleteSpotReview } from '../../store/Reviews'


const DeleteReviewModal=(ReviewId,rerender,setRerender)=>{
    console.log(ReviewId)
const {closeModal} = useModal()
let dispatch = useDispatch()
function handleClick(e){
    e.preventDefault()
   return dispatch(deleteSpotReview(ReviewId.ReviewId)).then(closeModal).then(()=>{
    setRerender(!rerender)
   
   
}
   )}
    return (
        <>
        <div className="modal">
           <form className="form">
            <h2>Are you certain you'd like to delete this review?</h2>
            <button className="formButton" onClick={handleClick}>yes</button>
            <button className="formButton" onClick={closeModal}>cancel</button>

           </form>
        </div>
        </>
    )
}

export default DeleteReviewModal