
import { useParams } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { fetchOneSpot } from "../../store/Spots"
import { useEffect } from "react"
export default function SingleSpot(){
    console.log("inside single spot")
 let {spotId} = useParams()
 let dispatch = useDispatch()
 useEffect(()=>{
     console.log('I AM THE SPOT ID',spotId)
    dispatch(fetchOneSpot(spotId))
 },[])
 let {Spot} =useSelector(state=>state.spots.SingleSpot) 
 console.log(Spot)
    return (
        <div>
            <h1>{Spot.name}</h1>
        </div>
    )
}