import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "../cssStuffs/modals.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [labelId, setLabelId] = useState("0");

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
function resetForm(){
  setEmail("")
  setUsername("")
  setFirstName("")
  setLastName("")
  setPassword("")
  setConfirmPassword("")
  setErrors([])
}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      if(firstName.length<4)setErrors([...errors,"firstName must be longer than 4 characters"])
      if(lastName.length<4)setErrors([...errors,"lastName must be longer than 4 characters"])
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(async (res) => await res.json())
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors([...errors,...data.errors]);
        }).then(()=>{
          if(!errors.length)closeModal()
          else resetForm()});
    }
    
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className={"modal"}>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit} className={"Form"}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <div id={1} className={classOne} onClick={handleLabelOnclick}>
            Email
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={2} className={classTwo} onClick={handleLabelOnclick}>
            Username
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={3} className={classThree} onClick={handleLabelOnclick}>
            First Name
          </div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={4} className={classFour} onClick={handleLabelOnclick}>
            Last Name
          </div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={5} className={classFive} onClick={handleLabelOnclick}>
            Password
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          <div id={6} className={classSix} onClick={handleLabelOnclick}>
            Confirm Password
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <button type="submit" disabled={!email.length||!username.length||!firstName.length||!lastName.length||!password.length||!confirmPassword.length ?  true:false}className={"FormButton"}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
