import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Phone from "./Phone.jsx";
import { register as registerServiceWorker } from "./serviceWorkerRegistration"; // Import the service worker registration
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId =
  "792842270502-baso85fquif4gufkqp7qlm72037uieut.apps.googleusercontent.com";

// Function to detect if the user is on a mobile device
function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return (
    /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m (ini|obile)|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|zw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|bent|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |a|g|p|s)|tp)|hu(aw|tc)|i\-(20|go)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|je|ji(ac|az)|kgt( |\/)|klon|kpt |kwc\-|kyo(c|ko)|le(no|xi)|lg( g|\/(k|l|u)|50)|li(me|re)|llink|ma(te|ui|xo)|mc(01|ca)|m\-cr|me(rc|ri)|mi(o8|a)|mkho|mmef|mot(\-|v)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0-2)|n50[0-2]|n7(0[0-2]|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-[1-8])|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qtek|r380|r600|raks|road|rover|s55\/|sa(ge|ma|mm|ms|mu|mv|mw)|samsung|sch|sc(01|h\-\|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|be|er|et)|sn(1|3|5|7|8|9)|so(ft|ny)|sp(01|h\-|v\-)|sy(01|mb)|t2(18|50)|t6(00|10)|ta(gt|lk)|tcl\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up\.(b|g)1|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|wap|webc|whit|wi(g |nc|nw)|wmlb|wonu|xda|xiino/i.test(
      userAgent.substr(0, 4)
    )
  );
}

// Function to render the App or display a message
function renderApp() {
  if (isMobileDevice()) {
    // Render the App if on a mobile device
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <RouterProvider router={App} />
          </Provider>
        </GoogleOAuthProvider>
      </React.StrictMode>
    );
  } else {
    // Display a message if not on a mobile device
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <Phone />
      </React.StrictMode>
    );
  }
}

// Call the render function
renderApp();
registerServiceWorker();
