import { csrfFetch } from "./csrf"


const CREATE_SPOT = 'create-spot'
const UPDATE_SPOT = 'update-spot'
const READ_SPOT = 'read-spot'
const DELETE_SPOT = 'remove-spot'
const READ_All_SPOTS ='read-all-spots'
const SINGLE = 'single-spot'

const initialState = { "Spots":{"AllSpots":{},"SingleSpot":{}} };
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
export function getOneSpot(spot){
    return {type:SINGLE,
        spot}}
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

export const fetchOneSpot=(spotId)=>async(dispatch)=>{
    let response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok){
    let data = await response.json()
    console.log('the data of single',data)
        dispatch(getOneSpot(data))
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
        price,
        description

      } = Spot

      let  response = await csrfFetch('/api/spots', {
        method: 'POST',
        body:JSON.stringify( {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            description
        })})
        if(response.ok){
            const Data = await response.json()
            dispatch(addSpot(Data))
            return Data
        }
        
        
        
        
    };
    


export default function SpotsReducer(state=initialState,action){
    let newState;
    console.log("inside reducer")
    switch(action.type){
         

        case 'create-spot':
            newState = {...state}
            let Spot = action.spot
            let Spots = {...state.spots.AllSpots,Spot}
            newState.Spots.AllSpots = Spots
            return newState

        case 'update-spot':
        case 'read-all-spots':
            let allSpots = {}
            action.Spots.forEach(spot=>allSpots[spot.id]=spot)
            console.log('allSpots in reducer',allSpots)
            newState={...state}

            newState.Spots.AllSpots = allSpots
        return newState
        case 'remove-spot':

        case 'single-spot':
            newState = {...state}
            let spot = action.spots.SingleSpot
            newState.Spots.SingleSpot = spot
            return newState

        default:
            return state
    }
}