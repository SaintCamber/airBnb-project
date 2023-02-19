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
  singleSpotReviews,
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
  }, [dispatch, singleSpotReviews]);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      {singleSpotReviews && Object.values(singleSpotReviews)?.length ? (
        <h2>User Reviews</h2>
      ) : (
        <h2>be the first to add a Review!</h2>
      )}
      {spot && currentUser && spot.ownerId && currentUser.id !== spot.ownerId ? (
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
      )}
      <div className="reviewContainer">
        {singleSpotReviews &&
          Object.values(singleSpotReviews)?.map((review) => {
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
                      review.createdAt.split("T")[0]}
                  </div>
  
                  <div className="TextDiv"> {review.review}</div>
                  {currentUser &&
                    review.User &&
                    currentUser.id === review.User.id ? (
                    <OpenModalMenuItem
                      className="modalButton"
                      itemText={<button>Edit Review</button>}
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
  
};

export default Reviews;