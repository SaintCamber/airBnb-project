/**
 * location menu is going to be an innput field that will take in a location and then
 * render a list of suggestions based on the location
 * it also needs to geocode the location into a lat and long
 * so that it can be used to search for spots that are near that location
 * currently going to use geocode.maps.co for the geocoding
 * the component needs to open when the user clicks on the container in the parent component
 * the component needs to close when the user clicks outside of the component
 * the component needs to close when the user clicks on a suggestion
 * the compoonent in the parent component needs to update when the user clicks on a suggestion
 * it should display the chosen location instead of the text AnyWhere that it defaults to
 * thaat means i either needs a state variable that is the chosen location
 * or it needs to update the location state variable in the parent component
 * redux is probably the best way to do this
 * so import the search slice of state from the store
 * and then dispatch an action to update the location
 * which should then cause the location to update in the parent component
 * might need to update the parent component to use redux as well
 *
 * 
 */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../../../store/search.js"; // Import your redux actions

import "./LocationMenu.css";

const LocationMenu = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location); // Get location from Redux store

  const [chosenLocation, setChosenLocation] = useState("");
  const locationMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const geocode = async (chosenLocation) => {
    try {
      const response = await fetch(`https://geocode.maps.co/search?q=${chosenLocation}`);
      const data = await response.json();
      console.log("Geocode data:", data)
      const results = data.filter(result=> result.display_name.contains("United States")) // Filter out results that are not in the US
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (locationMenuRef.current && !locationMenuRef.current.contains(event.target)) {
      toggleMenu();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    dispatch(updateLocation(suggestion)); // Dispatch action to update location in Redux store
    toggleMenu();
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
      <div className={`locationMenuButton ${showMenu ? "selected" : ""}`} onClick={toggleMenu}></div>
      {showMenu && (
        <div className="locationMenuDropdown">
          <input
            type="text"
            placeholder="Search for a location"
            value={chosenLocation}
            onChange={(e) => {
              e.preventDefault();
              setChosenLocation(e.target.value);
              geocode(e.target.value);
            }}
          />
          ({suggestions?.map((suggestion) => (
            <div
              className="locationMenuDropdownItem"
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </div>
          ))})
        </div>
      )}
    </div>
  );
};

export default LocationMenu;
