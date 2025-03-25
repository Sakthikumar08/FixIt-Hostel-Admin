import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Complaintbox from './components/Complaintbox';
import Complaintreport from './components/Complaintreport';
import Analytics from './components/Analytics';
import Complaintform from './components/Complaintform';
import Login from "./components/Login";
import Laundry from "./components/Laundry";
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <Router>
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <div className="app-container">
          <Navbar onLogout={handleLogout}  />
          <div className="main-content">
            <Routes>
              <Route path="/" onLogout={handleLogout} element={<Home />} />
              <Route path="/complaint-box" onLogout={handleLogout} element={<Complaintbox />} />
              <Route path="/complaint-report" onLogout={handleLogout} element={<Complaintreport />} />
              <Route path="/analytics" onLogout={handleLogout} element={<Analytics />} />
              <Route path="/complaintform" onLogout={handleLogout} element={<Complaintform />} />
              <Route path="/laundry" onLogout={handleLogout} element={<Laundry />} />
              <Route path="/login" onLogout={handleLogout} element={<Login />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
