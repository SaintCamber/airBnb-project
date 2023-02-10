import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateSpotModal from "../CreateSpotModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import DeleteSpotModal from "../DeleteSpotModal";
import { useSelector } from "react-redux";
import UpdateSpotModal from "../UpdateSpotModal";
import { useHistory } from "react-router-dom";
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const spot = useSelector((state) => state.spots.SingleSpot);
  const history = useHistory();
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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };
  function handleDemo(e) {
    let demoCreds = { credential: "Demo-lition", password: "password" };
    e.preventDefault();
    dispatch(sessionActions.login(demoCreds));
  }
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button onClick={openMenu} className="barsUsersButton">
        <FontAwesomeIcon icon={faBars} />
        <FontAwesomeIcon icon={faUserCircle} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <menu>
           <div className={"userInfo"}>
              
           <div>Hello,{user.firstName} {user.lastName}!</div>
            <div>{user.email}</div>

           </div> 
            <div
              className="bookingsList"
              onClick={() => {
                history.push("/currentBookings");
              }}>
              bookings
            </div>
            <div
              className="ownedSpots"
              onClick={() => {
                history.push("/user/spots");
              }}>
              Your Spots
            </div>

            <div className="logoutButton" onClick={logout}>
              logout
            </div>
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
            <div className="bookingsList" onClick={handleDemo}>
              Demo User
            </div>
          </menu>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
