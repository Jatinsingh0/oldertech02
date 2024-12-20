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
      <div className="header-login-category">
        <div className="logo-header-category">
          <div className="logo-category" style={{ marginLeft: "6%" }}>
            <img src="/logo512.png" alt="logo" />
          </div>
          <div className="text-category">
            {" "}
            <Text name="main_intro" />
          </div>
        </div>

        <p>
          <Text name="category_description" />
        </p>
      </div>

      <div className="choose-account-screen">
        <div className="choose-screen-text">
          <Text name="select_your_account" />
        </div>

        <DelayedNavigator path="/login" delay={2000}>
          <div
            className="selection-box-category hair-category-section"
            style={{ backgroundImage: "url('/intro3.png')" }}
          >
            <div className="selection-box-title">Hairdresser</div>
            <div className="selection-box-description">
              <Text name="hair_description" />
            </div>
          </div>
        </DelayedNavigator>

        <DelayedNavigator path="/login" delay={2000}>
          <div
            className="selection-box-category farmer-category-section"
            style={{ backgroundImage: "url('/port.png')" }}
          >
            <div className="selection-box-title">
              {" "}
              Clic Sea (Ports & Vessels)
            </div>
            <div className="selection-box-description">
              <Text name="port_description" />
            </div>
          </div>
        </DelayedNavigator>

        <DelayedNavigator path="/login" delay={2000}>
          <div
            className="selection-box-category port-category-section"
            style={{ backgroundImage: "url('/farmer-background.png')" }}
          >
            <div className="selection-box-title">Clic Land (Agriculture)</div>
            <div className="selection-box-description">
              <Text name="agriculture_description" />
            </div>
          </div>
        </DelayedNavigator>

        <DelayedNavigator path="/login" delay={2000}>
          <div
            className="selection-box-category p2p-category-section"
            style={{ background: "#F28E18" }}
          >
            <div className="selection-box-title">ClicLoop (P2P) </div>
            <div className="selection-box-description">
              Clic Recycle Give & Take
            </div>
          </div>
        </DelayedNavigator>

        <DelayedNavigator path="/signup" delay={2000}>
          <div className="choose-screen-text">
            <Text name="no_account" />
          </div>
        </DelayedNavigator>
      </div>

      {/* Review */}
    </>
  );
}

export default LoginOverview;
