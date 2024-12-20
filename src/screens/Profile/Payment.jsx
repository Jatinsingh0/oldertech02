// import Cookies from 'js-cookie';
import "./payment.css";
import { useState } from "react";

export default function Payment() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    if (
      cardHolderName === "TEST" &&
      cardNumber === "4548810000000003" &&
      expiryDate === "12/23" &&
      cvv === "123"
    ) {
      // alert("Payment Success");
      // Cookies.set("subscribe", "true");
      window.location.href = "/profile/pay/verify";
    } else {
      alert("Payment Failed");
    }
  };

  return (
    <div className="wrapper">
      <div className="payment">
        <h1 style={{ textAlign: "center" }}>ClicRecycle</h1>
        <h2>Pay: €120</h2>
        <div className="form">
          <div className="card space icon-relative">
            <label className="label">Card holder:</label>
            <input
              type="text"
              className="input"
              placeholder="Card holder name"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
            <i className="fas fa-user"></i>
          </div>
          <div className="card space icon-relative">
            <label className="label">Card number:</label>
            <input
              type="text"
              className="input"
              data-mask="0000 0000 0000 0000"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
            />
            <i className="far fa-credit-card"></i>
          </div>
          <div className="card-grp space">
            <div className="card-item icon-relative">
              <label className="label">Expiry date:</label>
              <input
                type="text"
                name="expiry-data"
                className="input"
                placeholder="00 / 00"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <i className="far fa-calendar-alt"></i>
            </div>
            <div className="card-item icon-relative">
              <label className="label">CVC:</label>
              <input
                type="text"
                className="input"
                data-mask="000"
                placeholder="000"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          <div className="btn" onClick={handlePayment}>
            Pay
          </div>
        </div>
      </div>
    </div>
  );
}
