import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { createSpot } from "../../store/Spots";
import { useHistory } from 'react-router-dom';
import './index.css'


function CreateSpotModal() {
  const dispatch = useDispatch();
  const [name,setName]= useState('')
  const [address,setAddress]= useState('')
  const [city,setCity]= useState('')
  const [country,setCountry]= useState('')
  const [state,setState]= useState('')

  const [price,setPrice]= useState('')
  // const [lat,setLat] = useState('')
  // const [lng,setLng] = useState('')
  const [imageList,setImageList] = useState(['','','','',''])
const history = useHistory()
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
 
  const handleSubmit = async (e) => {
    console.log('IMAGES IMAGES IMAGES IMAGES',imageList)
    e.preventDefault();
      setErrors([]);
      let spot = {name,address,city,state,country,price,description,lat:Math.floor(Math.random()*180),lng:Math.floor(Math.random()*180)}
      
       dispatch(createSpot(spot,imageList))
      .then(async res=>await res.json())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      if(!errors.length){
        closeModal()

      }

  }
  const handleImageUrlChange = (event, index) => {
    const imageUrls = [...imageList];
    imageUrls[index] = event.target.value;
    setImageList(imageUrls);
  };

  return (
    <div className='container'>
      <h1>Create New Spot</h1>
      <form onSubmit={handleSubmit} className="modal-form">
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
        </label>
           */}
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
        {imageList.map((imageUrl, index) => (
  <label key={index}>
    Image URL {index + 1}
    <input type="text" value={imageUrl} onChange={(event) => handleImageUrlChange(event, index)} required />
  </label>
))}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpotModal;
