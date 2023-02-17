import React, {useState} from 'react'
import { useDispatch} from 'react-redux'
import { useModal } from '../../context/Modal'
import { updateSpotReview } from '../../store/Reviews'

const UpdateReviewModal = ({review,ReRenderSingleSpot,setReRenderSingleSpot})=>{
    const dispatch =useDispatch()
    let [newReview,setNewReview] = useState(review.review)
    let [stars,setStars] = useState(review.stars)
    const {closeModal} = useModal()
async function handleSubmit(e){
    e.preventDefault(e)
    let actionReview = {...review,review:newReview,stars:stars}
    console.log("the action Review is:",actionReview)
    await dispatch(updateSpotReview(actionReview)).then(()=>{
        setStars(3)
        setNewReview('')
    }).then(closeModal).then(setReRenderSingleSpot({}))}



    return (
        <div className="modal">
            <form className="Form" onSubmit={handleSubmit}>
            <h3 style={{display:"flex",justifyContent:"center",margin:"0px"}}>enter your review</h3>
            <label style={{height:"6em"}}>
                <textArea
                value={newReview}
                placeholder={`${newReview}`}
                onChange={(e)=>setNewReview(e.target.value)}
                    className="formInput"
                ></textArea>
            </label>
           
  <strong>Rating</strong>
  <input
    className="rating rating--nojs"
    max="5"
    step="0.5"
    type="range"
    value={stars} 
      onChange={(e)=>{setStars(parseInt(e.target.value))}} />

            <button type="submit" className='FormButton'>Update Review</button>

            </form>
        </div>
    )
}


export default UpdateReviewModal