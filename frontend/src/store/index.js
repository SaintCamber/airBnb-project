import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import SpotsReducer from "./Spots";
import bookingsReducer from "./bookings";
import ReviewsReducer from "./Reviews";
import searchReducer from "./search";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spots: SpotsReducer,
  bookings:bookingsReducer,
  Reviews:ReviewsReducer,
  Search:searchReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
