// import React from 'react'
import { useNavigate } from "react-router-dom";
import "./direction.css";

export default function Direction() {
  let navigate = useNavigate();
  function handleBack() {
    navigate(-1); // Goes back to the previous page
  }

  return (
    <>
      <div className="chat-header">
        <div className="back-btn" onClick={handleBack}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div className="chat-title">
          <div style={{ marginTop: 10, marginBottom: 2 }}>
            {" "}
            ClicRecycle Direction{" "}
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976!2d2.1753135!3d41.386784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Laietana+48a%2C+Barcelona!5e0!3m2!1sen!2sES!4v1700220735000"
        style={{
          position: "absolute",
          top: "14%",
          left: "0%",
          width: "100%",
          height: "100%",
        }}
        loading="lazy"
        title="Google Maps"
        frameBorder="0"
      />
    </>
  );
}
