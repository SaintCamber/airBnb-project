import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { UpdateSpot } from "../../store/Spots";
import { populateOwnedSpots } from "../../store/session";
import "../cssStuffs/modals.css";
function UpdateSpotModal({ spot, oldState, setter }) {
  const dispatch = useDispatch();
  const history=useHistory()
  const [name, setName] = useState(spot.name);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [country, setCountry] = useState(spot.country);
  const [state, setState] = useState(spot.state);
  const [price, setPrice] = useState(spot.price);
  // const [lat,setLat] = useState('')
  // const [lng,setLng] = useState('')
  const [description, setDescription] = useState(spot.description);
  const [validationErrors, setValidationErrors] = useState([]);
  const { closeModal } = useModal();
  const [labelId,setLabelId]=useState("0")
  function handleLabelOnclick(e){
    if(e.target.id!==labelId){
        setLabelId(parseInt(e.target.id))
        
      }
      console.log(labelId,e.target.id)
    }
let classOne=labelId===1 ? "InputTitle -active":"InputTitle"


let classTwo=labelId===2 ? "InputTitle -active":"InputTitle"
let classThree=labelId===3 ? "InputTitle -active":"InputTitle"

let classFour=labelId===4 ? "InputTitle -active":"InputTitle"
let classFive=labelId===5 ? "InputTitle -active":"InputTitle"
let classSix=labelId===6 ? "InputTitle -active":"InputTitle"
let classSeven=labelId===7 ? "InputTitle -active":"InputTitle"


  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    let newSpot = {...spot};
    newSpot["name"] = name;
    newSpot["address"] = address;
    newSpot["city"] = city;
    newSpot["state"] = state;
    newSpot["country"] = country;
    newSpot["lat"] = Math.floor(Math.random() * 180);
    newSpot["lng"] = Math.floor(Math.random() * 180);
    newSpot["description"] = description;
    newSpot["price"] = price;
    // newSpot["id"] = spot.id;
    console.log("the updated spot is now ", newSpot);
    return dispatch(UpdateSpot(newSpot))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.validationErrors) setValidationErrors(data.validationErrors);
    })
    .then(setter({...oldState,[spot.id]:newSpot}))
    .then(closeModal).then(history.push(`/spots/${spot.id}`))
      
  }
    
  
  return (
    <div className={"modal"}>
      <h1>Create New Spot</h1>
      <form onSubmit={handleSubmit} className="Form">
        <ul>
          {validationErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
          placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
         
          <input
          placeholder="City"

            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
         
          <input
        placeholder="State"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
        
          <input
          placeholder="country"

            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
        
          <input
        placeholder="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        {/* <label>
          Latitude
          <input
            type="integer"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required

          />
        </label>
        <label>
          Longitude
          <input
            type="integer"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
/>
        </label>
           */}
        <label>
         
          <input
          placeholder="enter a price"

            type="integer"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
        
          <textArea
            onChange={(e) => setDescription(e.target.value)}
            className="formInput"
            value={description}
            placeHolder={description}
            ></textArea>
        </label>
                <button className={"FormButton"} type="submit" disabled={!name.length||!city.length||!state.length||!country.length||!address.length||Number(price)<10||description.length <30 ? true:false }>
          Update Spot
        </button>
      </form>
    </div>
  );
}

export default UpdateSpotModal;
