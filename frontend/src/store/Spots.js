import { csrfFetch } from "./csrf";

const CREATE_SPOT = "create-spot";
const UPDATE_SPOT = "update-spot";
const READ_SPOT = "read-spot";
const DELETE_SPOT = "remove-spot";
const READ_All_SPOTS = "read-all-spots";
const SINGLE = "single-spot";


const initialState = { AllSpots: {}, SingleSpot: {} };
export function Update(spot){
  return {type:UPDATE_SPOT,spot}
}
export function addSpot(spot) {
  return {
    type: CREATE_SPOT,
    spot,
  };
}
export function AllSpots(Spots) {
  return {
    type: READ_All_SPOTS,
    Spots,
  };
}
//getOneSpot action creator
//
export function getOneSpot(spot) {
  console.log("inside getOneSpot action creator")
  console.log("spot",spot)
  return { type: SINGLE, payload: spot };
}
const deleteSpot =(spotId)=>{
  return {type: DELETE_SPOT,spotId}
}
//the getOneSpot action creator is called in the thunkOneSpot thunk action creator
//the thunkOneSpot thunk action creator is called in the SingleSpot component
//the SingleSpot component is rendered in the App component
//the App component is rendered in the index.js file

// getOneSpot should return an object with a type of SINGLE and a payload of the spot to be added to the store
// the payload should be a pojo containing a single spot
// the spot should be the data from the response of the get request to /api/spots/:spotId
// thunkOneSpot should return a thunk action creator that takes in a spotId as an argument and returns a function that takes in dispatch as an argument
// the thunk action creator should hit the /api/spots/:spotId with a get request
// if the response is ok
// get the data from the response
// dispatch the getOneSpot action creator with the data
//to add a spot i have to hit the /api/spots end point with a post request the body of which needs to be a pojo containing a valid spot
export const populateAllSpots = () => async (dispatch) => {
  console.log("inside popallspots");
  let response = await csrfFetch("/api/spots");
  console.log("response here", response);
  if (response.ok) {
    let data = await response.json();
    console.log("data here", data);
    dispatch(AllSpots(data));
    return data;
  }
};
// get the spot id of a single spot from the url params
// dispatch the getOneSpot action creator
// hit the /api/spots/:spotId with a get request
// if the response is ok
// get the data from the response
// dispatch the getOneSpot action creator with the data
// return the data

export const thunkOneSpot = (spotId) => async (dispatch) => {
  console.log("inside thunkOneSpot");
  let response = await csrfFetch(`/api/spots/${spotId}`);
  console.log("response", response);
  let data = await response.json();
  if (response.ok) {
    console.log("single spot data", data);
    dispatch(getOneSpot(data));
    return data;
  }
};

export const createSpot = (Spot) => async (dispatch) => {
  let { address, city, state, country, lat, lng, name, price, description } =
    Spot;

  let response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      price,
      description,
    }),
  });
  if (response.ok) {
    const Data = await response.json();
    dispatch(addSpot(Data));
    return Data;
  }
};
export const deleteSpotThunk=(spotId)=>async(dispatch)=>{
  let response = await csrfFetch(`/api/spots/${spotId}`,{
    method:"DELETE"
  })
  if(response.ok){
    dispatch(deleteSpot())
    
  }
}
export const UpdateSpot=(spot)=>async(dispatch)=>{
  let { address, city, state, country, lat, lng, name, price, description } =
    spot;
    let oldSpotData={...spot}
    console.log("SPSOT ID",spot.id)
  let response = await csrfFetch(`/api/spots/${spot.id}`,{method:"PUT",body:JSON.stringify({ address, city, state, country, lat, lng, name, price, description})})
  if (response.ok){
    console.log('UPDATE RESPONSE OK')
    let data = await response.json()
    let keys = Object.keys(data)
    let vals = Object.values(data)
    for(let i = 0;i<keys.length;i++){
      oldSpotData[keys[i]]=vals[i]
    }
    console.log(oldSpotData)
    dispatch(Update(oldSpotData))
  }

}


export default function  SpotsReducer(state = initialState, action) {
  let newState;
  console.log("inside reducer");
  console.log("action", action);
  switch (action.type) {
    case "create-spot":
      newState = { ...state };
      let Spot =  action.spot;
      let Spots = { ...state.spots.AllSpots, Spot };
      delete newState.AllSpots
      newState.AllSpots = {};
      newState["AllSpots"] = { ...Spots };

      return newState;
    case UPDATE_SPOT:
      console.log("update action",action)
      let SpotsList = {...state.AllSpots}
      delete SpotsList[action.spot.id]
      SpotsList[action.spot.id]=action.spot
      let newStateOfAllSpots = {...state}
      newStateOfAllSpots.AllSpots = {...SpotsList}
      newStateOfAllSpots.SingleSpot = action.spot
      return newStateOfAllSpots
    case "read-all-spots":
      let allSpots = {};
      console.log("action.spots", action.Spots);
      action.Spots.forEach((spot) => (allSpots[spot.id] = { ...spot }));
      newState = { ...state };
      newState.AllSpots = { ...allSpots };
      return newState;

    case "single-spot":
      let singleSpot = {};
      singleSpot = { ...action.payload };
      newState = { ...state };
      delete newState.SingleSpot
      newState["SingleSpot"] = {...singleSpot} ;
      return newState;
    
    case "remove-spot":
      newState = {...state}
     delete newState.AllSpots[action.spotId]
      return newState
      
    default:
      return state;
  }
}
