import {NavLink} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {thunkOneSpot} from '../../store/Spots'
import { useParams } from 'react-router-dom'
export default function SpotListItem({spot}){
   
    
    return(
        <div style={{display:"flex",flexDirection:"column",justifyContent:'space-around',backgroundColor:"white",padding:10,margin:20,boxSizing:"fitContent",width:309,height:270,border: '1px solid rgba(0, 0, 0, 0.05)',borderRadius:20,alignItems:"center"}}>
            {spot.previewImage? <img src={spot.previewImage} alt="spot preview" style={{width:'92%'}}></img>:""}
            <NavLink to={`/Spots/${spot.id}`} >{spot.name}</NavLink>
            <ul>
                <li key={spot.id}>{spot.address}</li>
                <li key={spot.id+'a'}>Cost per Day: {spot.price}$</li>
            </ul>
        </div>
    )
}




