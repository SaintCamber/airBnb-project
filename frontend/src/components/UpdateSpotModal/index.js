import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import {UpdateSpot} from "../../store/Spots"
import './index.css'
import { populateOwnedSpots } from "../../store/session";
function UpdateSpotModal({spot,oldState,setter}) {
  const dispatch = useDispatch();
  const [name,setName]= useState(spot.name)
  const [address,setAddress]= useState(spot.address)
  const [city,setCity]= useState(spot.city)
  const [country,setCountry]= useState(spot.country)
  const [state,setState]= useState(spot.state)
  const [price,setPrice]= useState(spot.price)
  // const [lat,setLat] = useState('')
  // const [lng,setLng] = useState('')
  const [description, setDescription] = useState(spot.description)
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
      setErrors([]);
        let newSpot = {...spot}
        newSpot["name"]=name
        newSpot["address"]=address
        newSpot["city"]=city
        newSpot["state"]=state
        newSpot["country"]=country
        newSpot['lat']=Math.floor(Math.random()*180)
        newSpot['lng']=Math.floor(Math.random()*180)
        newSpot['description']=description
        newSpot['price']=price
        newSpot['id']=spot.id
        console.log('the updated spot is now ',newSpot)
      dispatch(UpdateSpot(newSpot))
      .then(async res=>await res.json())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      // dispatch(populateOwnedSpots())
      closeModal()
     let newState= {...oldState}
     newState[spot.id]={...spot,...newSpot}
     setter(newState)
  }

  return (
    <div className="container">
      <h1>Update Spot</h1>
      <form className="modal-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
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
          Price
          <input
            type="integer"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Spot</button>
      </form>
    </div>
  );
}

export default UpdateSpotModal;
