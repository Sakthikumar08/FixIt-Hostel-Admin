import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComplaintboxStyle.css';

const Complaintbox = () => {
  const navigate = useNavigate();

  const complaints = [
    {
        "title": "Room & Infrastructure Issues",
        "description": "Damaged furniture, broken doors, poor ventilation, or structural problems in hostel rooms.",
        "query": ["What is the issue?", "Room/Block number?", "Since when has it been an issue?"]
    },
    {
        "title": "Electrical & Power Issues",
        "description": "Frequent power outages, non-functional lights, faulty charging points, or AC/fan malfunctions.",
        "query": ["What type of electrical issue?", "Room/Block number?", "Is it occurring frequently?"]
    },
    {
        "title": "Water & Sanitation Problems",
        "description": "Leaking pipes, dirty or clogged washrooms, water shortage, or poor drainage system.",
        "query": ["Describe the problem?", "Room/Block number?", "How long has it persisted?"]
    },
    {
        "title": "Internet & Network Connectivity",
        "description": "Weak or no WiFi in hostel rooms, slow speed, or connectivity issues in common areas.",
        "query": ["Nature of the connectivity issue?", "Room/Block/Common Area?", "Is it affecting multiple users?"]
    },
    {
        "title": "Security & Safety Concerns",
        "description": "CCTV not working, broken locks, unauthorized entry, or security personnel issues.",
        "query": ["What is the security concern?", "Location (Room/Block/Common Area)?", "Have you reported it before?"]
    },
    {
        "title": "Mess & Food Complaints",
        "description": "Unhygienic food, lack of variety, quality issues, or improper meal timings.",
        "query": ["What is the issue with the food?", "Which meal was affected?", "Any health concerns due to food quality?"]
    }
];
/* 
  const handleCardClick = (item) => {
    navigate('/complaintform', { state: { complaint: item } });
  }; */
  const handleCardClick = (item) => {
    navigate('/complaintform', { state: { complaintType: item.title } });
  };
  
  return (
    <div className="complaint-box">
      <h2 style={{color:"#4A90E2"}}>Complaint Box</h2>
      <p>Submit your complaints here.</p>
      <div className="card-container">
        {complaints.map((item, index) => (
          <div key={index} className="complaint-card" onClick={() => handleCardClick(item)}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaintbox;
