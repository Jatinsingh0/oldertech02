import Cookies from "js-cookie";
import DelayedNavigator from "../../components/DelayedNavigator";
import "./subscription.css";
import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const navigate = useNavigate();
  const subscribe = Cookies.get("subscribe");
  return (
    <>
      <div className="subscription-card">
        <div className="subscription-header">
          <DelayedNavigator path="/profile/settings" color="#fff" delay={2000}>
            <svg
              style={{
                position: "absolute",
                left: 0,
                marginLeft: 23,
                marginTop: -32,
              }}
              width="27"
              height="22"
              viewBox="0 0 27 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4735 21L1 11M1 11L10.4735 0.999998M1 11L27 11"
                stroke="white"
                stroke-width="2"
                strokeLinejoin="round"
              />
            </svg>
          </DelayedNavigator>

          <img src="/logo512.png" alt="Clic Recycle Logo" />
        </div>
        <div className="subscription-body">
          <h2>{subscribe === "true" ? "Subscribed" : "Subscription"}</h2>
          <div className="subscription-detail">
            <span>Transport</span>
            <span>Yes</span>
          </div>
          <div className="subscription-detail">
            <span>Plan</span>
            <span>Amount - €120</span>
          </div>
          <div className="subscription-detail">
            <span>Begins</span>
            <span>22-Nov-2023</span>
          </div>
          <div className="subscription-detail">
            <span>Ends</span>
            <span>22-Nov-2024</span>
          </div>
          <div className="subscription-inclusions">
            <h3>Formula Include</h3>
            <ul>
              <li>8 bolsas de tamaño grande para poner el pelo</li>
              <li>
                Su vinilo Clic Recycle para compartir su compromiso como miembro
                de la comunidad
              </li>
              <li>Su certificado y membresía de la comunidad.</li>
              <li>
                Nuestro informe de impacto anual como profesional involucrado en
                los ODS del medio ambiente, comprobante de la reducción de sus
                residuos.
              </li>
              <li>Invitación a nuestro eventos.</li>
              <li>
                Visibilidad de su negocio en nuestras comunicaciones y redes.
              </li>
            </ul>
          </div>
        </div>

        <div className="subscription-footer">
          <button>Cancel</button>
          <button
            onClick={() => {
              navigate("/profile/payment-mode");
            }}
          >
            Renew
          </button>
        </div>
      </div>
    </>
  );
}
