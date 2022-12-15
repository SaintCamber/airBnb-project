import {useDispatch,useSelector} from 'react-redux'
import { populateAllSpots } from '../../store/Spots'
import {useEffect} from 'react'
import SpotListItem from '../SpotsListItem'
export default function SpotsList(){
   let dispatch=useDispatch()

    const spotsList = useSelector((state)=>Object.values(state.spots.Spots.AllSpots))
    console.log('spotsList',spotsList)
    useEffect(()=>{
        dispatch(populateAllSpots())
    },[])
    return (
        <div style={{border:"5px black solid",backgroundColor:"red",
        display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
                {spotsList.map((spot)=>
                <SpotListItem key={spot.id} spot={spot}/>
                )}
        </div>
    )
}