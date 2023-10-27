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
  SingleSpotReviews,
}) => {
  const { closeMenu } = useModal();
  const currentUser = useSelector((state) => state.session.user);
  const userReviews = useSelector((state) => state.Reviews.userReviews);
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [rerender, setRerender] = useState({});
  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, userReviews]);
  useEffect(() => {
    dispatch(getCurrentUsersReviews());
  }, [dispatch, SingleSpotReviews]);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
         <p><FontAwesomeIcon icon={faStar}/>{ spot?.numReviews>0 ? (isNaN(spot.avgStarRating) ? "new":Number(spot?.avgStarRating).toFixed(2)):""}{spot.numReviews ? <span style={{marginLeft:"5px",marginRight:"5px"}}>&#183;</span> : ""}{spot.numReviews > 1 ?`${spot.numReviews} Reviews`:(spot.numReviews>0? `${spot.numReviews} Review`:"new")}</p>

      {SingleSpotReviews && Object.values(SingleSpotReviews)?.length ? (
        <h2>User Reviews</h2>
      ) : (
        (currentUser.id!==spot.ownerId?<h2>be the first to add a Review!</h2>:<h2>user Reviews </h2>)
      )}
      
      {(currentUser && spot)&&(currentUser.id!==spot.ownerId)&&(!Object.values(SingleSpotReviews).find(review=>review.userId===currentUser.id)) ? (
        <OpenModalMenuItem
          className="modalButton"
          itemText={<button className="FormButton">Add A Review</button>}
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
      )}
      <div className="reviewContainer">
        {SingleSpotReviews &&
          Object.values(SingleSpotReviews).map((review) => {
            return (
              <div key={review.id} className="reviewTile">
                <div className="reviewBox">
                  <div className="reviewStars">
                    <FontAwesomeIcon icon={faStar} />
                    <div style={{ marginRight: "7vw" }}>{review.stars}</div>
                    <div>
                      {review.User && review.User.firstName}{" "}
                      {review.User && review.User.lastName}
                    </div>
                  </div>
                  <div>
                    {review.createdAt &&
                      (new Date(review.createdAt).toLocaleString('default', { month: 'long' }))} { (new Date(review.createdAt).toLocaleString('default', { year: 'numeric' })) }
                  </div>
  
                  <div className="TextDiv"> {review.review}</div>
                  <div style={{display:"flex",flexDirection:'row',justifyContent:"space-around"}}>{currentUser &&
                    review.User &&
                    currentUser.id === review.User.id ? (
                    <OpenModalMenuItem
                      className="modalButton"
                      itemText={<button className="modalButton">Edit Review</button>}
                      onItemClick={closeMenu}
                      modalComponent={
                        <UpdateReviewModal
                          ReRenderSingleSpot={ReRenderSingleSpot}
                          setReRenderSingleSpot={setReRenderSingleSpot}
                          review={review}
                          spot={spot}
                        />
                      }
                    />
                  ) : (
                    ""
                  )}
                  {currentUser &&
                    review.User &&
                    currentUser.id === review.User.id ? (
                    <OpenModalMenuItem
                      className="modalButton"
                      itemText={<button className="modalButton">Delete</button>}
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
                  )}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
  
};

export default Reviews;