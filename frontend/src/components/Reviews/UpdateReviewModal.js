import React, {useState,useEffect} from 'react'
import { useDispatch} from 'react-redux'
import { useModal } from '../../context/Modal'
import { updateReview,updateSpotReview } from '../../store/Reviews'
import {useSelector} from 'react-redux'

const UpdateReviewModal = ({review,ReRenderSingleSpot,setReRenderSingleSpot,update})=>{
    const dispatch =useDispatch()
    let [Review,setReview] = useState(review.review)
    let [stars,setStars] = useState(review.stars)
    const {closeModal} = useModal()
    const updatedReview = useSelector(state => state.userReviews);

    useEffect(() => {
        setReRenderSingleSpot(prevState => ({ ...prevState }));
      }, [updatedReview]);
    async function handleSubmit(e) {
        e.preventDefault();
      
        const actionReview = {
          id: review.id,
          review: Review,
          stars: stars,
        };
      
        await dispatch(updateReview(actionReview));
      
        setStars(3);
        setReview('');
        closeModal();
        
      }
      
    //   async function handleSubmit(e){
    // e.preventDefault(e)
    // let actionReview = {id:review.id,review:Review,stars:stars}
    // console.log("the action Review is:",actionReview)
    // await dispatch(updateSpotReview(actionReview)).then(()=>{
    //     setStars(3)
    //     setReview('')
    // }).then(closeModal).then(setReRenderSingleSpot((prevState) => ({ ...prevState })))}

    return (
        <div className="modal">
            <form className="Form" onSubmit={handleSubmit}>
            <h3 style={{display:"flex",justifyContent:"center",margin:"0px"}}>enter your review</h3>
            <label style={{height:"6em"}}>
                <textArea
                value={Review}
                placeholder={`${Review}`}
                onChange={(e)=>setReview(e.target.value)}
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