import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBus} from '@fortawesome/free-solid-svg-icons/faBus'
import './index.css'

const IconBar = () => {
return(
<div style={{width:'100%',height:50,position:'sticky',top:80,marginBottom:"15px"}}>
        <div class="icon-bar" onClick={()=>alert("feature coming soon!")}>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
   <FontAwesomeIcon className="IconBarIcon" icon={faBus}/>
</div>
        </div>
)
}

export default IconBar