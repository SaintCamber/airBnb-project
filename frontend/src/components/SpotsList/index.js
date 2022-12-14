import {useDispatch,useSelector} from 'react-redux'
import { populateAllSpots } from '../../store/Spots'
import {useEffect} from 'react'
import SpotListItem from '../SpotsListItem'
export default function SpotsList(){
   let dispatch=useDispatch()

    const spotsList = useSelector((state)=>Object.values(state.spots.Spots.AllSpots))
    console.log('spotsList',spotsList)
    useEffect(()=>{
        console.log('useEffect lies here')
        dispatch(populateAllSpots())
    },[dispatch])
    return (
        <div>
                {spotsList.map((spot)=>
                <SpotListItem spot={spot}/>
                )}
        </div>
    )
}