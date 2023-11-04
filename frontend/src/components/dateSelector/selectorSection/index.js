// frontend/src/components/Navigation/index.js
import React ,{useState}from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faBars,faUserCircle,faGlobe,} from '@fortawesome/free-solid-svg-icons'
import { useHistory,useRef } from 'react-router-dom';
import OpenModalButton from '../../OpenModalButton/index.js'
import ProfileButton from '../../Navigation/ProfileButton.js'
import CreateSpotModal from '../../CreateSpotModal/index.js'
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem.js'
import { useModal } from "../../../context/Modal";
import Navigation from "../../Navigation/index.js"
import BigSearchBar from './bigSearchBar.js';
import '../../cssStuffs/modals.css';
import "./bigSearchBar.css";



const SearchBarModal =  ({menu,pickAMenu})=> {


  const handleSubmit = async (e) => {}

  return (
   
    <div className='SearchBarModalBig'>
    <BigSearchBar menu={menu} pickAMenu={pickAMenu}/>

    
    
    </div>
     
  );
}

export default SearchBarModal;
