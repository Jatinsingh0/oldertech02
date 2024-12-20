import { useState } from "react";
import { motion } from "framer-motion";
import "./signup.css";
import Text from "../../components/Text";
import DelayedNavigator from "../../components/DelayedNavigator";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PORT } from "../../config/server";

function SignUpNext() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    phone: "",
    customerType: "Hair",
  });
  const savedFormData = JSON.parse(Cookies.get("formData") || "{}");

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSignup2 = () => {
    Cookies.set("formData2", JSON.stringify(formData), { expires: 7 });
    navigate("/signup/loreal");
  };

  const handleSignup = () => {
    // Assuming savedFormData is an object containing your form data
    const submitFormData = {
      name: savedFormData.name,
      lastname: ".",
      password: savedFormData.password,
      role: "Customer",
      email: savedFormData.email,
      city: formData.city,
      address: formData.address,
      phone: formData.phone,
      type: formData.customerType,
      nombre: savedFormData.name,
      salonName: savedFormData.name + " " + "Salon",
      direction: formData.address,
      ciudad: formData.city,
      telephone: formData.phone,
      numberCliente: "",
      message: "Creating an account as non-loreal",
      userStatus: "unactive",
    };

    fetch(`${PORT}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitFormData),
    })
      .then((response) => response.json())
      .then(() => {
        Cookies.set("formData2", JSON.stringify(formData), { expires: 7 });
        navigate("/signup/verify");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="header-signup">
        <h1>
          {" "}
          <Text name="complete_details" />
        </h1>
        <p>
          <Text name="fill_the_form" />
        </p>
      </div>

      <div className="form-signup">
        <motion.label
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.1 }}
          variants={variants}
        >
          <Text name="city" />*
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.2 }}
          variants={variants}
          className="input"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <motion.label
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.1 }}
          variants={variants}
        >
          <Text name="address" />*
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.2 }}
          variants={variants}
          className="input"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <motion.label
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.3 }}
          variants={variants}
        >
          <Text name="phone_number" />*
        </motion.label>
        <motion.input
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.4 }}
          variants={variants}
          className="input"
          maxLength={12}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <motion.label
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.5 }}
          variants={variants}
        >
          I’m an *
        </motion.label>
        <motion.select
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.6 }}
          variants={variants}
          className="input"
          style={{ width: "90vw" }}
          value={formData.customerType}
          onChange={(e) =>
            setFormData({ ...formData, customerType: e.target.value })
          }
        >
          <option value="Hair">Not a L´Oréal customer</option>
          <option value="loreal">I'm a L´Oréal customer</option>
          <option value="Farmer">I'm Agriculture customer</option>
          <option value="Port">I'm Ports & Vessels customer</option>
          <option value="P2P">ClicLoop (P2P)</option>
        </motion.select>

        <motion.button
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.7 }} // adjust delay to control when button appears
          variants={buttonVariants}
          className="button"
          onClick={handleSignup}
        >
          Next
        </motion.button>

        <motion.p
          initial="hidden"
          animate="visible"
          transition={{ ease: "easeIn", duration: 1, delay: 0.8 }} // adjust delay to control when text appears
          variants={buttonVariants}
          className="orText"
        >
          <Text name="terms_agreement" />
        </motion.p>
      </div>
    </>
  );
}

export default SignUpNext;
