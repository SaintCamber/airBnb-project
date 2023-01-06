import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {UpdateSpot} from "../../store/Spots"
import './index.css'

function UpdateSpotModal() {
  const dispatch = useDispatch();
  const [name,setName]= useState('')
  const [address,setAddress]= useState('')
  const [city,setCity]= useState('')
  const [country,setCountry]= useState('')
  const [state,setState]= useState('')
  const Spot = useSelector(state=>state.spots.SingleSpot)
  const SpotList = useSelector(state=>state.spots.AllSpots)
  const [price,setPrice]= useState('')
  const [lat,setLat] = useState('')
  const [lng,setLng] = useState('')
const history = useHistory()
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
      setErrors([]);
        let newSpot = {...Spot}
        newSpot["name"]=name
        newSpot["address"]=address
        newSpot["city"]=city
        newSpot["state"]=state
        newSpot["country"]=country
        newSpot['lat']=lat
        newSpot['lng']=lng
        newSpot['description']=description
        newSpot['price']=price
        console.log('the updated spot is now ',newSpot)
      dispatch(UpdateSpot(newSpot))
      .then(async res=>await res.json())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      closeModal()
      
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
        <label>
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
