import Cookies from "js-cookie";
import "./transport.css";
import { useNavigate } from "react-router-dom";
import DelayedNavigator from "../../components/DelayedNavigator";
import { useState, useEffect } from "react";
import axios from "axios";
import StatusComponent from "./StatusComponent";
import { PORT } from "../../config/server";

export default function Trasnsport() {
  let navigate = useNavigate();

  const [bags, setBags] = useState("");
  const [orderStatus, setOrderStatus] = useState("processing");
  const [date, setDate] = useState("");

  // Extract data from cookie
  const profileData = JSON.parse(Cookies.get("profileData") || "{}");

  const handleSelectChange = (event) => {
    // setOrderStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    // Prepare the data from the form and the cookie
    const data = {
      name: profileData.name,
      email: profileData.email,
      salonName: profileData.salonName,
      subscription: profileData.plans,
      city: profileData.city,
      address: profileData.address,
      phone: profileData.phone,
      bags: form.elements[0].value, // Assuming the first input is for bags
      orderStatus: orderStatus,
      date: form.elements[2].value, // Assuming the third input is for date
    };

    // Submit the data via POST request
    try {
      const response = await axios.post(
        `${PORT}/api/plan/api/deliveries`,
        data
      );
      console.log("Submission successful", response.data);
      window.location.reload();

      // Handle success (e.g., showing a success message)
    } catch (error) {
      console.error("Submission failed", error);
      // Handle error (e.g., showing an error message)
    }
  };

  function handleBack() {
    navigate(-1); // Goes back to the previous page
  }
  const subscribe = Cookies.get("subscribe") || "false";
  const [selection, setSelection] = useState("");
  const [images, setImages] = useState([]);

  // Read from cookie on initial load
  useEffect(() => {
    const storedImages = Cookies.get("images");
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  if (subscribe === "false") {
    return (
      <>
        <div className="transport-header">
          <div
            className="back-btn"
            style={{ marginTop: 6 }}
            onClick={handleBack}
          >
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
          <div className="chat-title">
            <div style={{ marginTop: 10, marginBottom: 2 }}>Transport</div>
          </div>
        </div>

        <div className="form-transport" style={{ paddingTop: 164 }}>
          <form onSubmit={handleSubmit}>
            <label>We are using DHL for sending and receiving bags</label>
            <input
              type="number"
              placeholder="How many bags?"
              value={bags}
              onChange={(e) => setBags(e.target.value)}
              required
            />
            <select onChange={handleSelectChange}>
              <option value="">Select an option</option>
              <option value="I want Recruption">I want Recruption</option>
              <option value="I want a Extra Bag">I want a Extra Bag</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
          <div
            className="status-order"
            style={{ paddingLeft: 23, paddingRight: 23 }}
          >
            <h2>Status</h2>
            <StatusComponent />
          </div>

          {/* <div className="status-order">
  <h2>Status</h2>



  {images.map((imgSrc, index) => (
          <img key={index} style={{height: "auto", width: 313}} src={imgSrc} alt="Bag" />
        ))} 
</div> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="transport-header">
          <div className="back-btn" onClick={handleBack}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
          <div className="chat-title">
            <div style={{ marginTop: 10, marginBottom: 2 }}>Transport</div>
          </div>
        </div>

        <div
          className="trsd"
          style={{
            paddingTop: 164,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{ height: "auto", width: 123 }} src="/logo512.png" />

          <h2 style={{ textAlign: "center", fontSize: 16 }}>
            Currently, we are in the process of reviewing your profile.
          </h2>

          <DelayedNavigator path="/profile/settings/subscription" delay={2000}>
            {/* <button>Buy a Plan</button> */}
          </DelayedNavigator>
        </div>
      </>
    );
  }
}
