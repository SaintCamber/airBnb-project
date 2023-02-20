import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { useUser } from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReveiwModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { getCurrentUsersReviews } from "../../store/Reviews";
import "../cssStuffs/modals.css";
import "./index.css";

const ManageReviews = ({reviews}) => {

  let { userReviews, currentUser } = useUser();
  let [ReRenderSingleSpot, setReRenderSingleSpot] = useState({});
  // let {closeModal} =useModal()
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  let [showMenu, setShowMenu] = useState(false);
  let dispatch = useDispatch();
  const closeMenu = () => setShowMenu(false);
  useEffect(() => {
    dispatch(getCurrentUsersReviews());
  }, [dispatch, currentUser,reviews,ReRenderSingleSpot]);
  const updatedReview = useSelector(state => state.userReviews);

  useEffect(() => {
    setReRenderSingleSpot(prevState => ({ ...prevState }));
  }, [updatedReview]);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      {!Object.values(reviews)?.length ? (
        <h1>visit a spot to post a Review</h1>
      ) : (
        <h1>Manage Reviews</h1>
      )}
      <div className="reviewContainer">
        {Object.values(reviews)?.map((review) => {
          return (
            <div className="reviewTile" key={parseInt(review.id)}>
              <div className="reviewBox">
                <div className="reviewStars">
                  <FontAwesomeIcon icon={faStar} />
                  <div style={{ marginRight: "7vw" }}>{review?.stars}</div>
                  <div>
                    {review?.User?.firstName} {review?.User?.lastName}
                  </div>
                </div>
                <div>{review?.createdAt?.split("T")[0]}</div>
  
                <div className="TextDiv"> {review?.review}</div>
                {review && (
                  <OpenModalMenuItem
                    className="modalButton"
                    itemText={<button>Edit Review</button>}
                    onItemClick={closeMenu}
                    modalComponent={
                      <UpdateReviewModal
                        ReRenderSingleSpot={ReRenderSingleSpot}
                        setReRenderSingleSpot={setReRenderSingleSpot}
                        review={review}
                        spot={review?.Spot}
                      />
                    }
                  />
                )}
  
                {review && (
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
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
      }  
export default ManageReviews;
