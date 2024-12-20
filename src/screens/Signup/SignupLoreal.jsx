import { useState } from "react";
import { motion } from "framer-motion";
import "./signup.css";
import Text from "../../components/Text";
import DelayedNavigator from "../../components/DelayedNavigator";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PORT } from "../../config/server";

function SignUpLoreal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    salonName: "",
    location: "",
    city: "",
    phone: "",
    phoneNumber: "",
    clientNumber: "",
    message: "",
  });

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const inputDelay = 0.1;
  const increment = 0.1;

  const savedFormData = JSON.parse(Cookies.get("formData") || "{}");
  const handleSignup = () => {
    // Assuming savedFormData is an object containing your form data
    const submitFormData = {
      name: savedFormData.name,
      lastname: ".",
      password: savedFormData.password,
      role: "Customer",
      email: savedFormData.email,
      city: formData.city,
      address: savedFormData.address,
      phone: savedFormData.phone,
      type: "loreal",
      nombre: savedFormData.name,
      salonName: formData.salonName,
      direction: savedFormData.address,
      ciudad: formData.city,
      telephone: formData.phone,
      numberCliente: formData.clientNumber,
      message: formData.message,
      userStatus: "unactive",
    };

    console.log(submitFormData);

    fetch(`${PORT}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitFormData),
    })
      .then((response) => response.json())
      .then(() => {
        Cookies.set("formData3", JSON.stringify(formData), { expires: 7 });
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
          <Text name="complete_details" />
        </h1>
        <p>Fill the form of hairstylists for the future by L'oreal.</p>
      </div>

      <div className="loreal-signup-logo">
        <img src="/loreal.png" alt="loreal" />
      </div>

      <div className="form-signup">
        {[
          "Nombre",
          "salonName",
          "Direccion",
          "Ciudad",
          "Número de teléfono",
          "Numero cliente",
          "Mensaje",
        ].map((field, index) => (
          <>
            <motion.label
              initial="hidden"
              animate="visible"
              transition={{
                ease: "easeIn",
                duration: 1,
                delay: inputDelay + increment * index * 2,
              }}
              variants={variants}
            >
              {field.replace(/([A-Z])/g, " $1")} *
            </motion.label>

            <motion.input
              initial="hidden"
              animate="visible"
              transition={{
                ease: "easeIn",
                duration: 1,
                delay: inputDelay + increment + increment * index * 2,
              }}
              variants={variants}
              className="input"
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
            />
          </>
        ))}

        <motion.button
          initial="hidden"
          animate="visible"
          transition={{
            ease: "easeIn",
            duration: 1,
            delay: inputDelay + increment * 18,
          }} // adjust delay to control when button appears
          variants={buttonVariants}
          className="button"
          onClick={handleSignup}
        >
          Next
        </motion.button>

        <motion.p
          initial="hidden"
          animate="visible"
          transition={{
            ease: "easeIn",
            duration: 1,
            delay: inputDelay + increment * 19,
          }} // adjust delay to control when text appears
          variants={buttonVariants}
          className="orText"
        >
          <Text name="terms_agreement" />
        </motion.p>
      </div>
    </>
  );
}

export default SignUpLoreal;
