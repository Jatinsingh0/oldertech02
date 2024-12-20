import Cookies from "js-cookie";
import "./loding.css";
import { useState } from "react";

export default function SubcriptionOTP() {
  const [otp, setOtp] = useState("");

  const handleOTPChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp === "123456") {
      alert("Payment Success");
      Cookies.set("subscribe", "true");
      window.location.href = "/profile/settings/subscription";
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontFamily: "DM Sans" }}>Verify OTP</h2>

      <div className="loadingio-spinner-rolling-wn3ubgnvejk">
        <div className="ldio-8iztolaa0e9">
          <div></div>
        </div>
      </div>

      <form className="form-signup" onSubmit={handleSubmit}>
        <input
          style={{ width: 189 }}
          className="input"
          placeholder="OTP"
          value={otp}
          onChange={handleOTPChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
