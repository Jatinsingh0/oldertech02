import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { PORT } from "../../config/server";

const StatusComponent = () => {
  const [deliveries, setDeliveries] = useState([]);
  const profileData = JSON.parse(Cookies.get("profileData") || "{}");

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        // Fetch all deliveries
        const response = await axios.post(
          `${PORT}/api/plan/api/deliveries/all`
        );
        // Filter deliveries by email

        const filteredDeliveries = response.data.filter(
          (delivery) => delivery.email === profileData.email
        );
        setDeliveries(filteredDeliveries);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
        // Handle error
      }
    };

    fetchDeliveries();
  }, []); // The empty array means this effect runs once on mount

  return (
    <div className="status-container">
      {deliveries.map((delivery, index) => (
        <div
          key={index}
          className="status-content"
          style={{ marginTop: 23, marginBottom: 23 }}
        >
          <img
            src={
              profileData.type === "loreal"
                ? "/loreal-bag-image.png"
                : "/normal-bag-image.png"
            }
            alt="Bag"
            className="status-image"
          />
          <div className="status-text">
            <p>Transport Request raised for {delivery.salonName}</p>
            <p>
              Status:{" "}
              <span
                className="status-progressing"
                style={{
                  color:
                    delivery.orderStatus === "completed"
                      ? "green"
                      : delivery.orderStatus === "in-process"
                      ? "yellow"
                      : delivery.orderStatus === "cancelled"
                      ? "red"
                      : "orange",
                }}
              >
                {delivery.orderStatus || "Progressing"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusComponent;
