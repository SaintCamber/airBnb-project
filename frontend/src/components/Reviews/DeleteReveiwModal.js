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
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}>
          <h2>Are you certain you'd like to delete this review?</h2>
          <button type="submit" className="formButton">
            yes
          </button>
          <button className="formButton" onClick={closeModal}>
            cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default DeleteReviewModal;
