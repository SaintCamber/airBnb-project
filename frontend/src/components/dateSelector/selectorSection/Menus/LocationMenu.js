/*
alright so geocoding is being annoying because the free service i'm using
doesn't have a way to filter out results that aren't in the US
so instead just gonna have a select menu with a list of states(only the 48
contiguous ones?)
and then when the user selects a state it will choose that for the filter on the
search
that means this version of LocationMenu is now going to be just a dropdown menu
that will display the current location(state) and allow the user to change it
it will also need to dispatch an action to update the location in the redux
store so the search can actually use it for the query. 
the dataase reqquires a state and a city so the location will be able to filter
off that easily. 
what should the structure of this be?
i know i want it to look like the "button" in the bigSearchBar turnes into a list
of states when clicked so that means this needs to be not just a select option
so that means i need to use a ul and li's that each have a little picture of the
state and the name of the state. and when clicked, should close the menu and set
the location to that state.
i'll need the redux store for this so import that.
and then i'll need to dispatch an action to update the location in the store so
lets say import that action from the store as well.
i'll need to pass the current location to this component so i can display it
which means a useSelector hook. that looks like this:
const location = useSelector(state => state.location) or something like that
anyway
next to close the menu when the user clicks away or an option i'll need to use a
useEffect hook
that looks like this:
useEffect(()=>{
    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []); or something similar anyway

  that means i need a handleClickOutside function that will close the menu when
  called
  that looks like this:
  const handleClickOutside = (event) => {
    if (locationMenuRef.current && !locationMenuRef.current.contains(event.target)) {
      toggleMenu();
    }
  };

  and i'll need a toggleMenu function that will toggle the menu
  that looks like this:
  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
  clearly that means i need a useState hook for showMenu
  that looks like this:
  const [showMenu, setShowMenu] = useState(false);

  and i'll need a useRef hook for the locationMenuRef
  that looks like this:
  const locationMenuRef = useRef(null);

  i want the little pictures of the states but don't want to have to create them
  myself so i'll need to find a way to get them from somewhere maybe a react
  package?

  look those up later.

  for now just make a ul and li's that have the names of the states in them
  and when clicked will close the menu and set the location to that state
  and dispatch an action to update the location in the redux store

  
*/

/*
ok so 1/10, the dropdown is opening and closing properly, and the location in
the store updates properly but the location variable in the li is not updating
past undefined. what's the deal with that?
the current hang up is that i want the li that is selected to have a class of 
"selected" so that it can be styled differently. but that is not working....
"location" inside the return of LocationMenu is undefined always, but "location"
the variable that is named as the result of useSelector is updating properly.
when updateLocation is called. is it that the location inside the map function
is out of scope?
yeah i think it is since it is updating past undefind if location is defined is
a paraeter of the map function though it's just naming the index of the array
less than helpful.



*/
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../../../store/search.js";

import "./LocationMenu.css";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const LocationMenu = () => {
  const dispatch = useDispatch();
  let location = useSelector((state) => state.Search.location); // Get location from Redux store, which works though i am not accessing it properly for the css i am trying to do.
  // figured it out, was accessing the state in the wrong area.

  const locationMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    // alert(location)
  };

  const handleClickOutside = (event) => {
    if (
      locationMenuRef.current &&
      !locationMenuRef.current.contains(event.target)
    ) {
      toggleMenu();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div className="locationMenu" ref={locationMenuRef}>
      <div className="locationMenuCurrent">{location}</div>
      <div
        className={`locationMenuButton ${showMenu ? "selected" : ""}`}
        onClick={toggleMenu}
      ></div>
      {showMenu && (
        <div className="locationMenuDropdown">
          <ul>
            {states.map((state) => (
              <li
                className={`locationMenuOption ${
                  location === state ? "selected" : ""
                }`}
                key={state}
                onClick={() => {
                  dispatch(updateLocation(state));
                  // toggleMenu();
                }}
              >
                {state}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationMenu;
