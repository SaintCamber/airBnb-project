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
createNewSpotReview = ()=>async dispatch=>{}
updateSpotReview = ()=>async dispatch=>{}
deleteSpotReview = ()=>async dispatch=>{}
getCurrentUsersReviews =()=>async dispatch=>{}



initialState={spot:{}}

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
        default:
            return state;
    }
};