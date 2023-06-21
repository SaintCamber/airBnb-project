
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

import React from "react"
import "./LocationMenu.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"





export default function LoationMenu({ location, setLocation }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [chosenLocation, setChosenLocation] = useState("")


    const pickLocation = (e) => {
        e.preventDefault()
        if (e.target.id === 0) return

        if (e.target.id === "1") {
            setChosenLocation("Africa")
            setLocation("Africa")
        } else if (e.target.id === "2") {
            setChosenLocation("Asia")
            setLocation("Asia")
            return

        } else if (e.target.id === "3") {
            setChosenLocation("Europe")
            setLocation("Europe")
            return

        } else if (e.target.id === "4") {
            setChosenLocation("North America")
            setLocation("North America")
            return

        } else if (e.target.id === "5") {

            setChosenLocation("South America")
            setLocation("South America")
            return

        } else if (e.target.id === "6") {
            setChosenLocation("Oceania")
            setLocation("Oceania")
            return
        }

        setChosenLocation("")
        return

    }




    return (
        <div className={`locationMenu `}>
            <div className="locationMenuButtons">
                <div onClick={pickLocation} className={`MenuButton ${chosenLocation === "Africa" ? "selected" : ""}`} id="1">Africa</div>
            </div>
            <div className="locationMenuButton" id="2">
                <div onClick={pickLocation} className={`MenuButton ${chosenLocation === "Asia" ? "selected" : ""}`}>Asia</div>
            </div >
            <div className="locationMenuButton" id="3">
                <div onClick={pickLocation} className={`MenuButton ${chosenLocation === "Europe" ? "selected" : ""}`}>Europe</div>
            </div >
            <div className="locationMenuButton" id="4">
                <div onClick={pickLocation} className={`MenuButton ${chosenLocation === "North America" ? "selected" : ""}`}>North America</div>
            </div >
            <div className="locationMenuButton" id="5">
                <div onClick={pickLocation} className={`MenuButton ${chosenLocation === "South America" ? "selected" : ""}`}>South America</div>
            </div >
            <div className="locationMenuButton" id="6">
                <div onClick={pickLocation} className={`MenuButton ${chosenLocation === "Oceania" ? "selected" : ""}`}>Oceania</div>
            </div >

        </div >

    )
}