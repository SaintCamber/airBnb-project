import React, { useEffect, useRef,useState } from 'react';
import LocationMenu from './Menus/LocationMenu.js';
import DateMenu from './Menus/DateMenu.js';
import GuestsMenu from './Menus/GuestsMenu.js';
import './bigSearchBar.css';
import './Menus/LocationMenu.css';
import './Menus/DateMenu.css';


export default function BigSearchBar({menu, pickAMenu}) {
    const ulRef = useRef();
    const [location, setLocation] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numGuests, setNumGuests] = useState(1);


    const handleClicks = (e) => {
        e.stopPropagation();

        if (ulRef.current && ulRef.current.contains(e.target)) {
            return

        }
        if (ulRef.current && !ulRef.current.contains(e.target)) {
            pickAMenu(e.target.id)
        }
    }



return (

    <div onClick={handleClicks} className='bigSearchBar'>
        <div className='AnywhereBig'>{menu === "anywhere" ?<div className="SearchHeading">Where</div> : <div className="SearchHeading">Anywhere</div>}
            {(menu === "anywhere") && (<LocationMenu props={{location,setLocation}}/>)}
        </div>
        <div className='anyWeekBig'>

                <div className='DateBig'>
            {menu === "anyWeek" && (
                    <DateMenu option={'0'} />
            )}
                </div>
                <div className='DateBig'>
            {menu === "anyWeek" && (
                    <DateMenu option={'1'} />
            )}
                </div>




        </div>
        <div className='numGuestsBig'>add Guests


            {menu === "Guests" &&
                <GuestsMenu />

            }

        </div>
        <div className='searchButtonBig'></div>




    </div>

)}