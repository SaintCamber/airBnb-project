// frontend/src/App.js
import React, { useState, useEffect,Suspense,lazy } from "react";
import { useDispatch } from "react-redux";
import {Route, Switch} from "react-router-dom";
// import SignupFormPage from "./components/SignupFormModal";
import Maps from './components/maps/maps.js';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UpdatePage from "./components/UpdatePage"
import {useSelector} from 'react-redux'
// import { useLocation } from "react-router-dom";
import BookingsList from "./components/BookingsList";
import PageNotFound from "./components/PageNotFound";
// import ManageReviews from "./components/Reviews/ManageReviews";
import { Link } from "react-router-dom";
// import learn from './components/learn';
import SpotsList from './components/SpotsList';
import SingleSpot from './components/SingleSpot';
import NotLoggedin from './components/notLoggedin';
// in App.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { getCurrentUsersReviews } from "./store/Reviews";
import SpotSearch from "./components/SpotSearch"
const ManageReviews = lazy(()=>import('./components/Reviews/ManageReviews'))
library.add(fas)


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const Spots = useSelector(state=>state.spots.AllSpots)
  const Singleton = useSelector(state=>state.spots.SingleSpot)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getCurrentUsersReviews())
  }, [dispatch]);
  
  
  const user = useSelector(state=>state.session.user)
  const userReviews =useSelector(state=>state.Reviews.userReviews)
  const search = useSelector(state=>state.Search.search)

  return (
    
    <div style={{display:"flex",alignItems:'center',flexDirection:'column',width:"100vw",justifyContent:'space-evenly',paddingLeft:"25px",paddingRight:"25px",margin:"0px"}}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = {['/',"/home",]}>
            {Spots ? <SpotsList />:<h1>unable to retrieve spots,please try again later</h1>}
          </Route>
          <Route path="/spots/:spotId">
            {Singleton? <SingleSpot  />:<h1>unable to retrieve spot details, please try again later</h1>}
          </Route>


          <Route exact path="/user/spots">
            {user ?<UpdatePage />:<NotLoggedin/>}
          </Route>
          <Route path={'/currentBookings'}>
            {user ? <BookingsList />:<NotLoggedin/>}
          </Route>
          <Suspense>
          <Route exact path="/user/reviews">
            <ManageReviews reviews={userReviews} currentUser={user}/>
          </Route>
          <Route path={"/Search"}>
            {search ? <SpotSearch />:<h1>no spots available</h1>}
          </Route>

          </Suspense>
          <Route path={"/learn"}>
            Learn more Page coming soon!
            <Link to='/'>Home</Link>
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

