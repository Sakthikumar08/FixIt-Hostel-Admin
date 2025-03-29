import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./GetuserdetailStyle.css";

const GetAdminDetail = () => {
  const API_URL = "https://fixit-hostel-backend.onrender.com";
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from local storage
      if (!token) {
        setError("Unauthorized: No token provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/admin/details`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token for authentication
          },
        });
        setAdmin(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching admin details");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  if (loading) return <div className="loading">Loading admin details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-detail-container">
      <h2>Admin Details</h2>
      {admin ? (
        <div className="admin-card">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Employee ID:</strong> {admin.empid}</p>
          <p><strong>Department:</strong> {admin.department}</p>
          <p><strong>Hostel:</strong> {admin.hostel}</p>
        </div>
      ) : (
        <p className="error">Admin not found</p>
      )}
    </div>
  );
};

export default GetAdminDetail;
