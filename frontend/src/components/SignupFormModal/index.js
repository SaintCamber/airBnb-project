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


function resetForm(){
  setEmail("")
  setUsername("")
  setFirstName("")
  setLastName("")
  setPassword("")
  setConfirmPassword("")
  setErrors([])
  closeModal()
  
}
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (password === confirmPassword) {
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
        .then(resetForm)
        .catch(async (res) => {
          const data = await res.json();
          console.log("datadtatrdard",data)
          if (data && data.errors) setErrors(data.errors)
          
        })
        
        
       

        
      }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  }


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
       
          <input
          placeholder="email@example.com"

            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
          
          <input
            type="text"
          placeholder="Username"

            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>
        
          <input
            type="text"
          placeholder="FirstName"

            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <label>

            <input
          placeholder="LastName"

            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        <label>
    
          <input
          placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={"formInput"}
          />
        </label>
        <button type="submit" disabled={!email.length||username.length<4||!firstName.length||!lastName.length||password.length<6||password!==confirmPassword ?  true:false}className={"FormButton"}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
