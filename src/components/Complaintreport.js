import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Complaintreport = () => {
  const API_URL = "https://fixit-hostel-backend.onrender.com";
  const [complaints, setComplaints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdates, setStatusUpdates] = useState({});
  const [amountUpdates, setAmountUpdates] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`${API_URL}/api/complaints`);
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        const data = await response.json();

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
    const currentComplaint = Object.values(complaints).flat().find(c => c._id === id);
    const updatedStatus = statusUpdates[id] ?? currentComplaint.status;
    const updatedAmount = amountUpdates[id] ?? currentComplaint.amountSpent;

    try {
      const response = await axios.put(`${API_URL}/api/complaints/${id}`, {
        status: updatedStatus,
        amountSpent: updatedAmount,
      });

      if (response.status === 200) {
        alert('Complaint updated successfully!');

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
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert('Failed to update complaint. Please try again.');
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading complaints...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-blue-100 to-blue-200">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Complaint Report</h2>
      {Object.keys(complaints).length === 0 ? (
        <p className="text-center text-gray-600">No complaints found.</p>
      ) : (
        Object.entries(complaints).map(([type, complaintsList]) => (
          <div key={type} className="mb-12 shadow-lg rounded-lg overflow-hidden">
            <h3 className="bg-blue-950 text-white text-xl font-semibold p-4">{type}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4">Name</th>
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
                    const statusColor =
                      complaint.status === 'Pending'
                        ? 'bg-red-200'
                        : complaint.status === 'Updated'
                        ? 'bg-yellow-200'
                        : 'bg-green-200';

                    return (
                      <tr key={complaint._id} className={`border-b ${statusColor}`}>
                        <td className="p-4">{complaint.name}</td>
                        <td>{complaint.email}</td>
                        <td>{complaint.department}</td>
                        <td>{complaint.roomNumber}</td>
                        <td>{new Date(complaint.date).toLocaleDateString()}</td>
                        <td>{complaint.description}</td>
                        <td>
                          <select
                            value={statusUpdates[complaint._id] || complaint.status}
                            onChange={(e) =>
                              setStatusUpdates((prev) => ({
                                ...prev,
                                [complaint._id]: e.target.value,
                              }))
                            }
                            className="p-2 border rounded"
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
                            value={amountUpdates[complaint._id] ?? (complaint.amountSpent || '')}
                            onChange={(e) =>
                              setAmountUpdates((prev) => ({
                                ...prev,
                                [complaint._id]: e.target.value,
                              }))
                            }
                            className="p-2 border rounded"
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => handleUpdate(complaint._id)}
                            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Complaintreport;
