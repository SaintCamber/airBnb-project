import { useEffect,useState } from "react";
import { populateOwnedSpots } from "../../store/session.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import { NavLink, useHistory } from "react-router-dom";
import SpotsListItem from "../SpotsListItem/index.js";
import "../SpotsListItem/SpotsListItem.css"
import "./index.css"
export default function UpdatePage(){
    const dispatch=useDispatch()
    let [showMenu,setShowMenu] = useState(false)
    let ownedSpots = useSelector(state=>state.session.userOwnedSpots)
    let allSpots = useSelector(state=>state.spots.AllSpots)
    let [ownedState,setOwnedState] = useState(ownedSpots)
    const closeMenu = () => setShowMenu(false);
    let history = useHistory()
   useEffect(()=>{
       dispatch( populateOwnedSpots())
  
   },[dispatch,allSpots])

   
   return (
    <>
<h1>Manage Spots</h1>
<div className='holdingDiv'>
{
   Object.values( ownedSpots).map(spot=>(
   <div  className="SpotTile" style={{marginBottom :"30px"}} onClick={()=>{
  history.push(`/spots/${spot.id}`)
  }}  >
      {spot.previewImage ? <div className="imgBox"><img className="TileImage" src={spot.previewImage} alt="spot preview" ></img></div> :  <div className="imgBox" ><img className="TileImage" src='https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg' alt='preview' ></img></div>}
      <div className="infoBox" >
        <div className="displayInfo" >
          <NavLink to={`/Spots/${spot.id}` }style={{width: "50%"}}>{spot.name}</NavLink> <span style={{display: "flex", flexDirection: "row", alignItems: "flex-", width: "50%", justifyContent: "end"}}><FontAwesomeIcon icon={faStar}/>{spot.avgStarRating||"new"}</span>
        </div>
        <h5 style={{fontWeight: 400,margin:0}}>{spot.city}, {spot.state}</h5>
   <div className="modals" onClick={(e)=>{e.stopPropagation() }}>
   <OpenModalMenuItem
    onClick={(e)=>{e.stopPropagation() }}
    

className="modalButton"
    itemText={"Update"}
              onItemClick={closeMenu}
              modalComponent={<UpdateSpotModal spot={spot} oldState={ownedState} setter={setOwnedState}/>}

    />
    <OpenModalMenuItem
    className="modalButton"
    onClick={(e)=>{e.stopPropagation() }}
    itemText="Delete"
    onItemClick={closeMenu}
    modalComponent={<DeleteSpotModal spot={spot} oldState={ownedState} setter={setOwnedState}/>}/>
   
    </div>
        <h5 style={{}}>{spot.price}$ per day</h5>
      </div>
    </div>

   ))

}

</div>
</>)
}