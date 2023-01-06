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
import BookingsList from "./components/BookingsList";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    
    <div style={{display:"flex",alignItems:'center',flexDirection:'column',width:"100%",maxWidth:1024,justifyContent:'space-around'}}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = {'/'}>
            <SpotsList />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot  />
          </Route>
          <Route path={'/currentBookings'}>
            <BookingsList />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
          )}
    </div>
    
  );
}

export default App;

