import { csrfFetch } from "./csrf"


const CREATE_SPOT = 'create-spot'
const UPDATE_SPOT = 'update-spot'
const READ_SPOT = 'read-spot'
const DELETE_SPOT = 'remove-spot'
const READ_All_SPOTS ='read-all-spots'

const initialState = { "Spots":{"AllSpots":{}} };
export function addSpot(spot){
    return {
        type:CREATE_SPOT,
        spot
    }
}
export function AllSpots(Spots){
    return {
        type:READ_All_SPOTS,
        Spots

    }
}

//to add a spot i have to hit the /api/spots end point with a post request the body of which needs to be a pojo containing a valid spot
export const populateAllSpots=()=>async (dispatch)=>{
    console.log('inside popallspots')
    let response = await csrfFetch('/api/spots');
    console.log("response here",response)
    if(response.ok){
        let data = await response.json()
        console.log("data here",data)
    dispatch(AllSpots(data))
    return data
    }
    


}
export const createSpot= (Spot)=>async (dispatch)=>{
  let  {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price
      } = Spot

      const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price
        }),
      });

      const Data = await response.json()




    return dispatch(addSpot(Data))
}


export default function SpotsReducer(state=initialState,action){
    let newState;
    console.log("inside reducer")
    switch(action.type){
         

        case 'create-spot':
        case 'update-spot':
        case 'read-all-spots':
            let allSpots = {}
            action.Spots.forEach(spot=>allSpots[spot.id]=spot)
            console.log('allSpots in reducer',allSpots)
            newState={...state}

            newState.Spots.AllSpots = allSpots
        return newState
        case 'remove-spot':
        default:
            return state
    }
}