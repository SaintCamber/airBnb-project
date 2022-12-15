import {NavLink} from 'react-router-dom'
export default function SpotListItem({spot}){
    
    return(
        <div style={{display:"flex",flexDirection:"column",backgroundColor:"white",padding:20,boxSizing:"fitContent",width:"25%",border: '1px solid rgba(0, 0, 0, 0.05)'}}>
            <NavLink to={`/Spots/${spot.id}`} >{spot.name}</NavLink>
            {spot.previewImage? <img src={spot.previewImage} alt="spot preview" style={{width:200}}></img>:""}
            <ul>
                <li key={spot.id}>{spot.address}</li>
                <li key={spot.id+'a'}>Cost per Day: {spot.price}$</li>
            </ul>
        </div>
    )
}