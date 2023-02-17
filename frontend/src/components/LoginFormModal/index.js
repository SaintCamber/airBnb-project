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
      <div className={"Demo"} onClick={handleDemo}>{"Demo User"}</div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="Form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
                      ))}
        </ul>
        <label  >
          <input
          placeholder="Username"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <input
          placeholder="Password"
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
