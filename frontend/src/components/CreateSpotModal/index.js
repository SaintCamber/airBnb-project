import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { createSpot } from "../../store/Spots";
import { useHistory } from "react-router-dom";
import "../cssStuffs/modals.css";

function CreateSpotModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [labelId,setLabelId]=useState(0)

  const [price, setPrice] = useState("");
  // const [lat,setLat] = useState('')
  // const [lng,setLng] = useState('')
  const [imageList, setImageList] = useState(["", "", "", "", ""]);
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  function handleLabelOnclick(e){
    if(e.target.id!==labelId){
        setLabelId(parseInt(e.target.id))
        
      }
      console.log(labelId,e.target.id)
    }
    let classOne=labelId===1 ? "InputTitle active":"InputTitle"


    let classTwo=labelId===2 ? "InputTitle active":"InputTitle"
    let classThree=labelId===3 ? "InputTitle active":"InputTitle"
    
    let classFour=labelId===4 ? "InputTitle active":"InputTitle"
    let classFive=labelId===5 ? "InputTitle active":"InputTitle"
    let classSix=labelId===6 ? "InputTitle active":"InputTitle"
    let classSeven=labelId===7 ? "InputTitle active":"InputTitle"
    let classEight,classNine,classTen,classEleven,classTwelve
let imgClasses = {
  0:classEight=labelId===8 ? "InputTitle active":"InputTitle",
  1:classNine=labelId===9 ? "InputTitle active":"InputTitle",
  2:classTen=labelId===10 ? "InputTitle active":"InputTitle",
  3:classEleven=labelId===11 ? "InputTitle active":"InputTitle",
  4:classTwelve=labelId===12 ? "InputTitle active":"InputTitle"

}


  const handleSubmit = async (e) => {
    console.log("IMAGES IMAGES IMAGES IMAGES", imageList);
    e.preventDefault();
    setErrors([]);
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

    dispatch(createSpot(spot, imageList))
      .then(async (res) => await res.json())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    // if (!errors.length) {
    //   closeModal();
    // }

        setName("")
        setAddress("")
        setCity("")
        setCountry("")
        setPrice("")
        setDescription("")
        setImageList(['','','','',''])
    history.push("/");
  };
  const handleImageUrlChange = (event, index) => {
    const imageUrls = [...imageList];
    imageUrls[index] = event.target.value;
    setImageList(imageUrls);
  };

  return (
    <div className={"modal"}>
      <h1>Create New Spot</h1>
      <form onSubmit={handleSubmit} className="Form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <div id={1} onClick={e=>handleLabelOnclick(e)} className={classOne}>name</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={2}onClick={e=>handleLabelOnclick(e)} className={classTwo} >City</div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={3}onClick={e=>handleLabelOnclick(e)} className={classThree}>State</div>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={4}onClick={e=>handleLabelOnclick(e)} className={classFour}>Country</div>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={5}onClick={e=>handleLabelOnclick(e)} className={classFive}>Address</div>
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
        {imageList.map((imageUrl, index) => (
          <label key={index}>
            <div id={index+8} onClick={handleLabelOnclick} className={imgClasses[index]} >Image URL {index + 1}</div>

            <input
              className={"formInput"}
              type="text"
              value={imageUrl}
              onChange={(event) => handleImageUrlChange(event, index)}
              required
            />
          </label>
        ))}
        <button className={"FormButton"} type="submit">
          Create Spot
        </button>
      </form>
    </div>
  );
}

export default CreateSpotModal;
