import { useState } from "react";
import { motion } from "framer-motion";
import "./login.css";
import Text from "../../components/Text";
// import DelayedNavigator from '../../components/DelayedNavigator';
import LanguageSwitcher from "../../components/TextRender";
// import { useDispatch } from 'react-redux';
// import { login } from '../../actions';
import { auth, db } from "../../config/firebase";

import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PORT } from "../../config/server";
function ForgotPassword() {
  const [showProgress, setShowProgress] = useState(false);
  const navigate = useNavigate();
  const [Error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
  });

  const checkEmailAvailability = async (email) => {
    const usersRef = collection(db, "users"); // Reference to the 'users' collection
    const q = query(usersRef, where("email", "==", email)); // Query to check email
    const querySnapshot = await getDocs(q);

    return querySnapshot.empty; // Returns true if email is not in use
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

  const handleResetPassword = async () => {
    setShowProgress(true);
    setError(null); // Reset any previous errors

    if (formData.email) {
      try {
        const response = await fetch(
          `${PORT}/api/user/forgot-password/request-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to request password reset");
        }

        // If the email is valid and the request is successful
        Cookies.set("em", formData.email);
        navigate("/forgot-password/new-password");
      } catch (error) {
        // Handle errors here, such as displaying a notification
        setError(
          "Email address does not match our records or an error occurred."
        );
      } finally {
        setShowProgress(false);
      }
    } else {
      setShowProgress(false);
      setError("Please enter your email address");
    }
  };

  return (
    <>
      <div className="header-login">
        <h1>
          <Text name="forget_password" />
        </h1>

        <p>
          <Text name="reset_instruction" />
        </p>
      </div>

      <div className="form-signup">
        <motion.label
          initial="hidden"
          animate="visible"
          style={{ color: Error ? "red" : "black" }}
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
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value.toLowerCase() });
            setError(null);
          }}
        />

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

        <motion.button
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.3 }}
          variants={buttonVariants}
          className="button"
          onClick={handleResetPassword}
        >
          {showProgress === true ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <Text name="reset_password" />
          )}
        </motion.button>

        <motion.p
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.3 }}
          style={{ textAlign: "center", fontFamily: "DM sans" }}
          onClick={() => navigate("/login")}
        >
          {" "}
          <i className="fa fa-chevron-left" aria-hidden="true"></i>{" "}
          <Text name="back" />
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.7 }}
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

export default ForgotPassword;
