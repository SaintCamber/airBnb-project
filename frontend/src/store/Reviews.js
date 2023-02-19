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
export const updateSpotReview = (payload) => async (dispatch) => {
    let {spotId,userId,id,review,stars} = payload
    const response = await csrfFetch(`/api/reviews/${spotId}`,{
        method:"Put",
        body: JSON.stringify({review:review,stars:stars,userId:userId,spotId:spotId})
    })
    if(response.ok){
        let data = await response.json().Reviews
        console.log("the data inside update spot review",data)
        dispatch(UpdateReview(data))
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
    console.log("the data inside current user reviews", data);
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
    case UPDATE:
      let stateUPDATE = {
        ...state,
        userReviews: {...state.userReviews},
        spotReviews:{...state.spotReviews}
      };
      delete stateUPDATE.spotReviews[action.payload.id];
      delete stateUPDATE.userReviews[action.payload.id];
      stateUPDATE.spotReviews[action.payload.id] = action.payload;
      stateUPDATE.userReviews[action.payload.id] = action.payload;
      return  (JSON.parse(JSON.stringify(stateUPDATE)));
    case DELETE:
        let stateDELETE = {...state}
        console.log("inside Delete",state.spotReviews)
        stateDELETE.spotReviews = {...Object.values(stateDELETE.spotReviews).filter(review=>review.id!==action.payload)}
        stateDELETE.userReviews ={...Object.values(stateDELETE.userReviews).filter(review=>review.id!==action.payload)}

      return stateDELETE;
    case UserReviews:
      let stateReviews = { ...state};
      action.payload.Reviews.map(review=>stateReviews.userReviews[review.id]=review)
      return stateReviews;
    default:
      return state;
  }
};
export default ReviewsReducer