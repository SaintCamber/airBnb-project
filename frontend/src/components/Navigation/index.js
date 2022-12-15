// frontend/src/components/Navigation/index.js
import React ,{useState}from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateSpotModal from '../CreateSpotModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const {showMenu,setShowMenu} = useState(false)
  const sessionUser = useSelector(state => state.session.user);
  const closeMenu = () => setShowMenu(false);
  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      <li>
        <NavLink to='/Spots'>Spots</NavLink>
      </li>
      
    </ul>
  );
}

export default Navigation;