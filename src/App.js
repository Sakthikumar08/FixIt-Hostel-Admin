import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

import Complaintreport from './components/Complaintreport';
import Analytics from './components/Analytics';

import Login from "./components/Login";
import Laundry from "./components/Laundry";
import './App.css';
import Attendancetake from './components/Attendancetake';
import Instruction from './components/Instruction';
import Roomclean from './components/Roomclean';
import Outing from './components/Outing';

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
            
              <Route path="/complaint-report" onLogout={handleLogout} element={<Complaintreport />} />
              <Route path="/analytics" onLogout={handleLogout} element={<Analytics />} />
             
              <Route path="/laundry" onLogout={handleLogout} element={<Laundry />} />
              <Route path="/attendancetake" onLogout={handleLogout} element={<Attendancetake />} />
              <Route path="/instruction" onLogout={handleLogout} element={<Instruction />} />
              <Route path="/roomclean" onLogout={handleLogout} element={<Roomclean />} />
              <Route path="/outing" onLogout={handleLogout} element={<Outing />} />
              <Route path="/login" onLogout={handleLogout} element={<Login />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
