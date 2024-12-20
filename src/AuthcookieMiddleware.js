// cookieMiddleware.js
import { LOGIN, LOGOUT } from "./actionTypes";
import Cookies from "js-cookie"; // Assume you are using js-cookie

const AuthcookieMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN:
      Cookies.set("isAuthenticated", "true");
      break;
    case LOGOUT:
      Cookies.remove("isAuthenticated");
      break;
    default:
      break;
  }
  return next(action); // Don't forget to pass the action to the next middleware or reducer
};

export default AuthcookieMiddleware;
