// frontend/src/components/Navigation/index.js
import React ,{useState}from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateSpotModal from '../CreateSpotModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faBars,faUserCircle,faGlobe,} from '@fortawesome/free-solid-svg-icons'
import{faAirbnb} from '@fortawesome/free-brands-svg-icons'
import DateSelector from '../dateSelector';
import './Navigation.css';

function Navigation({ isLoaded }){
  const {showMenu,setShowMenu} = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  const closeMenu = () => setShowMenu(false);
  return (
    <div className='navbar'>
    <div style={{display:"flex",flexDirection:'row',justifyContent:"center",alignContent:'center'}}>
    <div style={{display:"flex",flexDirection:'row',justifyContent:"center",alignContent:'center',textAlign:"center",paddingTop:8}}>
     <NavLink to='/rentals' id='rentHome'  style={{marginRight:25}}>Airbnb your home</NavLink>
     <NavLink to="/locations" id='globe' style={{marginRight:25}}><FontAwesomeIcon icon={faGlobe}/></NavLink>
    </div>
     <ProfileButton user={sessionUser} ><FontAwesomeIcon icon={faBars}/>
     <FontAwesomeIcon icon={faUserCircle}/></ProfileButton>

    </div>

     <DateSelector></DateSelector>
    <NavLink to='/' id='homeLogo'><FontAwesomeIcon icon="fa-solid fa-infinity" /> Infinibnb</NavLink>
    </div>

  );
}

export default Navigation;