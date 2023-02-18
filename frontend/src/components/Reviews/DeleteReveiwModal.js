import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotReview } from "../../store/Reviews";

const DeleteReviewModal = ({
  Review,
setState

}) => {

  const { closeModal } = useModal();
  let dispatch = useDispatch();
           
            function handleClick(){ return dispatch(deleteSpotReview(Review.id)).then(setState({})).then(closeModal)}
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
          <h4 style={{border:"1px solid rgb()(221,221,221)"}}>"{Review.review}"</h4>
          <button type="submit" className="formButton">
            yes
          </button>
          <button className="formButton cancel" onClick={closeModal}>
            cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default DeleteReviewModal;
