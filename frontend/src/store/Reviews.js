import { csrfFetch } from "./csrf"

// action.types
const CREATE="create/reviews"
const READ="read/reviews"
const UPDATE="update/reviews"
const DELETE="delete/reviews"
const UserReviews='user/reviews'


// actionCreators
  const CreateReview =(payload)=>{return {type:CREATE,payload}}
  const ReadSpotReviews =(payload)=>{return {type:READ,payload}}
  const UpdateReview =(payload)=>{return {type:UPDATE,payload}}
  const DeleteReview =(payload)=>{return {type:DELETE,payload}}
  const currentUserReviews = (payload)=>{return {type:UserReviews,payload}}

//thunks

createNewSpotReview = ({spotId,review})=>async dispatch=>{}
getSpotReviews = (spotId)=> async dispatch=>{
    let response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    id (response.ok){
        let data = await response.json()
        dispatch(ReadSpotReviews())
        return data

    }
}
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
            let stateCreate ={...state,userReviews:{[action.payload.id]:{...action.payload}}}
            return stateCREATE
        case READ: 
        let stateREAD = {...state,spotReviews:{...action.payload}}
        return stateREAD
        case UPDATE: 
        return stateUPDATE
        case DELETE: 
            return stateDELETE
        case UserReviews:
            let stateReviews= {...state,userReviews:{...action.payload}}
            return stateReviews    
        default:
            return state;
    }
};