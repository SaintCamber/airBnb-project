import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useDispatch } from "react-redux";
import UpdateReviewModal from './UpdateReviewModal';
import DeleteReviewModal from './DeleteReveiwModal';
function ReviewTile({review}){
    let [showMenu,setShowMenu]=useState(false)
let closeMenu = ()=>setShowMenu(false)
return (
    <div className="ReviewTile">
    <div className="ReviewMetaData"><FontAwesomeIcon className={'StarBox'} icon={faStar}/>{review.stars}<span style={{marginLeft:"7vw"}}></span>{review.User.firstName}<>&nbsp;</>{review.User.lastName}<br/>how was your stay at {review.Spot.name}?</div>
    <div className="ReviewDate">{review.createdAt.split("T")[0]}</div>
      <div className="ReviewText">{review.review}</div>
      <div className="modals"><OpenModalMenuItem
                    className="modalButton"
                    itemText={<button className="ManageButton">Edit Review</button>}
                    onItemClick={closeMenu}
                    modalComponent={
                      <UpdateReviewModal
                      Review={review}
                      
                  
                      />
                    }
                  />
                
                  <OpenModalMenuItem
                    className="modalButton"
                    itemText={<button className="ManageButton">Delete</button>}
                    onItemClick={closeMenu}
                    modalComponent={
                      <DeleteReviewModal
                        Review={review}
                        

                      />
                    }
                  /></div>
      </div>
   
  )}



  export default ReviewTile