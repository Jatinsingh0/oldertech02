import { motion } from "framer-motion";
import LanguageSwitcher from "../../components/TextRender";
import Text from "../../components/Text";
import "./splash.css";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions";
import DelayedNavigator from "../../components/DelayedNavigator";
import { useState, useEffect } from "react";
import Splash from "./Splash";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function IntroPort() {
  // ...rest of your code
  const navigate = useNavigate();
  const [lang] = useSelector((state) => state.general.language);
  const [loading, setLoading] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleDelayedNavigation = () => {
    // Increment the loading progress every 100 milliseconds
    const intervalId = setInterval(() => {
      setLoading((prevLoading) => {
        const nextLoading = prevLoading + 10;
        if (nextLoading >= 100) {
          // Stop the interval when loading reaches 100
          clearInterval(intervalId);
        }
        return Math.min(nextLoading, 100); // Increment by 10, max 100
      });
    }, 100);

    // Delay the navigation
    setTimeout(() => {
      setLoading(0); // Reset loading progress
      setVisible(true);
    }, 2000);
  };

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/profile");
    }
    handleDelayedNavigation();
  }, [navigate]);
  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (visible === true) {
    return (
      <div
        className="backgroundImage"
        style={{
          background: "url('/port-and-vessel.png')",
          backgroundSize: "cover",
        }}
      >
        <img
          style={{
            height: 110,
            width: 110,
            position: "absolute",
            top: 0,
            marginTop: 83,
          }}
          src="/logo512.png"
        />

        <div className="overlay">
          <motion.p
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeIn", duration: 1, delay: 0.1 }}
            variants={variants}
            className="title"
          >
            <Text name="2" />
          </motion.p>
          <div className="buttonContainer">
            <DelayedNavigator path="/port-details" delay={2000}>
              <motion.button
                initial="hidden"
                animate="visible"
                transition={{ ease: "easeIn", duration: 1, delay: 0.2 }}
                variants={buttonVariants}
                style={{ paddingRight: lang === "f" ? "12px" : "24px" }}
                className="login"
              >
                <Text name="more_details" />
              </motion.button>
            </DelayedNavigator>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeIn", duration: 1, delay: 0.4 }}
            variants={variants}
          >
            <LanguageSwitcher color="#fff" />
          </motion.div>
        </div>
      </div>
    );
  } else {
    return <Splash />;
  }
}
