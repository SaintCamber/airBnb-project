import {NavLink} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {thunkOneSpot} from '../../store/Spots'
import { useParams } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import { useHistory } from 'react-router-dom'
import UpdatePage from '../UpdatePage'
import './SpotsListItem.css'
export default function SpotListItem({spot}){
  const history =useHistory()
   const  handleTileClick=(e)=>{
    e.preventDefault()
    history.push(`/Spots/${spot.id}`)
   }
   return (
    
    <div onClick={handleTileClick} className="SpotTile" >
      {spot.previewImage ? <div className="imgBox"><img className="TileImage" src={spot.previewImage} alt="spot preview" ></img></div> :  <div className="imgBox" ><img className="TileImage" src='https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg' alt='preview' ></img></div>}
      <div className="infoBox" >
        <div className="displayInfo" >
          <NavLink to={`/Spots/${spot.id}` }style={{width: "50%"}}>{spot.name}</NavLink> <span style={{display: "flex", flexDirection: "row", alignItems: "flex-", width: "50%", justifyContent: "end"}}><FontAwesomeIcon icon={faStar}/>{spot.avgStarRating||"new"}</span>
        </div>
        <h5 style={{fontWeight: 400,margin:0}}>{spot.city}, {spot.state}</h5>
        <h5 style={{}}>{spot.price}$ per day</h5>
      </div>
    </div>
  );
   }