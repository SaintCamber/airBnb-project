import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotReview } from "../../store/Reviews";

const DeleteReviewModal = ({
  Review,
  ReRenderSingleSpot,
  setReRenderSingleSpot}
) => {

  const { closeModal } = useModal();
  let dispatch = useDispatch();
  async function handleClick() {
    await dispatch(deleteSpotReview(Review.id))
      .then(closeModal)
      .then(setReRenderSingleSpot({}));
  }

  return (
    <>
      <div className="modal">
        <form
          className="Form"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}>
          <h2>Are you certain you'd like to delete this review?</h2>
          <button type="submit" className="FormButton">
            yes
          </button>
          <button className="FormButton cancel" onClick={closeModal}>
            cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default DeleteReviewModal;
