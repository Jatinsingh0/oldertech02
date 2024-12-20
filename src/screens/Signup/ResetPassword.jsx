import DelayedNavigator from "../../components/DelayedNavigator";
import Text from "../../components/Text";
import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
  });
  return (
    <>
      <h1 className="verify-title">
        <svg
          onClick={() => navigate("/forgot-password")}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5"
            stroke="#1C1C28"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="#1C1C28"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </h1>
      <h1 className="verify-title verified-title"> Request Submitted </h1>
      <p className="verified-title-paragraph">
        <Text name="email_sent" />
      </p>
      <img
        className="signup-verify-png"
        src="/signup-verified.png"
        alt="verified"
      />

      <DelayedNavigator path="/login" delay={2000}>
        <button className="button verified-title-button">Go to Login</button>
      </DelayedNavigator>
    </>
  );
}
