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
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { InstagramLogin } from "@amraneze/react-instagram-login";
const clientId = "";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { PORT } from "../../config/server";

function Login() {
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
        <h1>
          <Text name="welcome_back" />
        </h1>

        <DelayedNavigator path="/signup" delay={2000}>
          <p>
            <Text name="no_account" />
          </p>
        </DelayedNavigator>
      </div>

      <div className="form-signup">
        <motion.label
          initial="hidden"
          animate="visible"
          style={{ color: Error ? "red" : "black", fontSize: 15 }}
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.1 }}
          variants={variants}
        >
          <Text name="email" />*
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.2 }}
          variants={variants}
          className="input"
          value={formData.email.toLowerCase()}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value.toLowerCase() });
            setError(null);
          }}
        />

        <motion.label
          initial="hidden"
          animate="visible"
          style={{ color: Error ? "red" : "black", fontSize: 15 }}
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.3 }}
          variants={variants}
        >
          <Text name="password" /> *
        </motion.label>

        <div className="password-signup">
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeIn", duration: 0.3, delay: 0.4 }}
            variants={variants}
            className="input password-input"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setError(null);
            }}
          />
          <i
            className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
            aria-hidden="true"
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <p
          style={{
            fontFamily: "DM sans",
            fontSize: 13,
            textAlign: "center",
            color: "red",
          }}
        >
          {Error}
        </p>
        {/* <DelayedNavigator path={error===null?"/profile":"/login"}  delay={2000}> */}
        <motion.button
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.5 }}
          variants={buttonVariants}
          style={{ fontSize: 20 }}
          className="button"
          onClick={() => {
            handleLogIn();
          }}
        >
          {showProgress === true ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <Text name="login" />
          )}
        </motion.button>
        {/* </DelayedNavigator> */}

        <DelayedNavigator path="/forgot-password" delay={2000}>
          <motion.p
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeIn", duration: 0.3, delay: 0.6 }}
            variants={buttonVariants}
            className="orText"
          >
            <Text name="forgot_password" />
          </motion.p>
        </DelayedNavigator>

        <motion.p
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.7 }}
          variants={buttonVariants}
          className="orText"
        >
          <Text name="login_using" />
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.8 }}
          variants={buttonVariants}
          className="iconContainer"
        >
          <FacebookLogin
            appId="1880602809041581"
            onProfileSuccess={(response) => {
              FacebookLoginA(response.name, response.email, response.id);
              // console.log('Get Profile Success!', response);
            }}
            render={({ onClick }) => (
              <img
                className="social-login-icons"
                src="/insta-login.png"
                onClick={onClick}
              />
            )}
          />

          <img
            className="social-login-icons"
            src="/google-login.png"
            onClick={() => {
              Googlelogin();
            }}
          />

          {}

          <FacebookLogin
            appId="1880602809041581"
            onProfileSuccess={(response) => {
              FacebookLoginA(response.name, response.email, response.id);
              // console.log('Get Profile Success!', response);
            }}
            render={({ onClick }) => (
              <img
                className="social-login-icons"
                src="/facebook-login.png"
                onClick={() => onClick()}
              />
            )}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.9 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "18%",
          }}
          variants={variants}
        >
          <LanguageSwitcher color="#000" />
        </motion.div>
      </div>
    </>
  );
}

export default Login;
