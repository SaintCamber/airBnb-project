import {NavLink} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {thunkOneSpot} from '../../store/Spots'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
export default function SpotListItem({spot}){
   console.log(spot)
    
   return (

    <div style={{display: "flex", flexDirection: "column", backgroundColor: "white", boxSizing: "borderBox", width: "24%", height: "auto",minHeight:"380px", borderRadius: 20, alignItems: "center", margin: "0 2px"}}>
      {spot.previewImage ? <div style={{width:"100%",height:"60%",borderRadius:30,minHeight:"50%"}}><img src={spot.previewImage} alt="spot preview" style={{width: "100%", borderRadius: 30, objectFit: "cover", height:"100%",}}></img></div> :  <div style={{width:"100%",height:"60%",borderRadius:30}}><img src='https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg' alt='preview' style={{width: "100%",height:"100%", borderRadius: 30, objectFit: "cover"}} ></img></div>}
      <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "left"}}>
        <div style={{display: "flex", flexDirection: "row",justifyContent:"space-evenly"}}>
          <NavLink to={`/Spots/${spot.id}` }style={{width: "50%"}}>{spot.name}</NavLink> <span style={{display: "flex", flexDirection: "row", alignItems: "flex-end", width: "50%", justifyContent: "end"}}><FontAwesomeIcon icon={faStar}/>{spot.avgStarRating|0}</span>
        </div>
        <h5 style={{fontWeight: 400,margin:0}}>{spot.city}, {spot.state}</h5>
        <h5 style={{}}>{spot.price}$ per day</h5>
      </div>
    </div>
  );
   }