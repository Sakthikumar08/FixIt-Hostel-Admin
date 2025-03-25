import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ComplaintboxStyle.css';

const Complaintform = () => {
  const location = useLocation();
  const navigate = useNavigate();
 /*  const complaintType = location.state?.type || 'General Complaint'; */
 const complaintType = location.state?.complaintType || 'General Complaint';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    roomNumber: '',
    date: '',
    description: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, complaintType }),
      });

      if (response.ok) {
        alert('Complaint submitted successfully!');
        navigate('/'); // Redirect after successful submission
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="complaint-form-container">
      <h2>Submit Complaint - {complaintType}</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="Enter your department"
          />
        </div>

        <div className="form-group">
          <label>Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
            placeholder="Enter the room number"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Complaint Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe your issue in detail"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default Complaintform;
