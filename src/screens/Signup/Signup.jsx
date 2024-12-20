import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./signup.css";
import Text from "../../components/Text";
import DelayedNavigator from "../../components/DelayedNavigator";
import { db } from "../../config/firebase";
// import { signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore
import { jwtDecode } from "jwt-decode";
import FacebookLogin from "@greatsumini/react-facebook-login";

import { useGoogleLogin } from "@react-oauth/google";
import { PORT } from "../../config/server";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [Error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const checkEmailAvailability = async (email) => {
    const usersRef = collection(db, "users"); // Reference to the 'users' collection
    const q = query(usersRef, where("email", "==", email)); // Query to check email
    const querySnapshot = await getDocs(q);

    return querySnapshot.empty; // Returns true if email is not in use
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Define the animation variants
  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSignUp2 = async () => {
    if (
      formData.name.length != 0 &&
      formData.email.length != 0 &&
      formData.password.length != 0
    ) {
      setShowProgress(true);
      const isEmailAvailable = await checkEmailAvailability(formData.email);
      if (!isEmailAvailable) {
        // Handle the case where email is already in use
        setShowProgress(false);
        setEmailError("Email is already in use. Please try another.");
        alert("Email is already in use. Please try another.");
        return;
      }

      navigate("/signup/next");
      Cookies.set("formData", JSON.stringify(formData), { expires: 7 });
    } else {
      setError(true);
      alert("Please fill all the details");
    }
  };

  const handleSignUp = async () => {
    // Replace this with the actual email to search for
    const emailToFind = formData.email.toLowerCase;

    try {
      // Step 1: Find the user by email
      const findResponse = await fetch(`${PORT}/api/user/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailToFind }),
      });

      const findData = await findResponse.json();

      // Check if user is found and email is not verified
      if (findData && findData._id && !findData.isEmailVerified) {
        // Step 2: Delete the user
        const deleteResponse = await fetch(
          `${PORT}/api/user/delete-profile/${findData._id}`,
          {
            method: "DELETE",
          }
        );

        if (deleteResponse.ok) {
          handleSignUp2();
        } else {
          alert("Error deleting user");
        }
      } else if (findData && findData._id) {
        alert("User found, but email is already verified");
      } else {
        // User not found
        handleSignUp2();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Social Media Logins

  // Facebook

  function FacebookLoginA(name, email, password) {
    const formData2 = {
      name: name,
      email: email,
      password: password,
    };

    Cookies.set("formData", JSON.stringify(formData2), { expires: 7 });
    navigate("/signup/next");
  }

  // Google Signup

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
      <div className="header-signup">
        <h1>
          <Text name="signup_text" />
        </h1>
        <DelayedNavigator path="/login" color="#fff" delay={2000}>
          {" "}
          <p>
            <Text name="signup_prompt" />
          </p>
        </DelayedNavigator>
      </div>

      <div className="form-signup">
        <motion.label
          initial="hidden"
          animate="visible"
          style={{ color: Error ? "red" : "black" }}
          transition={{ ease: "easeIn", duration: 0.3 }}
          variants={variants}
        >
          <Text name="name" /> *
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.1 }}
          variants={variants}
          className="input"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setError(null);
          }}
        />

        <motion.label
          initial="hidden"
          animate="visible"
          style={{ color: emailError ? "red" : Error ? "red" : "black" }}
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.2 }}
          variants={variants}
        >
          <Text name="email" /> *
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.3 }}
          variants={variants}
          className="input"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value.toLowerCase() });
            setError(null);
            setEmailError(null);
          }}
        />
        <p
          style={{
            fontFamily: "DM sans",
            fontSize: 13,
            textAlign: "left",
            color: "red",
            marginBottom: 2,
            marginTop: -4,
            marginLeft: 6,
          }}
        >
          {emailError}
        </p>
        <motion.label
          initial="hidden"
          animate="visible"
          style={{ color: Error ? "red" : "black" }}
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.4 }}
          variants={variants}
        >
          <Text name="password" />*
        </motion.label>

        <div className="password-signup">
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeIn", duration: 0.3, delay: 0.5 }}
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

        <motion.button
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.6 }}
          variants={buttonVariants}
          className="button"
          onClick={handleSignUp}
        >
          {showProgress === true ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <Text name="signup_text" />
          )}
        </motion.button>

        <motion.p
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.7 }}
          variants={buttonVariants}
          className="orText"
        >
          <Text name="social_signup" />
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
          <FacebookLogin
            appId="1880602809041581"
            onProfileSuccess={(response) => {
              FacebookLoginA(response.name, response.email, response.id);
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
      </div>
    </>
  );
}

export default SignUp;
