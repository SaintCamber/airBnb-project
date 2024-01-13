import React, { useEffect, useRef,useState } from 'react';
import { useSelector } from 'react-redux';
import LocationMenu from './Menus/LocationMenu.js';
import DateMenu from './Menus/DateMenu.js';
import GuestsMenu from './Menus/GuestsMenu.js';
import './bigSearchBar.css';
import './Menus/LocationMenu.css';
import './Menus/DateMenu.css';


export default function BigSearchBar() {
    const ulRef = useRef();
    const u1Ref = useRef();
    const u2Ref = useRef();
    const u3Ref = useRef();
    const [menu, setCurMenu] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numGuests, setNumGuests] = useState(1);
    const location = useSelector(state => state.Search.location)


    const handleClicks = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        if (ulRef.current.contains(e.target)){
            if (u1Ref.current.contains(e.target)){
                setCurMenu("anywhere")
            }
            else if (u2Ref.current.contains(e.target)){
                setCurMenu("anyWeek")
            }
            else if (u3Ref.current.contains(e.target)){
                setCurMenu("Guests")
            }
        }
        else setCurMenu('')}
    


return (

    <div ref={ulRef} onClick={handleClicks} className='bigSearchBar'>
        <div id='anywhere' ref={u1Ref} className={`AnywhereBig`}>{menu !== "anywhere" ? (location==="" ? "Anywhere" : location) :<LocationMenu />}
            
        </div>
        <div id="anyWeek" ref={u2Ref} className='anyWeekBig'>

                {menu!== "anyWeek" && <div className="SearchHeading">Any Week</div>}
               {menu==='anyWeek' && (<> <div className='DateBig'>
                    <DateMenu option={'0'} />
                </div>
                <div className='DateBig'>
                    <DateMenu option={'1'} />
            
                </div></>)}




        </div>
        <div id="Guests" ref={u3Ref} className='numGuestsBig'>add Guests


            {menu === "Guests" &&
                <GuestsMenu />

            }

        </div>
        <div className='searchButtonBig'></div>




    </div>

)}