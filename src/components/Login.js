import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";

const Login = ({ onLogin }) => {
  const [empid, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empid || !password) {
      setError("Please enter both Employee ID and Password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empid, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("admin", JSON.stringify(data.admin)); // Store admin in localStorage
      onLogin(); // Update authentication state in App.js
      navigate("/"); // Redirect to home after login
    } catch (error) {
      setError("Login failed. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              className="input-field"
              value={empid}
              placeholder="Enter Employee ID"
              onChange={(e) => setEmpId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
     
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
