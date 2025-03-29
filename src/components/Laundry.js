import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Laundry = () => {
  const API_URL = "https://fixit-hostel-backend.onrender.com";
  const [laundryData, setLaundryData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');

  useEffect(() => {
    const fetchLaundryData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/laundry`);
        const sortedData = response.data.sort((a, b) => a.year - b.year);
        setLaundryData(sortedData);
      } catch (error) {
        console.error("Error fetching laundry data:", error);
      }
    };

    fetchLaundryData();
  }, []);

  const groupedByYear = laundryData.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {});

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredYears = selectedYear === 'All' ? Object.keys(groupedByYear) : [selectedYear];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Laundry Records</h2>

      <div className="flex justify-center mb-8">
        <label htmlFor="year" className="mr-4 text-gray-700">Filter by Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="p-2 border rounded-lg"
        >
          <option value="All">All</option>
          {Object.keys(groupedByYear).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {laundryData.length === 0 ? (
        <p className="text-center text-gray-600">No laundry records found.</p>
      ) : (
        filteredYears.map((year) => (
          <div key={year} className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Year: {year}</h3>

            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">No. of Dresses</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedByYear[year].map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="py-3 px-4 text-gray-700">{item.name}</td>
                      <td className="py-3 px-4 text-gray-700">{item.department}</td>
                      <td className="py-3 px-4 text-gray-700">{item.noOfDresses}</td>
                      <td className="py-3 px-4 text-gray-700">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <img
                          src={item.image}
                          alt="Laundry"
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => (e.target.src = "/default.jpg")}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Laundry;
