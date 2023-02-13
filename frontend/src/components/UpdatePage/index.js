import { useEffect,useState } from "react";
import { populateOwnedSpots } from "../../store/session.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import { NavLink } from "react-router-dom";
import SpotsListItem from "../SpotsListItem/index.js";
import "../SpotsListItem/SpotsListItem.css"

import "./index.css"
export default function UpdatePage(){
    const dispatch=useDispatch()
    let [showMenu,setShowMenu] = useState(false)
    let ownedSpots = useSelector(state=>state.session.userOwnedSpots)
    let [ownedState,setOwnedState] = useState(ownedSpots)
    const closeMenu = () => setShowMenu(false);
   useEffect(()=>{
       dispatch( populateOwnedSpots())
   
  
   },[dispatch])

   
   return (
<div className='holdingDiv' style={{border:"none",backgroundColor:"white",
        display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",width:'100%',gap:"60px 2px"}}>
{
   Object.values( ownedSpots).map(spot=>(
   <div>
   <div  className="SpotTile" >
      {spot.previewImage ? <div className="imgBox"><img className="TileImage" src={spot.previewImage} alt="spot preview" ></img></div> :  <div className="imgBox" ><img className="TileImage" src='https://www.mountaineers.org/activities/routes-places/sam-hill/@@images/a5d9a97f-f12e-4091-a372-ab551fde8a58.jpeg' alt='preview' ></img></div>}
      <div className="infoBox" >
        <div className="displayInfo" >
          <NavLink to={`/Spots/${spot.id}` }style={{width: "50%"}}>{spot.name}</NavLink> <span style={{display: "flex", flexDirection: "row", alignItems: "flex-", width: "50%", justifyContent: "end"}}><FontAwesomeIcon icon={faStar}/>{spot.avgStarRating||"new"}</span>
        </div>
        <h5 style={{fontWeight: 400,margin:0}}>{spot.city}, {spot.state}</h5>
   <div className="modals">
   <OpenModalMenuItem
className="modalButton"
    itemText={<button>Update</button>}
              onItemClick={closeMenu}
              modalComponent={<UpdateSpotModal spot={spot} oldState={ownedState} setter={setOwnedState}/>}

    />
    <OpenModalMenuItem
    className="modalButton"
    
    itemText={<button>Delete</button>}
    onItemClick={closeMenu}
    modalComponent={<DeleteSpotModal spot={spot} oldState={ownedState} setter={setOwnedState}/>}/>
   
    </div>
        <h5 style={{}}>{spot.price}$ per day</h5>
      </div>
    </div>

    </div>
   ))

}

</div>)

}