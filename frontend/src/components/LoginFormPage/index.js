// frontend/src/components/LoginFormPage/index.js
// imports are for react use State from react login and logout from session.js react-redux supplies usedispatch and selector rrd gives us redirect
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginPageForm.css'
// define a function that returns jsx for reat to render on the virtual dom 
function LoginFormPage() {
    //make a dispatch a way to access useDispatch's methods
  const dispatch = useDispatch();
  //sessionUser is utilizes useSelector to grab from the state the session.user obj
  const sessionUser = useSelector(state => state.session.user);
  //these three are setting default values for useState object in order to create controlled inputs later on
  const [credential, setCredential] = useState('Username or Email');
  const [password, setPassword] = useState('Password');
  const [errors, setErrors] = useState([]);
//since this is a login form we can skip doing anything if someone is already logged in so go ahead and redirect to the home page
  if (sessionUser) return (
    <Redirect to="/" />
  );
// otherwise we have things to do so: handle submit  this is a form so that button at the bottom would refresh the whole page on clicking it we don't want that so e.PreventDefault then heck out of that
  const handleSubmit = (e) => {
    e.preventDefault();
    // set the state of errors to an empty array
    setErrors([]);
    // return the dispatching of the login function from session actions which eventually sends a pojo to the store
    return dispatch(sessionActions.login({ credential, password }))
    //if though there is any errors found catch them and set the state of errors to the errors found by taking the response of login and awaiting it's .json()
    //then parsing that for one being not empty and two having an errors key which if so set state of errors to data.errors
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
//here lies the actual jsx being returned by LoginFormPage
  return (
    // a form whose on submit is the function we defined above 
    <form onSubmit={handleSubmit} className='loginForm'>
        <h3 className='formHeader'>welcome to *.BnB</h3>
        {/* unordered list */}
      <ul>
        {/* a list item for each error found in the errors state, if empty then this will be too */}
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      {/* label for the input that follows */}
      <label>
        
        {/* the input a controlled input because it has onchange and value keys */}
        {/* here it defaults the value to credential empty string by default and then on change of the text field it encompasses it will set credential to whatever is inside the text field */}
        {/* essentially all this means is that as you type in  the box the box contains what you wrote instead of emptying */}
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className='logininput'
        />
      </label>
      <label>
        {/* same as above but for password here then the submit button is added */}
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='logininput'

        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;