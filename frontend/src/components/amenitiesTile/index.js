import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css'

const amenitiesTile = ({Icon,Amenity,Desc})=>{
    return (
        <div className={'containerDiv'}>
        <div className={'IconDiv'}>
           <FontAwesomeIcon icon={Icon} className="iconic"/>
        </div>
        <div className={'TextDiv'}>
            <h4>{`${Amenity}`}</h4>
            <p>{`${Desc}`}</p>
            </div>
            
        </div>

       
    )
}

export default amenitiesTile