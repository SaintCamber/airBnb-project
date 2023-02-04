import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { UpdateSpot } from "../../store/Spots";
import "../cssStuffs/modals.css";
import { populateOwnedSpots } from "../../store/session";
function UpdateSpotModal({ spot, oldState, setter }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(spot.name);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [country, setCountry] = useState(spot.country);
  const [state, setState] = useState(spot.state);
  const [price, setPrice] = useState(spot.price);
  // const [lat,setLat] = useState('')
  // const [lng,setLng] = useState('')
  const [description, setDescription] = useState(spot.description);
  const [errors, setErrors] = useState([]);
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
    setErrors([]);
    let newSpot = { ...spot };
    newSpot["name"] = name;
    newSpot["address"] = address;
    newSpot["city"] = city;
    newSpot["state"] = state;
    newSpot["country"] = country;
    newSpot["lat"] = Math.floor(Math.random() * 180);
    newSpot["lng"] = Math.floor(Math.random() * 180);
    newSpot["description"] = description;
    newSpot["price"] = price;
    newSpot["id"] = spot.id;
    console.log("the updated spot is now ", newSpot);
    return dispatch(UpdateSpot(newSpot))
    .then(async (res) => await res.json())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {setErrors(data.errors)}
        else{ 
          let newState = { ...oldState };
    newState[spot.id] = { ...spot, ...newSpot };
    setter(newState);
        };
      });
      // dispatch(populateOwnedSpots())
    
    }
    

  return (
    <div className={"modal"}>
      <h1>Update Spot</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <div  id={1} onClick={e=>handleLabelOnclick(e)} className={classOne} >name</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div  id={2}onClick={e=>handleLabelOnclick(e)} className={classTwo}>City</div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div  id={3}onClick={e=>handleLabelOnclick(e)} className={classThree}>State</div>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div  id={4}onClick={e=>handleLabelOnclick(e)} className={classFour}>Country</div>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div  id={5}onClick={e=>handleLabelOnclick(e)} className={classFive}>Address</div>
          <input
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
        </label> */}
        <label>
          <div id={6}onClick={e=>handleLabelOnclick(e)} className={classSix}>Price</div>
          <input
            type="integer"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={7}onClick={e=>handleLabelOnclick(e)} className={classSeven}>Description</div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <button className="FormButton" type="submit">
          Update Spot
        </button>
      </form>
    </div>
  );
}

export default UpdateSpotModal;
