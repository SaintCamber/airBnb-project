function reviewTile({review}){





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
          <OpenModalMenuItem
            className="modalButton"
            itemText={<button>Edit Review</button>}
            onItemClick={closeMenu}
            modalComponent={
              <UpdateReviewModal
          Review={review}
              />
            }
          />
        
          <OpenModalMenuItem
            className="modalButton"
            itemText={<button>Delete</button>}
            onItemClick={closeMenu}
            modalComponent={
              <DeleteReviewModal
          Review={review}
              />
            }
          />
        
      </div>
    </div>
  )
        }