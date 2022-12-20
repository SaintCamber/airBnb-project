import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotModal from "../CreateSpotModal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars,faUserCircle} from '@fortawesome/free-solid-svg-icons'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button onClick={openMenu} className='barsUsersButton'>
      <FontAwesomeIcon icon={faBars}/>
      <FontAwesomeIcon icon={faUserCircle}/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <menu>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <OpenModalMenuItem
              itemText="Create Spot"
              onItemClick={closeMenu}
              modalComponent={<CreateSpotModal />}
            />
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </menu>
        ) : (
          <menu>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            
          </menu>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;