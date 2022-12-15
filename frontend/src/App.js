// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import SingleSpot from "./components/SingleSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = "/Spots">
            <SpotsList />
          </Route>
          <Route path="Spots/:spotId">
            <SingleSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
