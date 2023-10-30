import React, { useEffect } from 'react';
import LocationMenu from './Menus/LocationMenu.js';
import DateMenu from './Menus/DateMenu.js';
import GuestsMenu from './Menus/GuestsMenu.js';
import './bigSearchBar.css';
import './Menus/LocationMenu.css';
import './Menus/DateMenu.css';


export default function BigSearchBar({menu}) {


useEffect(() => {
    console.log(menu)
}
, [menu])



    return (
        
        <div className='bigSearchBar'>
        <div className='AnywhereBig'>Anywhere
            {(menu==="anywhere")&&<LocationMenu/>}
        </div>
        <div className='anyWeekBig'>Any Week
        
        {menu==="anyWeek"&&(
            <div className='DateBig'>
            <DateMenu/>
        </div>

        )}
     
        

        </div>
        <div className='numGuestsBig'>add Guests
            

            { menu==="Guests"&&
            <GuestsMenu/>
                
            }  
                
        </div>
        <div className='searchButtonBig'></div>

    
        
        
        </div>
         
    );
}