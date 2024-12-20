// reducer.js
import { SET_LANGUAGE } from "./actionTypes";

import Cookies from "js-cookie";

const initialState = {
  language: Cookies.get("language") || "es",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
