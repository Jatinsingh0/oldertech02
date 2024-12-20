// import DelayedNavigator from "../../components/DelayedNavigator";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text";
import SDGDisplay from "../Profile/SDGDisplay";

export default function ImpactDetails() {
  let navigate = useNavigate();
  function handleBack() {
    navigate(-1); // Goes back to the previous page
  }
  return (
    <>
      <div className="transport-header" style={{ zIndex: 100 }}>
        <div
          className="back-btn"
          style={{ marginTop: 12 }}
          onClick={handleBack}
        >
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div className="chat-title">
          <div style={{ marginTop: 10, marginBottom: 2 }}>
            <Text name="previous_year" />
          </div>
        </div>
      </div>

      <div className="sdg-background">
        <div className="sdg-display">
          <SDGDisplay />
        </div>
      </div>
    </>
  );
}
