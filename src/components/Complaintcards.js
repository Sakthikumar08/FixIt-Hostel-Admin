import React, { useEffect, useState } from "react";
import "./ComplaintcardStyle.css";
import { CheckCircle, RefreshCcw, AlertCircle, DollarSign } from "lucide-react";

const ComplaintCards = () => {
  const [complaintData, setComplaintData] = useState([]);

  useEffect(() => {
    const fetchComplaintStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints/statsByType"); // API URL
        const data = await response.json();
        setComplaintData(data);
      } catch (error) {
        console.error("Error fetching complaint data:", error);
      }
    };

    fetchComplaintStats();
  }, []);

  return (
    <div className="complaint-container">
      {complaintData.map((item, index) => (
        <div key={index} className="complaint-card">
          <h2>{item._id}</h2> {/* Complaint Type */}
          <p>Statistics for {item._id} complaints</p>

          <div className="status-info">
            <div className="status-badge raised">
              <AlertCircle size={16} />
              <span>Raised: {item.raised}</span>
            </div>
            <div className="status-badge updated">
              <RefreshCcw size={16} />
              <span>Updated: {item.updated}</span>
            </div>
            <div className="status-badge completed">
              <CheckCircle size={16} />
              <span>Completed: {item.completed}</span>
            </div>
            <div className="status-badge amount-spent">
             
              <span style={{color:"#4A90E2",fontSize:"1.2rem",fontWeight:"bold"}}>Total Amount Spent: ₹{(item.totalAmountSpent ?? 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintCards;
