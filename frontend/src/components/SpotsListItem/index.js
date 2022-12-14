export default function SpotListItem({spot}){
    return(
        <div>
            <h3>{spot.name}</h3>
            {spot.previewImage? <img src={spot.previewImage} alt="spot preview"></img>:""}
            <ul>
                <li key={spot.id}>{spot.address}</li>
            </ul>
        </div>
    )
}