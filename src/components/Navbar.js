import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarStyle.css';

const Navbar = ({ onLogout }) => {  // ✅ Accept onLogout as a prop
  const navigate = useNavigate();

  const handleLogout = () => {  
    localStorage.removeItem("user"); // ✅ Clear user data
    onLogout(); // ✅ Call the logout function from App.js
    navigate('/login'); // ✅ Redirect to login page
  };

  return (
    <div className="navbar">
      <h2 className="logo">Smart Management System</h2>
      <nav>
        <button onClick={() => navigate('/')}>Home</button>
       {/*  <button onClick={() => navigate('/complaint-box')}>Complaint Box</button> */}
        <button onClick={() => navigate('/complaint-report')}>Complaint Report</button>
        <button onClick={() => navigate('/analytics')}>Analytics</button>
        <button onClick={() => navigate('/laundry')}>Laundry</button>
        <button onClick={handleLogout}>Log Out</button>
      </nav>
    </div>
  );
};

export default Navbar;
