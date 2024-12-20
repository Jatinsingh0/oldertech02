import { useState } from "react";
import { motion } from "framer-motion";
import "./login.css";
import Text from "../../components/Text";
import LanguageSwitcher from "../../components/TextRender";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Make sure js-cookie is installed
import { PORT } from "../../config/server";

function ValidOTP() {
  const [showProgress, setShowProgress] = useState(false);
  const [Error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve the email from the cookie
  const emailFromCookie = Cookies.get("em");

  const [formData, setFormData] = useState({
    email: emailFromCookie || "", // Set email from cookie
    otp: "",
    newPass: "",
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

  const handleResetPassword = async () => {
    setShowProgress(true);
    setError(null);

    if (!formData.email || !formData.otp || !formData.newPass) {
      setShowProgress(false);
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `${PORT}/api/user/forgot-password/validate-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp,
            newPassword: formData.newPass,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("OTP validation failed or server error");
      }
      Cookies.remove("em");
      alert("The password has been successfully changed");
      // Navigate to login or confirmation page after successful password reset
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setShowProgress(false);
    }
  };

  return (
    <>
      <div className="header-login">
        <h1>Forgot Password</h1>
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
          OTP Code*
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.2 }}
          variants={variants}
          className="input"
          placeholder="One Time Code"
          value={formData.otp}
          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
        />

        <motion.label
          initial="hidden"
          animate="visible"
          style={{ color: Error ? "red" : "black" }}
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.3 }}
          variants={variants}
        >
          New Password*
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.4 }}
          variants={variants}
          className="input"
          placeholder="New Password"
          type="password"
          value={formData.newPass}
          onChange={(e) =>
            setFormData({ ...formData, newPass: e.target.value })
          }
        />

        <p
          style={{
            fontFamily: "DM Sans",
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
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.5 }}
          variants={buttonVariants}
          className="button"
          onClick={handleResetPassword}
        >
          {showProgress ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Change Password"
          )}
        </motion.button>

        <motion.p
          transition={{ ease: "easeIn", duration: 0.3, delay: 0.6 }}
          style={{ textAlign: "center", fontFamily: "DM Sans" }}
          onClick={() => navigate("/login")}
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i> Back
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

export default ValidOTP;
