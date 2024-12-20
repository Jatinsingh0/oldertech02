import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./login.css";
import Text from "../../components/Text";
import DelayedNavigator from "../../components/DelayedNavigator";
import LanguageSwitcher from "../../components/TextRender";
import { useDispatch } from "react-redux";
import { login } from "../../actions";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { InstagramLogin } from "@amraneze/react-instagram-login";
const clientId = "";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { PORT } from "../../config/server";

function PortDetails() {
  const responseInstagram = (response) => {
    console.log(response);
  };
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/profile");
    }
    // Load the Google Identity Services library
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
      }
    };

    initializeGoogleSignIn();
  }, [navigate]);
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Send this token to your backend for verification and to extract user information
  };

  const handleSignInClick = () => {
    if (window.google) {
      window.google.accounts.id.prompt((notification) => {
        alert(" The given origin of app is not allowed for the web");
        // The prompt is now displayed to the user.
        // You can check notification.isNotDisplayed() or notification.isSkippedMoment() to see if the prompt was not displayed and why.
      });
    } else {
      console.error(
        "The Google Identity Services library has not been initialized."
      );
    }
  };

  const [Error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleLogIn = async (event) => {
    // event.preventDefault();
    setShowProgress(true);
    setError(null); // Reset errors

    try {
      const response = await fetch(`${PORT}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userCredential = await response.json(); // Adjust this line based on how your API returns the user data

      // Assuming the API returns the user's email and UID
      Cookies.set("email", formData.email);
      Cookies.set("uid", userCredential.uid);

      dispatch(login()); // Dispatch login action
      navigate("/profile"); // Navigate to profile page
    } catch (error) {
      setError(
        "Your login credentials do not match our records. Please verify your credentials and try again"
      );
      alert(
        "Your login credentials do not match our records. Please verify your credentials and try again"
      );
    } finally {
      setShowProgress(false);
    }
  };
  // Define the animation variants
  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const FacebookLoginA = async (name, email, password) => {
    try {
      const response = await fetch(`${PORT}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userCredential = await response.json(); // Adjust this line based on how your API returns the user data

      // Assuming the API returns the user's email and UID
      Cookies.set("email", email);
      Cookies.set("uid", userCredential.uid);

      dispatch(login()); // Dispatch login action
      navigate("/profile"); // Navigate to profile page
    } catch (error) {
      setError(
        "Your Facebook login credentials do not match our records. Please verify your credentials and try again"
      );
      alert(
        "Your Facebook login credentials do not match our records. Please verify your credentials and try again"
      );
    } finally {
      setShowProgress(false);
    }
    // setFormData({name:name,email:email,password:password})
    // handleSignUp()
  };

  const Googlelogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Token Response:", tokenResponse);

      // Decode ID token
      const decodedToken = jwtDecode(tokenResponse.credential);
      console.log("Decoded Token:", decodedToken);

      // Extract user information
      const { email, name } = decodedToken;
      console.log("Email:", email, "Name:", name);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  function handleBack() {
    navigate(-1); // Goes back to the previous page
  }
  return (
    <>
      <div className="header-login">
        <h1>
          {" "}
          <div className="back-btn" onClick={handleBack}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
          ClicRecycle
        </h1>

        <p>
          Initiative to recycle and reuse human hair waste in environmental
          solutions{" "}
        </p>
      </div>

      <p
        style={{
          padding: 23,
          fontFamily: "DM sans",
          fontSize: "13px",
          textAlign: "justify",
        }}
      >
        The absorption capacity is similar to that of traditional polypropylene
        barriers, with a higher weight complicating handling and water removal
        efforts. Improvements are needed in the barrier's outlet latching
        mechanism. One barrier (white) sank after clogging, while the other two
        (blue) remained buoyant. Post-contaminant recovery waste management is
        under review, with tests being conducted within the framework of the ARC
        Grant. The barriers leave traces of hair on the hands during handling,
        which is an area for improvement. Recommendations include increasing
        buoyancy for larger sizes, exploring different dimensions to ease
        installation and handling, using outer materials that minimize hair
        presence, and designing an efficient system for waste management after
        contaminant recovery and for reusing the barriers.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/clic-port.png" style={{ height: "auto", width: 323 }} />
      </div>

      <p
        style={{
          padding: 23,
          fontFamily: "DM sans",
          fontSize: "13px",
          opacity: 0.8,
          textAlign: "justify",
        }}
      >
        Driven by a simple ambitious vision to offer concrete circular solutions
        that decarbonize and care for the planet. We recycle hair waste and
        transform it into biogenic products that contribute to a positive impact
        on the environment through waste management, cleaning and saving water
        resources, restoring soil for regenerative agriculture and much more.
      </p>

      <p
        style={{
          padding: 23,
          fontFamily: "DM sans",
          fontSize: "13px",
          opacity: 0.8,
          textAlign: "center",
        }}
      >
        Our Partners
      </p>
      <img style={{ height: 42, marginTop: -29 }} src="/partners.jpg" />
    </>
  );
}

export default PortDetails;
