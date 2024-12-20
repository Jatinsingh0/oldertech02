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

function LoginOverview() {
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

  return (
    <>
      <div className="header-login">
        <h1>ClicRecycle</h1>

        <p>
          <Text name="select_category" />{" "}
        </p>
      </div>

      <DelayedNavigator path="/main" delay={2000}>
        <div className="menu-item" style={{ fontFamily: "DM sans" }}>
          <div className="menu-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17L21 12L16 7"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="menu-content">
            <div className="menu-content-title">
              ClicRecycle for Hairdresser
            </div>
          </div>
        </div>
      </DelayedNavigator>

      <DelayedNavigator path="/farmers" delay={2000}>
        <div
          className="menu-item"
          style={{ fontFamily: "DM sans", marginTop: "12px" }}
        >
          <div className="menu-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17L21 12L16 7"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="menu-content">
            <div className="menu-content-title">ClicRecycle for Farmers </div>
          </div>
        </div>
      </DelayedNavigator>

      <DelayedNavigator path="/agriculture" delay={2000}>
        <div
          className="menu-item"
          style={{ fontFamily: "DM sans", marginTop: "12px" }}
        >
          <div className="menu-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17L21 12L16 7"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="menu-content">
            <div className="menu-content-title">
              ClicRecycle for Agriculture
            </div>
          </div>
        </div>
      </DelayedNavigator>

      <DelayedNavigator path="/port-and-vessels" delay={2000}>
        <div
          className="menu-item"
          style={{ fontFamily: "DM sans", marginTop: "12px" }}
        >
          <div className="menu-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17L21 12L16 7"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="menu-content">
            <div className="menu-content-title">
              ClicRecycle for Port & Vessels{" "}
            </div>
          </div>
        </div>
      </DelayedNavigator>

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

export default LoginOverview;
