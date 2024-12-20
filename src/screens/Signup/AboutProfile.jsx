import { Link } from "react-router-dom";
import DelayedNavigator from "../../components/DelayedNavigator";
import "./signup.css";
import { useState } from "react";
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom";

export default function AboutProfile() {
  let navigate = useNavigate();

  function handleBack() {
    navigate(-1); // Goes back to the previous page
  }

  const [formData, setFormData] = useState({
    phone: "",
  });

  return (
    <>
      <div className="chat-header" style={{ marginTop: "-6%" }}>
        <div className="back-btn" onClick={handleBack}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div className="chat-title">
          <div style={{ marginTop: 7, marginBottom: 2, fontSize: 19 }}>
            <Text name="about" />
          </div>
        </div>
      </div>
      <h1 className="verify-title"></h1>
      <div
        className="form-signup"
        style={{ width: "65%", marginLeft: "8%", paddingTop: "24%" }}
      >
        <Link
          style={{ color: "#000", textDecoration: "none" }}
          to="https://www.clicrecycle.net/en/terminos-y-condiciones/"
          delay={2000}
        >
          <h2 className="verify-title-sub">
            <Text name="terms_condition" />
          </h2>
        </Link>

        <Link
          style={{ color: "#000", textDecoration: "none" }}
          to="https://www.clicrecycle.net/en/politica-de-privacidad/"
          delay={2000}
        >
          <h2 className="verify-title-sub">
            <Text name="privacy_policy" />
          </h2>
        </Link>

        <DelayedNavigator path="" delay={2000}>
          <h2 className="verify-title-sub">
            <Text name="licences" />
          </h2>
        </DelayedNavigator>
      </div>
    </>
  );
}
