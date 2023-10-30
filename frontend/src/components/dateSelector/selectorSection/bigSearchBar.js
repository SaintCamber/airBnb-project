import React, { useEffect, useRef } from 'react';
import LocationMenu from './Menus/LocationMenu.js';
import DateMenu from './Menus/DateMenu.js';
import GuestsMenu from './Menus/GuestsMenu.js';
import './bigSearchBar.css';
import './Menus/LocationMenu.css';
import './Menus/DateMenu.css';


export default function BigSearchBar(menu) {
    const ulRef = useRef();


    const handleClicks = (e) => {
        e.stopPropagation();

        if (ulRef.current && ulRef.current.contains(e.target)) {
            return

        }
        if (ulRef.current && !ulRef.current.contains(e.target)) {
            // pickAMenu(e.target.id)
        }
    }




return (

    <div onClick={handleClicks} className='bigSearchBar'>
        <div className='AnywhereBig'>{menu === "anywhere" ? "where" : "Anywhere"}
            {(menu === "anywhere") && <input placeholder="Anywhere" />}
        </div>
        <div className='anyWeekBig'>Any Week

            {menu === "anyWeek" && (
                <div className='DateBig'>
                    <DateMenu />
                </div>

            )}



        </div>
        <div className='numGuestsBig'>add Guests


            {menu === "Guests" &&
                <GuestsMenu />

            }

        </div>
        <div className='searchButtonBig'></div>




    </div>

)}