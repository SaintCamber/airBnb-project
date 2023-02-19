import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReveiwModal";
import UpdateReviewModal from "./UpdateReviewModal";
import ReviewTile from "./reviewTile";
import "../cssStuffs/modals.css";
import "./index.css";

const ManageReviews = ({Reviews,currentUser}) => {
  let {closeModal} =useModal()
  let [showMenu, setShowMenu] = useState(false);
  let dispatch = useDispatch();
  const closeMenu = () => setShowMenu(false);


  return (
    <div className="manageReviewsContainer">
      {Reviews.map(review=>{
        <ReviewTile key={review.id} review={review}/>
      })}
    </div>
  )

}
