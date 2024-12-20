// actions.js
import { SET_LANGUAGE, LOGIN, LOGOUT } from "./actionTypes";

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});
