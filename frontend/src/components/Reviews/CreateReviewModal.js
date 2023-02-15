import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useHistory } from 'react-router-dom'
import { createNewSpotReview } from '../../store/Reviews'

const CreateReviewModal = ({spotId,userId})=>{
    const dispatch =useDispatch()
    let [review,setReview] = useState("")
    let [stars,setStars] = useState(3)
    const {closeModal} = useModal()
async function handleSubmit(){
    let newReview = {spotId,userId,stars,review}
    await dispatch(createNewSpotReview(newReview)).then(()=>{
        setStars(3)
        setReview('')
    }).then(closeModal)

}

    return (
        <div className="modal">
            <form className="Form" onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>
            <h3 style={{display:"flex",justifyContent:"center",margin:"0px"}}>enter your review</h3>
            <label style={{height:"6em"}}>
                <textArea
                value={review}
                onChange={(e)=>setReview(e.target.value)}
                    className="formInput"
                ></textArea>
            </label>
           
  <strong>Rating</strong>
  <input
    class="rating rating--nojs"
    max="5"
    step="0.5"
    type="range"
    value={stars} 
      onChange={(e)=>{setStars(parseInt(e.target.value))}} />

            <button className='FormButton'>Post Review</button>

            </form>
        </div>
    )
}


export default CreateReviewModal