import { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CreateReviewModal from "./CreateReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReveiwModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { getSpotReviews, getCurrentUsersReviews } from "../../store/Reviews";
import { useModal } from "../../context/Modal";
import "./index.css";
const Reviews = ({
  spot,
  setReRenderSingleSpot,
  ReRenderSingleSpot,
}) => {
  const { closeMenu } = useModal();
  const singleSpotReviews = useSelector((state) =>{ 
    let theReviews = Object.values(state.Reviews.spotReviews)
    return theReviews});
  const [reviews,setReviews]=useState(singleSpotReviews)
  const currentUser = useSelector((state) => state.session.user);
  const userReviews = useSelector((state) => state.Reviews.userReviews);
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [rerender, setRerender] = useState(false);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      {Object.values(singleSpotReviews).length ? <h2>User Reviews</h2>:<h2>be the first to add a Review!</h2>}
      {currentUser.id !== spot.ownerId &&
      !Object.values(singleSpotReviews).find(
        (review) => currentUser.id === review.User.id
      ) ? (
        <OpenModalMenuItem
          className="modalButton"
          itemText={<button>Add A Review</button>}
          onItemClick={closeMenu}
          modalComponent={
            <CreateReviewModal
              spotId={spotId}
              userId={currentUser.id}
              ReRenderSingleSpot={ReRenderSingleSpot}
              setReRenderSingleSpot={setReRenderSingleSpot}
            />
          }
        />
      ) : (
        ""
      ) }
    </div> )   }
      
     
export default Reviews;