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
  review,
  spot,
  setReRenderSingleSpot,
  ReRenderSingleSpot,
}) => {
  const { closeMenu } = useModal();
  const singleSpotReviews = useSelector((state) => state.Reviews.spotReviews);
  const currentUser = useSelector((state) => state.session.user);
  const userReviews = useSelector((state) => state.Reviews.userReviews);
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, userReviews]);
  useEffect(() => {
    dispatch(getCurrentUsersReviews());
  }, [dispatch, singleSpotReviews]);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <h2>User Reviews</h2>
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
      )}
      <div className="reviewContainer">
        {Object.values(singleSpotReviews).map((review) => {
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
                        spot={spot}
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
};

export default Reviews;
