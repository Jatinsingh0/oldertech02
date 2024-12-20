// reducer.js
import { LOGIN, LOGOUT } from "./actionTypes";
import Cookies from "js-cookie";

const initialState = {
  isAuthenticated: Cookies.get("isAuthenticated") === "true" ? true : false,
};

const reducer = (state = initialState, action) => {
  switch (
    action.type // Ensure action is defined
  ) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
