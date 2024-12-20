// cookieMiddleware.js
import Cookies from "js-cookie";

const cookieMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  let state = store.getState();
  Cookies.set("language", state.general.language, { expires: 365 }); // Stores language in a cookie for 1 year
  return result;
};

export default cookieMiddleware;
