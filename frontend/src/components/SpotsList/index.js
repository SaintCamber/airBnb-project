import {useDispatch,useSelector} from 'react-redux'
import { populateAllSpots } from '../../store/Spots'
import {useEffect} from 'react'
import SpotListItem from '../SpotsListItem'
export default function SpotsList(){
   let dispatch=useDispatch()

   useEffect( ()=>{
       dispatch(populateAllSpots())
    },[dispatch])
    const spotsList = useSelector((state)=>Object.values(state.spots.AllSpots))
    console.log('spotsList',spotsList)
    return (
        <div style={{border:"5px black solid",backgroundColor:"red",
        display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
                {spotsList.map((spot)=>
                <SpotListItem key={spot.id} spot={spot}/>
                )}
        </div>
    )
}