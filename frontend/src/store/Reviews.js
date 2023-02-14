import { csrfFetch } from "./csrf"

// action.types
const CREATE="create/reviews"
const READ="read/reviews"
const UPDATE="update/reviews"
const DELETE="delete/reviews"
const UserReviews='user/reviews'


// actionCreators
  const CreateReview =(payload)=>{return {type:CREATE,payload}}
  const   ReadReview =(payload)=>{return {type:READ,payload}}
  const UpdateReview =(payload)=>{return {type:UPDATE,payload}}
  const DeleteReview =(payload)=>{return {type:DELETE,payload}}
  const currentUserReviews = (payload)=>{return {type:UserReviews,payload}}

//thunks
readSpotReviews = ()=>async dispatch=>{

}
createNewSpotReview = ({spotId,review})=>async dispatch=>{}
updateSpotReview = (reviewId)=>async dispatch=>{}
deleteSpotReview = (reviewId)=>async dispatch=>{}
getCurrentUsersReviews =()=>async dispatch=>{
    let response =await csrfFetch("/api/reviews/current")
    if(response.ok){
        let data = await response.json()
        dispatch(currentUserReviews(data))
    }
}



initialState={spotReviews:{},userReviews:{}}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE:
            return stateCREATE
        case READ: 
        return stateREAD
        case UPDATE: 
        return stateUPDATE
        case DELETE: 
            return stateDELETE
        case UserReviews:
            return stateReviews    
        default:
            return state;
    }
};