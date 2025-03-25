import React from 'react';
import './HomeStyle.css';
import ComplaintCards from './Complaintcards';
import Roomcleanreport from './Roomcleanreport';
import Getuserdetail from './Getuserdetail';
import Getremainder from './Getremainder';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="main-heading">FixIt Hostel - Admin</h1>
      <p className="sub-heading">
        Efficiently manage hostel facilities, track maintenance, and ensure a safe environment. <br />
        Stay informed with real-time updates and feedback for continuous improvements.
      </p>
      <Getremainder />
      
      <div className="content-wrapper">
        <div className="complaint-section">
          <ComplaintCards />
        </div>
        <div className="cards-container">
          {/* <Roomcleanreport /> */}
          <div className="card">
            <h2>Mess Feedback - Today</h2>
            <p><strong>Breakfast:</strong> 4.2 ★ - "Good variety and taste"</p>
            <p><strong>Lunch:</strong> 3.8 ★ - "Needs better spice balance"</p>
            <p><strong>Dinner:</strong> 4.5 ★ - "Excellent quality and serving"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
