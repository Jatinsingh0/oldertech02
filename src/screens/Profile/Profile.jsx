import React from 'react';
import './profile.css'; // Plain CSS file

const Profile = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header-container">
  <header className="header">
    <div className="location">
      <span>Location</span>
      <p>New York, USA</p>
    </div>
    <div className="profile">
      <p>Good Morning!</p>
      <h2>John Appleseed</h2>
    </div>
  </header>
  <div className="header-icons">
    <img src="/bell.svg" alt="Notification Icon" className="bellicon" />
    <img src="/dots.svg" alt="Settings Icon" className="dotsicon" />
  </div>
</div>



      {/* Booking Card */}
      <div className="booking-image-container">
        <img src="/book.svg" alt="Booking Section" className="booking-image" />
      </div>

      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Doctors"
          className="search-input"
        />
        <button className="search-icon-btn">
        <img src="/search.png" alt="search" />
        </button>
      </div>

      {/* Recommended Specialists */}
      <section className="specialists-section">
  <h3>Recommended Specialists</h3>
  <div className="specialists-list">
    <div className="specialist-card">
      <img src="/julie.svg" alt="Specialist" />
    </div>
    <div className="specialist-card">
      <img src="ananya.svg" alt="Specialist" />
    </div>
    <div className="specialist-card">
      <img src="henry.svg" alt="Specialist" />
    </div>
  </div>
</section>


      {/* Hospitals Near You */}
      <section className="hospitals-section">
        <h3>Hospitals near you</h3>
        <div className="hospitals-list">
          <div className="hospital-card"><img src="/clinic.svg" alt="Specialist" /></div>
          <div className="hospital-card"><img src="/colombo.svg" alt="Specialist" /></div>
          <div className="hospital-card"><img src="/hmh.svg" alt="Specialist" /></div>
        </div>
      </section>

      {/* Upcoming Bookings */}
      <section className="bookings-section">
  <h3>Upcoming Bookings</h3>
  <div className="booking-details">
    <div className="booking-imag">
      <img src="/ananya.svg" alt="Booking Image" />
    </div>
    <div className="booking-text">
      <p className="ques">Appointment Number</p>
      <p className="ans">ML34567</p>
      <p className="ques">Appointment Details</p>
      <p className="ans">12/07/2023</p>
      <p className="ans">From: 4:30 PM to 5:30 PM</p>
      <p className="ans">At: AR Clinic</p>
      <div className="booking-actions">
        <button className="call-btn">Call Now</button>
        <button className="chat-btn">Chat Now</button>
      </div>
    </div>
  </div>
</section>




      {/* Navigation */}
      <footer className="footer">
  <div className="nav-item">
    <img src="home.svg" alt="Home" />
  </div>
  <div className="nav-item">
    <img src="calender.svg" alt="Calendar" />
  </div>
  <div className="nav-item">
    <img src="add.svg" alt="Add" />
  </div>
  <div className="nav-item">
    <img src="comments.svg" alt="comments" />
  </div>
  <div className="nav-item">
    <img src="profile.svg" alt="Profile" />
  </div>
</footer>

    </div>
  );
};

export default Profile;
