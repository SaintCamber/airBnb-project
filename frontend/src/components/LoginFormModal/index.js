// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "../cssStuffs/modals.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  function handleDemo(e) {
    let demoCreds = { credential: "Demo-lition", password: "password" };
    e.preventDefault();
    dispatch(sessionActions.login(demoCreds));
    closeModal()
  }
  return (
    <div className={"modal"}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="Form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
                      ))}
        </ul>
        <div className="bookingsList" onClick={handleDemo}>
              Demo User
            </div>
        <label  >
          <div id={1}onClick={e=>handleLabelOnclick(e)} className={classOne}>Username or Email</div>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={2} onClick={e=>handleLabelOnclick(e)} className={classTwo}>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <button className="FormButton" type="submit" disabled={credential.length<4||password.length<6?true:false}>
          Log In
        </button>
      </form>
      
    </div>
  );
}

export default LoginFormModal;
