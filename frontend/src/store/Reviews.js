import { csrfFetch } from "./csrf";

// action.types
const CREATE = "create/reviews";
const READ = "read/reviews";
const UPDATE = "update/reviews";
const DELETE = "delete/reviews";
const UserReviews = "user/reviews";

// actionCreators
const CreateReview = (payload) => {
  return { type: CREATE, payload };
};
const ReadSpotReviews = (payload) => {
  return { type: READ, payload };
};
const UpdateReview = (payload) => {
  return { type: UPDATE, payload };
};
const DeleteReview = (payload) => {
  return { type: DELETE, payload };
};
const currentUserReviews = (payload) => {
  return { type: UserReviews, payload };
};

//thunks

export const createNewSpotReview =
  (newReview) =>
  async (dispatch) => {
    let response = csrfFetch(`/api/spots/${newReview.spotId}/reviews`,
    {method:"Post",
    body: JSON.stringify({
        review:newReview.review,
        stars: newReview.stars,
        userId:newReview.userId,
        spotId:newReview.spotId
    })})
   await dispatch(CreateReview(newReview))
  };

export const getSpotReviews = (spotId) => async (dispatch) => {
  let response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    let data = await response.json();
    dispatch(ReadSpotReviews(data));
    console.log("READ REVIEWS",data)
    return data;
  }
};
export const updateSpotReview = (review) => async (dispatch) => {
  let {spotId,userId,id,newReview,stars} = review
  console.log("inside update review",review)
    const response = await csrfFetch(`/api/reviews/${parseInt(id)}`,{
        method:"PUT",
        body: JSON.stringify({
            review:newReview,
            stars
        })
    })
    if(response.ok){
        let data = await response.json()
        dispatch(UpdateReview(data))
    }

};



const UPDATE_REVIEW = 'reviews/update';

export const updateReview = (review) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    const updatedReview = await res.json();

    dispatch({
      type: UPDATE_REVIEW,
      review: updatedReview,
    });

  } catch (err) {
    console.error(err);
  }
};







export const deleteSpotReview = (reviewId) => async (dispatch) => {
    let response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:"DELETE"
    })
    if(response.ok){
        let data = response.json()
        dispatch(DeleteReview(reviewId))
    }
};
export const getCurrentUsersReviews = () => async (dispatch) => {
  let response = await csrfFetch("/api/reviews/current");
  if (response.ok) {
    let data = await response.json();
    dispatch(currentUserReviews(data));
  }
};

const initialState = { spotReviews: {}, userReviews: {} };

 const ReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      let stateCREATE = {
        ...state,
        userReviews: { [action.payload.id]: { ...action.payload } },
      };
      return stateCREATE;
    case READ:
      let stateREAD = { ...state};
      stateREAD.spotReviews ={}
      action.payload.Reviews.map(review=>stateREAD.spotReviews[review.id]=review)
      return stateREAD;
    case UPDATE_REVIEW:
        let stateUPDATE={...state}
        // console.log("action/.payload",action.payload)
        delete stateUPDATE.spotReviews[action.review.id]
        delete stateUPDATE.userReviews[action.review.id]
        stateUPDATE.spotReviews[action.review.id]={...action.review}
        stateUPDATE.userReviews[action.review.id]={...action.review}
        stateUPDATE.userReviews[action.review.id].review=stateUPDATE.spotReviews[action.review.id].review
        // console.log("-----------------",stateUPDATE.userReviews)
        // console.log("-----------------",stateUPDATE.spotReviews)
        
      return JSON.parse(JSON.stringify(stateUPDATE))




    case DELETE:
        let stateDELETE = {...state}
        console.log("inside Delete",state.spotReviews)
        stateDELETE.spotReviews = {...Object.values(stateDELETE.spotReviews).filter(review=>review.id!==action.payload)}
        stateDELETE.userReviews ={...Object.values(stateDELETE.userReviews).filter(review=>review.id!==action.payload)}

      return stateDELETE;
    case UserReviews:
      let stateReviews = { ...state};
      action.payload.Reviews.forEach(review=>stateReviews.userReviews[review.id]=review)
      // console.log("stateReviews",stateReviews)
      // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",action.payload.Reviews)
      return stateReviews;

    default:
      return state;
  }
};
export default ReviewsReducer