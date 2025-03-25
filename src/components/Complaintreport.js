import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplaintreportStyle.css';

const Complaintreport = () => {
  const [complaints, setComplaints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdates, setStatusUpdates] = useState({});
  const [amountUpdates, setAmountUpdates] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/complaints');
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        const data = await response.json();

        // Group complaints by type
        const groupedComplaints = data.reduce((acc, complaint) => {
          const { complaintType } = complaint;
          if (!acc[complaintType]) {
            acc[complaintType] = [];
          }
          acc[complaintType].push(complaint);
          return acc;
        }, {});

        setComplaints(groupedComplaints);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Unable to fetch complaints. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleUpdate = async (id) => {
    // Preserve the existing values if not explicitly changed
    const currentComplaint = Object.values(complaints).flat().find(c => c._id === id);
    
    const updatedStatus = statusUpdates[id] ?? currentComplaint.status;
    const updatedAmount = amountUpdates[id] ?? currentComplaint.amountSpent;
  
    try {
      const response = await axios.put(`http://localhost:5000/api/complaints/${id}`, {
        status: updatedStatus,
        amountSpent: updatedAmount,
      });
  
      if (response.status === 200) {
        alert('Complaint updated successfully!');
  
        // ✅ Update state while preserving values
        setComplaints((prevComplaints) => {
          const updatedComplaints = { ...prevComplaints };
          Object.keys(updatedComplaints).forEach((type) => {
            updatedComplaints[type] = updatedComplaints[type].map((complaint) =>
              complaint._id === id
                ? { ...complaint, status: updatedStatus, amountSpent: updatedAmount }
                : complaint
            );
          });
          return updatedComplaints;
        });
  
        // ✅ Keep the input values until explicitly changed
        setStatusUpdates((prev) => ({ ...prev, [id]: updatedStatus }));
        setAmountUpdates((prev) => ({ ...prev, [id]: updatedAmount }));
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert('Failed to update complaint. Please try again.');
    }
  };
  
  if (loading) {
    return <p>Loading complaints...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Complaint Report</h2>
      {Object.keys(complaints).length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        Object.entries(complaints).map(([type, complaintsList]) => (
          <div key={type} className="complaint-box">
            <h3>{type}</h3>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Room Number</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Amount Spent</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
  {complaintsList.map((complaint) => {
    const statusColor = complaint.status === "Pending" 
      ? "lightcoral" 
      : complaint.status === "Updated" 
      ? "yellow" 
      : "lightgreen";

    return (
      <tr key={complaint._id} style={{ backgroundColor: statusColor }}>
        <td>{complaint.name}</td>
        <td>{complaint.email}</td>
        <td>{complaint.department}</td>
        <td>{complaint.roomNumber}</td>
        <td>{new Date(complaint.date).toLocaleDateString()}</td>
        <td>{complaint.description}</td>
        <td>
          <select
            value={statusUpdates[complaint._id] || complaint.status}
            onChange={(e) =>
              setStatusUpdates({
                ...statusUpdates,
                [complaint._id]: e.target.value,
              })
            }
          >
            <option value="Pending">Pending</option>
            <option value="Updated">Updated</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            placeholder="Enter Amount"
            value={amountUpdates[complaint._id] ?? (complaint.amountSpent !== undefined ? complaint.amountSpent : '')}
            onChange={(e) =>
              setAmountUpdates({
                ...amountUpdates,
                [complaint._id]: e.target.value,
              })
            }
          />
        </td>
        <td>
          <button onClick={() => handleUpdate(complaint._id)}>Submit</button>
        </td>
      </tr>
    );
  })}
</tbody>

            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Complaintreport;