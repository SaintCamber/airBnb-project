
import {useDispatch,useSelector} from 'react-redux'
import { thunkOneSpot } from "../../store/Spots"
import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'
import {faHeart} from '@fortawesome/free-regular-svg-icons'



export default function SingleSpot(){
    console.log("inside single spot")
    let params = useParams()
    let spotId = Number(params.spotId)
    console.log("spotId",spotId)
 let dispatch = useDispatch()
    useEffect(()=>{
       dispatch(thunkOneSpot(spotId))
    },[dispatch,spotId])
 let Spot = useSelector((state)=>state.spots.SingleSpot)
 console.log("Spot",Spot)

    return (
        <div className="singleSpotPage" style={{display:"flex",flexDirection:"column"}}>
        <h1>{Spot.name}</h1>
        <div style={{display:'inline-block'}}>
            <NavLink to="/StateMap" style={{color:'black',fontFamily:"helvetica"}}>{Spot.city}</NavLink>,
            <NavLink to="/stillMapButCountry" style={{color:'black',fontFamily:"helvetica"}}>{Spot.state}</NavLink>,
            <NavLink to="/maps" style={{color:'black',fontFamily:"helvetica"}}>{Spot.country}</NavLink>
            <span style={{marginLeft:'60%'}}></span>
        
            <NavLink to="/share"><FontAwesomeIcon icon={faArrowUpFromBracket}/>Share</NavLink>              
            <NavLink to="/save" style={{paddingLeft:20}}><FontAwesomeIcon icon={faHeart}/> Save</NavLink>
        </div>
        </div>
       

    )
}


