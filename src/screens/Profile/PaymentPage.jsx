import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
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
            Choose Payment Mode
          </div>
        </div>
      </div>

      <div
        className="payment-options"
        style={{
          position: "absolute",
          width: "98vw",
          marginTop: "26%",
          marginLeft: 4,
        }}
      >
        <div
          className="option-1"
          onClick={() => (window.location.href = "/profile/pay")}
        >
          <i className="fa fa-credit-card" aria-hidden="true"></i> Credit &
          Debit Card
        </div>
        <div className="option-2">
          <i className="fa fa-university" aria-hidden="true"></i> Bank Transfer
        </div>
        <div className="option-3">
          <i className="fa fa-sitemap" aria-hidden="true"></i> Direct Debit
        </div>
        <div
          className="option-3"
          onClick={() =>
            (window.location.href = "https://es.social-commerce.io/hs4wdG")
          }
        >
          <i className="fa fa-link" aria-hidden="true"></i> Link to Pay
        </div>
      </div>
    </>
  );
}
