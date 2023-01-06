import {NavLink} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {thunkOneSpot} from '../../store/Spots'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
export default function SpotListItem({spot}){
   console.log(spot)
    
    return(
           
        <div style={{display:"flex",flexDirection:"column",justifyContent:'space-around',backgroundColor:"white",padding:10,margin:"5px",boxSizing:"borderBox",width:200,height:270,border: 'none',borderRadius:20,alignItems:"flex-start"}}>
            {spot.previewImage? <img src={spot.previewImage} alt="spot preview" style={{maxBlockSize:'60%',borderRadius:30,maxWidth:"100%",height:"100%"}}></img>:<img src='https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg' alt='preview' style={{maxBlockSize:'65%',borderRadius:30,maxWidth:"100%",height:"100%"}} ></img>}
            <div>
                <NavLink to={`/Spots/${spot.id}`}><h5>{spot.name}</h5></NavLink>
                <h5 style={{fontWeight:400}}>{spot.city}, {spot.state}</h5>
                <h5>{spot.price}$ per day</h5>
            </div>
           </div>
    )
}




