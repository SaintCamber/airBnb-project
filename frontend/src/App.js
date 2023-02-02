// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import SingleSpot from "./components/SingleSpot";
import UpdatePage from "./components/UpdatePage"
import {useSelector} from 'react-redux'
import { useLocation } from "react-router-dom";
import BookingsList from "./components/BookingsList";
import PageNotFound from "./components/PageNotFound";
import { Link } from "react-router-dom";
// in App.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser(),dispatch(sessionActions.populateOwnedSpots())).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    
    <div style={{display:"flex",alignItems:'center',flexDirection:'column',width:"100%",justifyContent:'space-evenly',padding:"25px"}}>
      <div style={{display:'flex',height:"50px",width:"100%",alignContent:"center",alignItems:'center',justifyContent:'center'}}>show total prices up front  <Link style={{marginLeft:15}}>Learn More</Link></div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = {'/'}>
            <SpotsList />
          </Route>
          <Route path="/user/spots">
            <UpdatePage />
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

