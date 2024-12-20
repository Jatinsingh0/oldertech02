import DelayedNavigator from "../../components/DelayedNavigator";
import Text from "../../components/Text";
import "./signup.css";
import { useState } from "react";
export default function VerifiedOTP() {
  const [formData, setFormData] = useState({
    phone: "",
  });
  return (
    <>
      <h1
        onClick={() => {
          window.location.href = "/signup/next";
        }}
        className="verify-title verified-title"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="back-arrow"
          style={{ position: "absolute", left: 0, marginLeft: 23 }}
        >
          <svg
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
        </div>{" "}
        Account verified{" "}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 42,
        }}
      >
        <img
          style={{ width: 150, height: "auto" }}
          className="signup-verify-png"
          src="/logo512.png"
          alt="verified"
        />
      </div>

      <p className="verified-title-paragraph">
        <Text name="Your_account_has_been_verified" />
      </p>

      <DelayedNavigator path="/login" delay={2000}>
        <button className="button verified-title-button">Go to Login</button>
      </DelayedNavigator>
    </>
  );
}
