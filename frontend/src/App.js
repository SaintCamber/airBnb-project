// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import SingleSpot from "./components/SingleSpot";
import {useSelector} from 'react-redux'
import { useLocation } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <div style={{display:"flex",alignItems:'center',flexDirection:'column',width:"90%",maxWidth:1024}}>

      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = {'/'}>
            <SpotsList />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot  />
          </Route>
        </Switch>
          )}
    </div>
    
  );
}

export default App;

