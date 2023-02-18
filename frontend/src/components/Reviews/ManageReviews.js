import {useState,useEffect} from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { getCurrentUsersReviews } from "../../store/Reviews"
import { Suspense ,lazy} from "react";
// import ReviewTile from './reviewTile';

import React from 'react'
const ReviewTile = lazy(()=>import(`./reviewTile.js`))
export const ManageReviews = () => {
  const TheReviews =useSelector(state=>{
    let start = state.Reviews.userReviews
    let next = Object.values(start)
    return next
  })


  return (
    <>
    <h1>
    ManageReviews</h1>

    <Suspense>
    <div className="ManageReviewsContainer">
      {TheReviews.map((review=><ReviewTile key={review.id} review={review} />

      

      ))}
    </div>
    </Suspense>
    </>
  )
}



export default ManageReviews
  
