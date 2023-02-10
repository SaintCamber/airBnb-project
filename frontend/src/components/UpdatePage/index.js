import { useEffect,useState } from "react";
import { populateOwnedSpots } from "../../store/session.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal";
import "./index.css"
export default function UpdatePage(){
    const dispatch=useDispatch()
    let [showMenu,setShowMenu] = useState(false)
    let ownedSpots = useSelector(state=>state.session.userOwnedSpots)
    let [ownedState,setOwnedState] = useState(ownedSpots)
    const closeMenu = () => setShowMenu(false);
   useEffect(()=>{
    dispatch(populateOwnedSpots())
   },[ownedState])
return (
<div className='holdingDiv'>
{
   Object.values( ownedState).map(spot=><div className="updateDelete">
   <div className="nameAddress">
   <div>{spot.name}</div>
   <div>{spot.address}</div>
   </div>
   <span className="spacer"></span>

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
    </div>)

}

</div>)
}