import "./signup.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { PORT } from "../../config/server";
import Text from "../../components/Text";

import { useNavigate } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();
  const savedFormData = JSON.parse(Cookies.get("formData") || "{}");
  const savedFormData2 = JSON.parse(Cookies.get("formData2") || "{}");
  const savedFormData3 = JSON.parse(Cookies.get("formData3") || "{}");

  useEffect(() => {
    async function fetchData() {}

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleSignup2 = async (event) => {
    try {
      // Use Firebase's createUserWithEmailAndPassword method
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        savedFormData.email,
        savedFormData.password
      );

      // User created & signed in, userCredential.user will contain the signed-in user information
      console.log(userCredential.user);

      // Get the UID of the newly created user
      const uid = userCredential.user.uid;

      // Create a reference to the user document in Firestore
      const userDocRef = doc(db, "users", uid);

      // Set the name and email in the user document
      await setDoc(userDocRef, {
        name: savedFormData.name,
        role: "Customer",
        type: savedFormData2.customerType,
        salonName: savedFormData3.salonName || savedFormData.name,
        profilePic:
          "https://firebasestorage.googleapis.com/v0/b/clicrecycle-testing.appspot.com/o/images.png?alt=media&token=fd1a9f74-070d-405a-b2d5-9a566e3ff2e1&_gl=1*66nnsr*_ga*NzI1MDYzNzQ2LjE2OTkzMzk3MTI.*_ga_CW55HF8NVT*MTY5OTQ0MTcyNi43LjEuMTY5OTQ0MTc1MC4zNi4wLjA.",
        email: savedFormData.email,
        address: savedFormData2.address,
        city: savedFormData2.city,
        dataLoreal: savedFormData3,
        phonenumber: savedFormData2.phone,
        password: savedFormData.password, // Storing passwords in Firestore is not recommended due to security concerns.
        BackgroundPic:
          "https://firebasestorage.googleapis.com/v0/b/clicrecycle-testing.appspot.com/o/background_pictures%2FW6PEo5Zc6pXXLBQJeorDMudkAlp1%2Fphoto-1560066984-138dadb4c035.png?alt=media&token=5f04f1ae-353a-404d-99e8-884fe479bf2f",
      });

      // Redirect to the profile page or dashboard after successful signup
      // You can use your routing method, like react-router-dom's useHistory hook or window.location
      // history.push('/profile'); // If using react-router-dom's useHistory
      // window.location = '/profile'; // Or direct window location change

      // Clear the form
      navigate("/signup/verify/otp");
      Cookies.remove("formData");
      Cookies.remove("formData2");

      // Show a success message or handle the successful signup
    } catch (error) {
      // Handle errors, such as email already in use, weak password, etc.
      console.error("Error signing up with email and password", error);
      alert(error); // Update the state to display the error message
    }
  };

  const handleSignup = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Assuming you have the email and OTP values from your form or user input
    const email = savedFormData.email; // Replace with actual email input
    const otp = formData.phone; // Replace with actual OTP input

    try {
      // Send a POST request to validate the OTP
      const response = await fetch(`${PORT}/api/user/validate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      // Handle the response
      if (response.ok) {
        // OTP validation successful
        handleSignup2();
        // Proceed with additional actions as necessary
      } else {
        // OTP validation failed
        console.error("OTP validation failed:", data);
        // Handle the error (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error("Error during OTP validation:", error);
      // Handle network or other errors
    }
  };

  return (
    <>
      <h1
        onClick={() => {
          window.location.href = "/signup/next";
        }}
        className="verify-title"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41 5.99994L11.71 1.70994C11.8983 1.52164 12.0041 1.26624 12.0041 0.999941C12.0041 0.73364 11.8983 0.478245 11.71 0.289941C11.5217 0.101638 11.2663 -0.00415039 11 -0.00415039C10.7337 -0.00415039 10.4783 0.101638 10.29 0.289941L6 4.58994L1.71 0.289941C1.5217 0.101638 1.2663 -0.00415039 1 -0.00415039C0.733698 -0.00415039 0.478304 0.101638 0.29 0.289941C0.101696 0.478245 -0.00409174 0.73364 -0.00409174 0.999941C-0.00409174 1.26624 0.101696 1.52164 0.29 1.70994L4.59 5.99994L0.29 10.2899C0.196272 10.3829 0.121877 10.4935 0.0711088 10.6154C0.0203401 10.7372 -0.00579834 10.8679 -0.00579834 10.9999C-0.00579834 11.132 0.0203401 11.2627 0.0711088 11.3845C0.121877 11.5064 0.196272 11.617 0.29 11.7099C0.382963 11.8037 0.493564 11.8781 0.615423 11.9288C0.737282 11.9796 0.867988 12.0057 1 12.0057C1.13201 12.0057 1.26272 11.9796 1.38458 11.9288C1.50644 11.8781 1.61704 11.8037 1.71 11.7099L6 7.40994L10.29 11.7099C10.383 11.8037 10.4936 11.8781 10.6154 11.9288C10.7373 11.9796 10.868 12.0057 11 12.0057C11.132 12.0057 11.2627 11.9796 11.3846 11.9288C11.5064 11.8781 11.617 11.8037 11.71 11.7099C11.8037 11.617 11.8781 11.5064 11.9289 11.3845C11.9797 11.2627 12.0058 11.132 12.0058 10.9999C12.0058 10.8679 11.9797 10.7372 11.9289 10.6154C11.8781 10.4935 11.8037 10.3829 11.71 10.2899L7.41 5.99994Z"
            fill="#1C1C28"
          />
        </svg>
      </h1>
      <h1 className="verify-title">
        <Text name="verify_otp" />
      </h1>
      <div
        className="form-signup"
        style={{ width: "65%", marginLeft: "8%", marginTop: "19%" }}
      >
        <label>OTP</label>
        <input
          className="input"
          maxLength={6}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <label>Didn’t Receive the Code? Resend</label>

        <button
          className="button"
          style={{ marginTop: "90%" }}
          onClick={handleSignup}
        >
          <Text name="verify_otp" />
        </button>
      </div>
    </>
  );
}
