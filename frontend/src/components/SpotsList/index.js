import {useDispatch,useSelector} from 'react-redux'
import { populateAllSpots } from '../../store/Spots'
import {useEffect} from 'react'
import SpotListItem from '../SpotsListItem'
import IconBar from '../iconbar'

import './SpotsList.css'
export default function SpotsList(){
   let dispatch=useDispatch()
   const spotsList = useSelector((state)=>state.spots.AllSpots)

   useEffect( ()=>{
       dispatch(populateAllSpots())
    },[dispatch])
    if (!Object.values(spotsList).length) {
      return null
    }
    return (
        <>
        {/* <IconBar></IconBar> */}
        
        <div style={{border:"none",backgroundColor:"white",
        display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",width:'100%',gap:"60px 2px"}}>
                {Object.values(spotsList).reverse().map((spot)=>
                <SpotListItem key={spot.id} spot={spot}/>
                )}
        </div>

        </>
    )
}