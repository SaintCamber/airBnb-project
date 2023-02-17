import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReveiwModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { getCurrentUsersReviews } from "../../store/Reviews";
import "../cssStuffs/modals.css";



const ManageReviews= ()=>{
    let userReviews = useSelector(state=>state.Reviews.userReviews)
    let currentUser = useSelector(state=>state.session.user)
    let [ReRenderSingleSpot,setReRenderSingleSpot]=useState({})
    // let {closeModal} =useModal()
    let [showMenu,setShowMenu] = useState(false)
    let dispatch=useDispatch()
    const closeMenu = ()=>setShowMenu(false)
    useEffect(()=>{
        dispatch(getCurrentUsersReviews())
        
    },[dispatch,currentUser])
return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
       {!userReviews?<h1>visit a spot to post a reveiw</h1> :<h1>Manage Reviews</h1>   }   
      <div className="reviewContainer">
        {Object.values(userReviews).map((review) => {
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
                {currentUser.id === review.User.id ? (
                  <OpenModalMenuItem
                    className="modalButton"
                    itemText={<button>Edit Review</button>}
                    onItemClick={closeMenu}
                    modalComponent={
                      <UpdateReviewModal
                      ReRenderSingleSpot={ReRenderSingleSpot}
                        setReRenderSingleSpot={setReRenderSingleSpot}
                        review={review}
                        spot={review.Spot}
                      />
                    }
                  />
                ) : (
                  ""
                )}
                {currentUser.id === review.User.id ? (
                  <OpenModalMenuItem
                    className="modalButton"
                    itemText={<button>Delete</button>}
                    onItemClick={closeMenu}
                    modalComponent={
                      <DeleteReviewModal
                        ReRenderSingleSpot={ReRenderSingleSpot}
                        setReRenderSingleSpot={setReRenderSingleSpot}
                        Review={review}
                      />
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
    }

    export default ManageReviews