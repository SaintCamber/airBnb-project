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
  return (vzdsg
    <div className={"modal"}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="Form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
                      ))}
        </ul>
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
        <button className="FormButton" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
