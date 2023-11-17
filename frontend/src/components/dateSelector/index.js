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
      const pickAMenu = (e) => {
        if (curMenu === e) {
          return
        } else {
          setCurMenu(e);
          console.log(curMenu)
        }
      };


      if (ulRef.current && ulRef.current.contains(e.target)) {
        console.log("open modal")
        console.log(e.target)
        console.log(curMenu)
        pickAMenu(e.target.id)
        setIsModalOpen(true)
      }
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        console.log('close modal');
        setIsModalOpen(false);
      }
    };


    document.addEventListener('click', closeModal);

    return () => {
      document.removeEventListener('click', closeModal)
    }
  }, []);


  return (
    <>
      <div ref={ulRef} className={`SearchButton `}>

        <div className={`searchBar ${isModalOpen ? "hide" : ""}`}>
          <div id="anywhere" className="anywhere" >Anywhere</div>
          <div id="anyWeek" className="anyWeek" >Any Week</div>
          <div id="Guests" className="Who" >Add Guests</div>
          <div>
            <FontAwesomeIcon className="SearchIcon" style={{ color: 'white' }} icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>

      {isModalOpen && <SearchBarModal className={`SearchBarModal`} />}


    </>
  );
}