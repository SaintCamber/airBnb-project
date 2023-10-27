

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


// export default function SelectorSection({location, setLocation, checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests,curMenu, setCurMenu}) {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const ulRef = useRef();
//     const [showMenu, setShowMenu] = useState(false);

        
 
//     useEffect(() => {
//         if (!showMenu) return;
    
//         const closeMenu = (e) => {
//           if (!ulRef.current || !ulRef.current.contains(e.target)) {
//             setShowMenu(false);
//           }
//         };
    
//         document.addEventListener("click", closeMenu);
    
//         return () => document.removeEventListener("click", closeMenu);
//       }, [showMenu]);

//       const pickAMenu = (e) => {
//         e.preventDefault();
//         const id = e.target.id;
//         const value = e.target.innerText;
      
//         if (!ulRef.current || !ulRef.current.contains(e.target)) {
//           setShowMenu(false);
//         }
      
//         setCurMenu(id);
//         setLocation(value);
//       };
        
      
    // submitSearch should take in the selected values from the menus and then
    // send them to the backend so first some states for the values and then
    // some logic for sending them to the backend.
    // ideally the states would be dynamically generated based on the number of
    // buttons needed but for now they're just hardcoded in here.


    // const submitSearch = async  (e) => {
    //     e.preventDefault()
    //   let spots = await dispatch(searchSpots(location, checkIn, checkOut, guests))
    //    if (spots.length > 0) {
    //     history.push(`/search/results`)
    //      } else {
    //             alert("No results found")
    //         }
    //     location = setLocation("")
    //     checkIn = setCheckIn("")
    //     checkOut = setCheckOut("")
    //     guests = setGuests(0)

    // }

        
    // }
    // alright so the standard bar is clicked on and that opens up this
    // component which has a new bar that looks something like <location checkin
    // checkout guests> and then a search button. and then each of those opens a
    // dropdown menu that has stuff in it. ok if the buttons are each a div then
    // they should each contain a dropdown menu and the name of the button then
    // onClick the menu becomes visible and the name of the button goes away. 
    // and then the menu has a bunch of stuff in it. and the button name should
    // change to whatever is selected in the menu. which means the button names
    // should be held in state and then changed when something is selected in
    // their respective menus. go ahead and disable the search button until all
    // the menus have been selected? or maybe just disable it until the location
    // has been selected since the backend automatically fills in the checkin
    // and checkout dates if they're not selected. perhaps their should be a
    // message to the user about that somewhere in the event that they were
    // attempting to find all spots in a given location regardless of date.

    // not getting around it each of these menus is gonna have to be a component
    // blahhhhhhh ok so on to those then.

    import React, { useState, useRef } from "react";
import LocationMenu from "./Menus/LocationMenu";
import DateMenu from "./Menus/DateMenu";
import GuestsMenu from "./Menus/GuestsMenu";

export default function SelectorSection({
  location,
  setLocation,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
}) {
  const selectorSectionRef = useRef(null);
  const [curMenu, setCurMenu] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  function pickAMenu(event) {
    const menu = event.currentTarget.id;
    setCurMenu(menu);
    setShowMenu(true);
  }

  function submitSearch() {
    // submit search logic
  }

  function closeMenu() {
    setCurMenu(null);
    setShowMenu(false);
  }

  return (
    <div className="selectorSection" ref={selectorSectionRef}>
      <span className="selectorButtons">
        <div className="selectorButton" id="location" onClick={pickAMenu}>
          {`${location || "Location"}`}
          {curMenu === "location" && showMenu && (
            <LocationMenu
              location={location}
              setLocation={setLocation}
              closeMenu={closeMenu}
            />
          )}
        </div>
        <div className="selectorButton" id="checkIn" onClick={pickAMenu}>
          {`${checkIn || "Check-in"}`}
          {curMenu === "checkIn" && showMenu && (
            <DateMenu date={checkIn} setDate={setCheckIn} closeMenu={closeMenu} />
          )}
        </div>
        <div className="selectorButton" id="checkOut" onClick={pickAMenu}>
          {`${checkOut || "Check-out"}`}
          {curMenu === "checkOut" && showMenu && (
            <DateMenu date={checkOut} setDate={setCheckOut} closeMenu={closeMenu} />
          )}
        </div>
        <div className="selectorButton" id="guests" onClick={pickAMenu}>
          {`${guests || "Guests"}`}
          {curMenu === "guests" && showMenu && (
            <GuestsMenu guests={guests} setGuests={setGuests} closeMenu={closeMenu} />
          )}
        </div>
      <button className="selectorButton" disabled={!location} onClick={submitSearch}>
      </button>
      </span>
    </div>
  );
}



