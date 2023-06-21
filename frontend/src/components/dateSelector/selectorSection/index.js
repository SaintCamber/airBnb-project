import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


// here lies the section component. it's gonna have all sorts of cool junk in it
// like a search bar and a date picker and a guest picker and a search button
// or anything else your heart desires. it's gonna be great. but i want it to
// be a component that can be reused for all three sections so i'm gonna have
// to figure out what i want it to look like first. let's see uhhm the basic
// idea is that the section is clicked on and that opens up the section to cover
// the top of the screen and a dropdown menu and such or something. so this
// component (that section) needs to be the thing that is clicked on? or maybe 
// the thing is clicked on and this is what it opens up or closes when something 
// else is clicked on mayhaps? alrigt so the real website  is actually easier
// than that clicking the search bar at all opens up one sincgle big section 
// that has a couple dropdown menus to swith between not whole sections. and
// their search is waaaaaaaaay simpler than what i had planned it seems so thats
// nice though i'm not sure if i want to do it that way just yet so i'm gonna
// keep going with this for now.



// so a big section that opens up and some menus ok so have a state for the
// current menu and some logic for swithcing between them and then a bunch of
// components that are the different menus and some logic for what they do.
// that sounds like a plan yikes shouldn't have said that. 

// this bit needs to be opened whenever the date selector is clicked on and
// closed later on when something else is clicked on. which is gonna mean that 
// the date selector has an onClick that either opens a new component on top of
// itself or it transforms from the date selector as is and into the mega form
// which has the sections here in it. well i mean either way i can build the
// thing here and drop in it or the logic for it where ever i want. so doesn't
// really matter atm. 

// basic shape of the thing is a container that has a bar and the bar has
// buttons/areas that can be clicked on to open up various dropdown menus
// that have the actual functionality in them. so a div that has a span? which
// has some number of areas that can be clicked on which all open up different
// menus. for reusability it would be better to have the menus contain a
// component
// that has the functionality in it and then just have the menus be the
// containers for those components. but i am not feeling that right now so
// i'm just gonna have the menus be hardcoded in here and i'll refactor it later
// when everything else is working.
// so now it looks like:
// div
//   span
//     div div div div ... button(div)
//   span
// div 


export default function SelectorSection() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [curMenu, setCurMenu] = useState(0)

    const pickAMenu = (e) => {
        e.preventDefault()
        setCurMenu(e.target.id)
    }

    return (
        <div className="bar" >
            <span className="theButtons">
                <div id="1" className="button" onClick={pickAMenu}>Location</div>
                <div id="2" className="button" onClick={pickAMenu}>Check in</div>
                <div id="3" className="button" onClick={pickAMenu}>Check out</div>
                <div id="4" className="button" onClick={pickAMenu}>Guests</div>
            </span>
        </div>
    )


}
