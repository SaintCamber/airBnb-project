import React, { useState, useEffect, useRef } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './dateSelector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBarModal from './selectorSection/index.js';

export default function DateSelector() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [curMenu, setCurMenu] = useState('');
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ulRef = useRef();
  

  const handleSearch = async (e) => {
    e.preventDefault();
    // ... rest of the code
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleNumGuestsChange = (e) => {
    setNumGuests(e.target.value);
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (ulRef.current && ulRef.current.contains(e.target)){
        console.log("open modal")
        console.log(e.target)
        console.log(curMenu)
        setIsModalOpen(true)
      }
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        console.log('close modal');
        setIsModalOpen(false);
      }
    };

    
    document.addEventListener('click', closeModal);
    document.addEventListener('click', pickAMenu);

    return () => {document.removeEventListener('click', closeModal)
    document.removeEventListener('click', pickAMenu)}
  }, []);

const pickAMenu = (e) => {
      if (curMenu === e.target.id) {
        return
      } else {
        setCurMenu(e.target.id);
        console.log(curMenu)
      }
    };
  return (
    <>
    <div ref={ulRef} className={`SearchButton `}>
      
      <div className={`searchBar ${isModalOpen ? "hide" : ""}`}>
        <div id="anywhere" className="anywhere" onClick={pickAMenu}>Anywhere</div>
        <div id="anyWeek" className="anyWeek" onClick={pickAMenu}>Any Week</div>
        <div id="Guests" className="Who" onClick={pickAMenu}>Add Guests</div>
        <div>
          <FontAwesomeIcon className="SearchIcon" style={{ color: 'white' }} icon={faMagnifyingGlass} />
        </div>
      </div>
    </div>

      {isModalOpen && <SearchBarModal className={`SearchBarModal`} menu={curMenu} pickAMenu={setCurMenu}/>}


    </>
  );
}