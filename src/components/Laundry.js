import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./LaundryStyle.css";

const Laundry = () => {
  const [laundryData, setLaundryData] = useState([]);

  useEffect(() => {
    const fetchLaundryData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/laundry");
        setLaundryData(response.data);
      } catch (error) {
        console.error("Error fetching laundry data:", error);
      }
    };

    fetchLaundryData();
  }, []);

  return (
    <div className="laundry-container">
      <h2>Uploaded Laundry Records</h2>
      {laundryData.length === 0 ? (
        <p>No laundry records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>No of Dresses</th>
              <th>Date</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {laundryData.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.year}</td>
                <td>{item.noOfDresses}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  {/* Directly use the image URL from the database */}
                  <img src={item.image} alt="Laundry" width="100" onError={(e) => e.target.src = "/default.jpg"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Laundry;
