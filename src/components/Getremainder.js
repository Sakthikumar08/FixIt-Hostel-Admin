import React, { useEffect, useState } from 'react';
import './GetremainderStyle.css'; // Import the new CSS file

const Getremainder = () => {
  const API_URL = "https://fixit-hostel-backend.onrender.com";
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingComplaints = async () => {
      try {
        const response = await fetch(`${API_URL}/api/complaints`);
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        const data = await response.json();

        // Get today's date and subtract 2 days
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        // Filter complaints that are still pending after 2 days
        const overdueComplaints = data.filter((complaint) => {
          const complaintDate = new Date(complaint.date);
          return complaint.status === 'Pending' && complaintDate <= twoDaysAgo;
        });

        setPendingComplaints(overdueComplaints);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Unable to fetch complaints. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingComplaints();
  }, []);

  if (loading) {
    return <p className="remainder-loading">Loading...</p>;
  }

  if (error) {
    return <p className="remainder-error">{error}</p>;
  }

  return (
    <div className="remainder-container">
      <h2 className="remainder-title">Pending Complaints (Overdue by 2+ Days)</h2>
      {pendingComplaints.length === 0 ? (
        <p className="remainder-no-data">No overdue complaints found.</p>
      ) : (
        <table className="remainder-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Room Number</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {pendingComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.name}</td>
                <td>{complaint.email}</td>
                <td>{complaint.department}</td>
                <td>{complaint.roomNumber}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                <td>{complaint.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Getremainder;
