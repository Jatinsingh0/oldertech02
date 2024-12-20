import "./events.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../config/server";

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(`${PORT}/api/plan/events/all`);
        const formattedEvents = response.data.map((event) => ({
          name: event.name,
          image: event.image, // Assuming 'photo' URL is directly usable as 'image'
          location: event.location,
          photo: event.photo, // Duplicate for consistency with your example
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return events;
};

const EventsCard = () => {
  const events = useFetchEvents();

  // Conditional rendering to ensure data is loaded
  if (events.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {events?.map((event, index) => (
        <div key={index} className="dual-card">
          <div
            className="event-card"
            onClick={() => (window.location.href = `${event.photo}`)}
          >
            <div
              className="event-card-image"
              style={{ backgroundImage: `url(${event.image})` }}
            ></div>
            <div className="event-card-title">{event.name}</div>
            <div className="event-card-location">{event.location}</div>
            {/* <div className="event-card-status">Upcoming </div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default function Events() {
  let navigate = useNavigate();
  function handleBack() {
    navigate(-1); // Goes back to the previous page
  }

  return (
    <>
      {/* Header */}

      <div className="events-header">
        <div className="back-btn" onClick={handleBack}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div className="events-title">ClicRecycle Events</div>
        <div className="settings"></div>
      </div>
      <div className="events-container">{EventsCard()}</div>
    </>
  );
}
