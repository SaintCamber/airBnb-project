// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {Route, Switch} from "react-router-dom";
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
import learn from './components/learn';
import NotLoggedin from './components/notLoggedin';
// in App.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state=>state.session.user)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    
    <div style={{display:"flex",alignItems:'center',flexDirection:'column',width:"100vw",justifyContent:'space-evenly',padding:"25px",paddingTop:'0px'}}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = {['/','/home']}>
            <SpotsList />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot  />
          </Route>
          <Route exact path="/user/spots">
            {user ?<UpdatePage />:<NotLoggedin/>}
          </Route>
          <Route path={'/currentBookings'}>
            {user ? <BookingsList />:<NotLoggedin/>}
          </Route>
          <Route path={"/learn"}>
            Learn more Page coming soon!
            <Link to='/'>Home</Link>
          </Route>
          <Route path="/maps">
            <>
              <h1>Planning to add the google maps api to this page to search for near by spots</h1>
              <h2>This will require updating the database probably though since there is not a search feature yet</h2>
              <h3>in order to implement search with out adding one to the database like i think i might have to i could however make a thunk that accepts an argument
                  of say a string that modifies the query to the database to search for say the name of the spot or more likely the city/state right cause that would 
                  make implementing the map make more sense populate the list of spots in x state/y city and then should be able to drop a pin on the google map assuming 
                  valid addresses are enforced, which i honestly don't know how i would do that just yet  </h3>
            </>
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

