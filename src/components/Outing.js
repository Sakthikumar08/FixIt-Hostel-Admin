import React, { useState } from 'react';

const Outing = () => {
  const [outpasses, setOutpasses] = useState([
    { id: 1, name: 'Adithya', year: 1, reason: 'Medical Checkup', status: 'Pending', outingDate: '2024-03-01', outingTime: '10:00 AM', returnDate: '2024-03-02' },
    { id: 2, name: 'Madhan', year: 2, reason: 'Family Function', status: 'Pending', outingDate: '2024-03-05', outingTime: '09:30 AM', returnDate: '2024-03-06' },
    { id: 3, name: 'Keerthana', year: 3, reason: 'Personal Emergency', status: 'Pending', outingDate: '2024-03-10', outingTime: '02:00 PM', returnDate: '2024-03-11' },
    { id: 4, name: 'Chandran', year: 4, reason: 'Seminar Presentation', status: 'Pending', outingDate: '2024-03-12', outingTime: '08:00 AM', returnDate: '2024-03-13' },
    { id: 5, name: 'Anupama', year: 1, reason: 'Doctor Appointment', status: 'Pending', outingDate: '2024-03-15', outingTime: '11:00 AM', returnDate: '2024-03-16' },
    { id: 6, name: 'Saravanan', year: 2, reason: 'Sports Event', status: 'Pending', outingDate: '2024-03-18', outingTime: '07:30 AM', returnDate: '2024-03-19' },
    { id: 7, name: 'Vikram', year: 3, reason: 'Home Visit', status: 'Pending', outingDate: '2024-03-20', outingTime: '05:00 PM', returnDate: '2024-03-22' },
    { id: 8, name: 'Priya', year: 4, reason: 'Conference', status: 'Pending', outingDate: '2024-03-23', outingTime: '06:45 AM', returnDate: '2024-03-24' },
    { id: 9, name: 'Ramesh', year: 1, reason: 'Workshop', status: 'Pending', outingDate: '2024-03-25', outingTime: '09:00 AM', returnDate: '2024-03-26' },
    { id: 10, name: 'Kavya', year: 2, reason: 'Vacation', status: 'Pending', outingDate: '2024-03-28', outingTime: '04:15 PM', returnDate: '2024-04-02' },
    { id: 11, name: 'Surya', year: 3, reason: 'Internship', status: 'Pending', outingDate: '2024-04-05', outingTime: '01:30 PM', returnDate: '2024-04-10' },
    { id: 12, name: 'Divya', year: 4, reason: 'Exam Preparation', status: 'Pending', outingDate: '2024-04-08', outingTime: '10:45 AM', returnDate: '2024-04-09' },
    { id: 13, name: 'Vishnu', year: 1, reason: 'Project Work', status: 'Pending', outingDate: '2024-04-11', outingTime: '08:30 AM', returnDate: '2024-04-12' },
    { id: 14, name: 'Meera', year: 2, reason: 'Festival Celebration', status: 'Pending', outingDate: '2024-04-14', outingTime: '07:00 AM', returnDate: '2024-04-16' },
    { id: 15, name: 'Rajesh', year: 3, reason: 'Hackathon', status: 'Pending', outingDate: '2024-04-18', outingTime: '12:00 PM', returnDate: '2024-04-19' },
  ]);

  const [selectedYear, setSelectedYear] = useState(1);

  const handleStatusChange = (id, newStatus) => {
    setOutpasses(outpasses.map(pass =>
      pass.id === id ? { ...pass, status: newStatus } : pass
    ));
    alert(`Outpass ${newStatus} for ID: ${id}`);
  };

  const renderOutpasses = () => (
    outpasses.filter(pass => pass.year === selectedYear).map((pass) => (
      <div key={pass.id} className="border border-gray-300 rounded-lg p-5 mb-4 shadow-sm bg-white">
        <h3 className="text-xl font-semibold mb-2">{pass.name}</h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2">
          <p className="text-gray-600"><strong>Reason:</strong> {pass.reason}</p>
          <p className="text-gray-600"><strong>Status:</strong> 
            <span
              className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${pass.status === 'Pending' ? 'bg-yellow-300 text-yellow-800' : pass.status === 'Approved' ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'}`}
            >
              {pass.status} <i className={pass.status === 'Pending' ? 'fas fa-clock ml-2' : pass.status === 'Approved' ? 'fas fa-check-circle ml-2' : 'fas fa-times-circle ml-2'}></i>
            </span>
          </p>
          <p className="text-gray-600"><strong>Outing Date:</strong> {pass.outingDate}</p>
          <p className="text-gray-600"><strong>Outing Time:</strong> {pass.outingTime}</p>
          <p className="text-gray-600"><strong>Return Date:</strong> {pass.returnDate}</p>
        </div>
        {pass.status === 'Pending' && (
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleStatusChange(pass.id, 'Approved')}
              className="px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            >
              Approve <i className="fas fa-check ml-2"></i>
            </button>
            <button
              onClick={() => handleStatusChange(pass.id, 'Rejected')}
              className="px-6 py-2 text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
            >
              Reject <i className="fas fa-times ml-2"></i>
            </button>
          </div>
        )}
      </div>
    ))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-8">
      <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-16">Student Outpass Requests</h1>

      <div className="mb-8 text-center">
        <label htmlFor="year" className="text-xl font-semibold mr-4">Select Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} Year</option>
          ))}
        </select>
      </div>

      <div className="max-w-4xl mx-auto">
        {renderOutpasses()}
      </div>
    </div>
  );
};

export default Outing;
