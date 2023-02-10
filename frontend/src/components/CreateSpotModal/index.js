import React, { useState,useEffect,} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { createSpot } from "../../store/Spots";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import "../cssStuffs/modals.css";

function CreateSpotModal() {
  const dispatch = useDispatch();
  const [id,setId]=useState('')
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [labelId, setLabelId] = useState("");
  const Scroller = useRef(null)
  const [price, setPrice] = useState("");
  // const [lat,setLat] = useState('')
  // const [lng,setLng] = useState('')
  const [imageList, setImageList] = useState(["", "", "", "", ""]);
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [ValidationErrors, setValidationErrors] = useState([]);
 const scroller = useRef(null)
  const { closeModal, } = useModal();
  const hasSubmittedOnce = false

 useEffect(()=>{
  let errors = []
  if(name.length<3&&name.length){errors.push("name must be longer than 3 characters")}
  else if (name.length>50&&name.length){errors.push("name can't be longer than 50 characters")}
if(address.length<5&&address.length){errors.push("please enter a valid address")}
if(city.length<4&&city.length){errors.push("cities must have a name at least 4 characters long")}
if(state.length<3&&state.length){errors.push("Please use the entire state name abbreviations are not valid")}
if(country.length<3&&country.length){errors.push("country must be longer than 3 characters please use full name")}
if(price.length&&typeof price!=="Number"){errors.push("must enter a valid price")}
if(description.length>0&&(description.length<30||description.length>500)){errors.push("description must be between 30 and 500 characters")}
if(imageList[0].length>0&&!imageList[0].endsWith("jpg")){errors.push('Image#1 Invalid Valid images end in jpg ')}
if(imageList[1].length>0&&!imageList[1].endsWith("jpg")){errors.push('Image#2 Invalid Valid images end in jpg ')}
if(imageList[2].length>0&&!imageList[2].endsWith("jpg")){errors.push('Image#3 Invalid Valid images end in jpg ')}
if(imageList[3].length>0&&!imageList[3].endsWith("jpg")){errors.push('Image#4 Invalid Valid images end in jpg ')}
if(imageList[4].length>0&&!imageList[4].endsWith("jpg")){errors.push('Image#5 Invalid Valid images end in jpg ')}
setValidationErrors(errors)
 },[name,city,address,country,state,description,price,imageList[0],imageList[1],imageList[2],imageList[3],imageList[4]])

  function handleLabelOnclick(e) {
    if (e.target.id !== labelId) {
      setLabelId(parseInt(e.target.id));
    }
    console.log(labelId, e.target.id);
  }
  let classOne = labelId === 1 ? "InputTitle -active" : "InputTitle";

  let classTwo = labelId === 2 ? "InputTitle -active" : "InputTitle";
  let classThree = labelId === 3 ? "InputTitle -active" : "InputTitle";

  let classFour = labelId === 4 ? "InputTitle -active" : "InputTitle";
  let classFive = labelId === 5 ? "InputTitle -active" : "InputTitle";
  let classSix = labelId === 6 ? "InputTitle -active" : "InputTitle";
  let classSeven = labelId === 7 ? "InputTitle -active" : "InputTitle";
  let classEight, classNine, classTen, classEleven, classTwelve;
  let imgClasses = {
    0: (classEight = labelId === 8 ? "InputTitle -active" : "InputTitle"),
    1: (classNine = labelId === 9 ? "InputTitle -active" : "InputTitle"),
    2: (classTen = labelId === 10 ? "InputTitle -active" : "InputTitle"),
    3: (classEleven = labelId === 11 ? "InputTitle -active" : "InputTitle"),
    4: (classTwelve = labelId === 12 ? "InputTitle -active" : "InputTitle"),
  };

  const handleSubmit = async (e) => {
    console.log("IMAGES IMAGES IMAGES IMAGES", imageList);
    e.preventDefault();
  //   let errors = []
  //   if(name.length<3&&name.length){errors.push("name must be longer than 3 characters")}
  //   else if (name.length>50&&name.length){errors.push("name can't be longer than 50 characters")}
  // if(address.length<5&&address.length){errors.push("please enter a valid address")}
  // if(city.length<4&&city.length){errors.push("cities must have a name at least 4 characters long")}
  // if(state.length<3&&state.length){errors.push("Please use the entire state name abbreviations are not valid")}
  // if(country.length<3&&country.length){errors.push("country must be longer than 3 characters please use full name")}
  // if(!price.length){errors.push("must enter a price")}
  // if(description.length>0&&(description.length<30||description.length>500)){errors.push("description must be between 30 and 500 characters")}
  // if(imageList[0].length<0||!imageList[0].endsWith("jpg")){errors.push('Image#1 Invalid Valid images end in jpg ')}
  // if(imageList[1].length<0||!imageList[1].endsWith("jpg")){errors.push('Image#2 Invalid Valid images end in jpg ')}
  // if(imageList[2].length<0||!imageList[2].endsWith("jpg")){errors.push('Image#3 Invalid Valid images end in jpg ')}
  // if(imageList[3].length<0||!imageList[3].endsWith("jpg")){errors.push('Image#4 Invalid Valid images end in jpg ')}
  // if(imageList[4].length<0||!imageList[4].endsWith("jpg")){errors.push('Image#5 Invalid Valid images end in jpg ')}
  // setValidationErrors(errors)
    let spot = {
      name,
      address,
      city,
      state,
      country,
      price,
      description,
      lat: Math.floor(Math.random() * 180),
      lng: Math.floor(Math.random() * 180),
    };
    
    
    if(!ValidationErrors.length){
      dispatch(createSpot(spot, imageList))
      setName("");
      setAddress("");
      setCity("");
      setCountry("");
      setPrice("");
      setDescription("");
      setImageList(["", "", "", "", ""]);
      closeModal()
      history.push(`/Spots/newest`)
       }

   
          
           
        
  
    
     

  };
  const handleImageUrlChange = (event, index) => {
    const imageUrls = [...imageList];
    imageUrls[index] = event.target.value;
    setImageList(imageUrls);
  };

  return (
    <div ref={scroller} id={`CreateModal`} className={"modal"}>
      <h1>Create New Spot</h1>
      <form onSubmit={handleSubmit} className="Form">
        <ul>
          {ValidationErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <div
            id={1}
            onClick={(e) => handleLabelOnclick(e)}
            className={classOne}>
            name
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div
            id={2}
            onClick={(e) => handleLabelOnclick(e)}
            className={classTwo}>
            City
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div
            id={3}
            onClick={(e) => handleLabelOnclick(e)}
            className={classThree}>
            State
          </div>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div
            id={4}
            onClick={(e) => handleLabelOnclick(e)}
            className={classFour}>
            Country
          </div>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div
            id={5}
            onClick={(e) => handleLabelOnclick(e)}
            className={classFive}>
            Address
          </div>
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
        </label>
           */}
        <label>
          <div
            id={6}
            onClick={(e) => handleLabelOnclick(e)}
            className={classSix}>
            Price
          </div>
          <input
            type="integer"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div
            id={7}
            onClick={(e) => handleLabelOnclick(e)}
            className={classSeven}>
            Description
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        {imageList.map((imageUrl, index) => (
          <label key={index}>
            <div
              id={index + 8}
              onClick={handleLabelOnclick}
              className={imgClasses[index]}>
              Image URL {index + 1}
            </div>

            <input
              className={"formInput"}
              type="text"
              value={imageUrl}
              onChange={(event) => handleImageUrlChange(event, index)}
              required
            />
          </label>
        ))}
        <button className={"FormButton"} type="submit" disabled={!name.length||!city.length||!state.length||!country.length||!address.length||(price===0||price===NaN)||!description.length||!imageList[4].length||!imageList[0].length|!imageList[1].length||!imageList[2].length||!imageList[3].length ? true:false }>
          Create Spot
        </button>
      </form>
    </div>
  );
}

export default CreateSpotModal;
