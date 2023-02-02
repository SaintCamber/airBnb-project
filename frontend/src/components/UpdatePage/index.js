import { useEffect,useState } from "react";
import { populateOwnedSpots } from "../../store/Spots";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
export default function UpdatePage(){
    let [showMenu,setShowMenu] = useState(false)
    let ownedSpots = useSelector(state=>state.session.userOwnedSpots)
    let [ownedState,setOwnedState] = useState(ownedSpots)
    const closeMenu = () => setShowMenu(false);
   
return (
<div>
{
    Object.values(ownedState).map(spot=><div>{spot.name}<OpenModalMenuItem
    itemText="Update"
              onItemClick={closeMenu}
              modalComponent={<UpdateSpotModal spot={spot} oldState={ownedState} setter={setOwnedState}/>}

    /></div>)

}

</div>)
}