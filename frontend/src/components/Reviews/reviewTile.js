import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReveiwModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { getCurrentUsersReviews } from "../../store/Reviews";
import "../cssStuffs/modals.css";
import "./index.css";

function ReviewTile({review}){
let [shoeMenu,setShowMenu]=useState(false)
const closeMenu = () => setShowMenu(false);





return (
    <div className="reviewTile">
      <div className="reviewBox">
        <div className="reviewStars">
          <FontAwesomeIcon icon={faStar} />
          <div style={{ marginRight: "7vw" }}>{review.stars}</div>
          <div>
            {review.User.firstName} {review.User.lastName}
          </div>
        </div>
        <div>{review.createdAt.split("T")[0]}</div>

        <div className="TextDiv"> {review.review}</div>
          <OpenModalMenuItem
            className="modalButton"
            itemText={<button>Edit Review</button>}
            onItemClick={closeMenu}
            modalComponent={
              <UpdateReviewModal
          Review={review}
              />
            }
          />
        
          <OpenModalMenuItem
            className="modalButton"
            itemText={<button>Delete</button>}
            onItemClick={closeMenu}
            modalComponent={
              <DeleteReviewModal
          Review={review}
              />
            }
          />
        
      </div>
    </div>
  )
        }

        export default ReviewTile