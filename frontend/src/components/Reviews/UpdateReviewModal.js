import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { updateSpotReview } from '../../store/Reviews'

const UpdateReviewModal = ({ Review ,setState}) => {
    const dispatch = useDispatch()
    let [newReview, setNewReview] = useState(Review.review)
    let [stars, setStars] = useState(Review.stars)
    const { closeModal } = useModal()
    function handleSubmit(e) {
        e.preventDefault(e)
        let actionReview = { ...Review, review: newReview, stars: stars }
        console.log("the action Review is:", actionReview)
        return dispatch(updateSpotReview(actionReview)).then(closeModal).then(() => {
            setStars(3)
            setNewReview(actionReview.review)
        })

    }
        return (
            <div className="modal">
                <div className="Form" >
                    <h3 style={{ display: "flex", justifyContent: "center", margin: "0px" }}>enter your review</h3>
                    <label style={{ height: "6em" }}>
                        <textarea
                            value={newReview}
                            placeholder={`${newReview}`}
                            onChange={(e) => setNewReview(e.target.value)}
                            className="formInput"
                        ></textarea>
                    </label>

                    <strong>Rating</strong>
                    <input
                        className="rating rating--nojs"
                        max="5"
                        step="0.5"
                        type="range"
                        value={stars}
                        onChange={(e) => { setStars(parseInt(e.target.value)) }} />

                    <button type="submit" className='FormButton' onClick={handleSubmit}>Update Review</button>

                </div>
            </div>
        )
    }


    export default UpdateReviewModal