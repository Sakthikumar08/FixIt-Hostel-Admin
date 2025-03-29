import React, { useEffect, useState } from "react";
import { CheckCircle, RefreshCcw, AlertCircle } from "lucide-react";

const ComplaintCards = () => {
  const API_URL = "https://fixit-hostel-backend.onrender.com";
  const [complaintData, setComplaintData] = useState([]);

  useEffect(() => {
    const fetchComplaintStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/complaints/statsByType`); 
        const data = await response.json();
        setComplaintData(data);
      } catch (error) {
        console.error("Error fetching complaint data:", error);
      }
    };

    fetchComplaintStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {complaintData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">{item._id}</h2>
          <p className="text-gray-600 mb-4">Statistics for {item._id} complaints</p>

          <div className="flex flex-wrap justify-between gap-3">
            {/* Raised Complaints */}
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle size={18} />
              <span>Raised: {item.raised}</span>
            </div>

            {/* Updated Complaints */}
            <div className="flex items-center gap-2 text-yellow-500">
              <RefreshCcw size={18} />
              <span>Updated: {item.updated}</span>
            </div>

            {/* Completed Complaints */}
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle size={18} />
              <span>Completed: {item.completed}</span>
            </div>

            {/* Total Amount Spent */}
            <div className="text-blue-500 font-bold text-lg">
              Total Amount Spent: ₹{(item.totalAmountSpent ?? 0).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintCards;
