// store.js
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reducer from "./reducer";
import Authreducer from "./AuthReducer";
import cookieMiddleware from "./cookieMiddleware";
import AuthcookieMiddleware from "./AuthcookieMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  general: reducer,
  auth: Authreducer,
});

const enhancer = composeEnhancers(
  // applyMiddleware(thunk),  // Apply middleware here if any
  // other store enhancers if any

  applyMiddleware(cookieMiddleware),
  applyMiddleware(AuthcookieMiddleware)
);

const store = createStore(rootReducer, enhancer);

export default store;
