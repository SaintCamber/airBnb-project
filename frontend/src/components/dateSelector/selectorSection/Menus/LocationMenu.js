
// alrighty so this is the location menu, it will be a dropdown menu that will
// allow the user to select a location for their search the example has it by
// continent which is supported by the seed data iirc so that's doable. 
// so then what 6 contintent  buttons and that's it? bet.
// i want each button to have an image of the continent and then the name of the
// continent and that's pretty much it.
// so a conthainer for the buttons each of which are a container for the image
// and name so that they can be styled separately.
// which is taken care of already  below . . . but i do still need to add logic
// for highlighting the selected button and then passing the name to the
// location state in the main component. which reminds me i need to add that
// to props. what's that look like uh assume this is always the location menu
// and not dynamic then i just need to pass in the state i want to change and
// the functions for changing it. so that's location, setLocation
// now add an onClick that does something like set the location to the clicked
// on continent and highlights it. i can do that by creatinf a new state for 
// the selected continent and then setting the className of the button to
// something like "selected" if the selected continent is the same as the
// continent of the button. 
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LocationMenu.css";
import nAmerica from '../../../../images/nAmerica.png';

const LocationMenu = ({ location, setLocation, closeMenu }) => {
  const history = useHistory();
  const [chosenLocation, setChosenLocation] = useState("");
  const locationMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const continents = [
    { name: "Africa", image: "africa.png" },
    { name: "Asia", image: "asia.png" },
    { name: "Europe", image: "europe.png" },
    { name: "North America", image: nAmerica },
    { name: "South America", image: "south-america.png" },
    { name: "Oceania", image: "oceania.png" },
  ];

  const pickLocation = (selectedContinent) => {
    setChosenLocation(selectedContinent);
    setLocation(selectedContinent);
    setShowMenu(false);
    history.push(`/search?location=continent:${selectedContinent}`);
  };

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (locationMenuRef.current && !locationMenuRef.current.contains(event.target)) {
      setShowMenu(false);
      closeMenu();
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
      <div className={`locationMenuButton ${showMenu ? "selected" : ""}`} onClick={toggleMenu}>
        <img src={chosenLocation ? continents.find((c) => c.name === chosenLocation)?.image : ""} alt={chosenLocation} />
      </div>
      {showMenu && (
        <div className="locationMenuDropdown">
          {continents.map((continent, index) => (
            <div
              key={index}
              className={`locationMenuOption ${chosenLocation === continent.name ? "selected" : ""}`}
              onClick={() => pickLocation(continent.name)}
            >
              <img src={continent.image} alt={continent.name} />
              <span>{continent.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationMenu;
