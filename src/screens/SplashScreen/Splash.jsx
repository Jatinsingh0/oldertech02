import { motion } from "framer-motion";
import "./splash.css";

function Splash() {
  return (
    <div className="container">
      <div className="logoContainer">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 1, yoyo: Infinity }, // yoyo: Infinity will repeat the animation indefinitely
            scale: { duration: 1, yoyo: Infinity },
          }}
          src="/logo512.png"
          className="logo"
          alt="logo"
          style={{ height: "auto", width: 140 }}
        />

        {/* <p className="text">ENVIRONMENT-FRIENDLY MOVEMENT SINCE 2002</p> */}
      </div>
    </div>
  );
}

export default Splash;
