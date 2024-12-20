// import  { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Esign() {
  let navigate = useNavigate();
  function handleBack() {
    navigate(-1); // Goes back to the previous page
  }

  return (
    <div>
      <div className="chat-header">
        <div className="back-btn" onClick={handleBack}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div className="chat-title">
          <div style={{ marginTop: 10, marginBottom: 2 }}>
            ClicRecycle Contract{" "}
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 93 }}>
        <img style={{ height: "auto", width: 383 }} src="/contract-1.jpg" />
        <img style={{ height: "auto", width: 383 }} src="/contract-2.jpg" />
        <img style={{ height: "auto", width: 383 }} src="/contract-3.jpg" />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 12,
          marginBottom: 14,
          alignItems: "center",
        }}
      >
        <button
          style={{ width: 232 }}
          onClick={() => (window.location.href = "/profile/payment-mode")}
        >
          E-sign the contract
        </button>
      </div>
    </div>
  );
}
