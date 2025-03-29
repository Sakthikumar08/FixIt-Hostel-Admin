import React from 'react';

import Getremainder from './Getremainder';

const Home = () => {
  const profile = {
    name: 'Sathish',
    empId: 'EMP12345',
    department: 'Hostel Management',
    role: 'Admin',
  };

  const messFeedback = [
    { meal: 'Breakfast', rating: '4.2 ★', comment: 'Good variety and taste' },
    { meal: 'Lunch', rating: '3.8 ★', comment: 'Needs better spice balance' },
    { meal: 'Dinner', rating: '4.5 ★', comment: 'Excellent quality and serving' },
  ];

  const instructions = [
    "Ensure all maintenance requests are logged promptly.",
    "Review mess feedback daily and address concerns.",
    "Monitor room cleanliness reports weekly.",
    "Respond to urgent issues within 24 hours.",
    "Ensure resident details are up-to-date.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">

      {/* Header Section */}
      <header className="flex justify-between items-center border-b-4 border-blue-500 pb-4">
        <h1 className="text-4xl font-bold text-blue-500">FixIt-Hostel Admin Dashboard</h1>

        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{profile.name}</h3>
          <p className="text-gray-600"><strong>ID:</strong> {profile.empId}</p>
          <p className="text-gray-600"><strong>Department:</strong> {profile.department }</p>
          <p className="text-gray-600"><strong>Role:</strong> {profile.role}</p>
        </div>
      </header>

      {/* Introduction Section */}
      <p className="mt-8 text-lg text-gray-700 leading-relaxed">
        Efficiently manage hostel facilities, track maintenance, and ensure a safe environment. <br />
        Stay informed with real-time updates and feedback for continuous improvements.
      </p>

      {/* Content Wrapper */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">

        {/* Mess Feedback Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-500 mb-6">Today's Mess Feedback</h2>
          {messFeedback.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4 last:border-b-0">
              <p className="text-lg font-medium text-gray-800">
                <strong>{item.meal}:</strong> {item.rating}
              </p>
              <p className="italic text-gray-600">"{item.comment}"</p>
            </div>
          ))}
        </div>

        {/* Instruction Box */}
        <div className="bg-white shadow-lg rounded-lg p-8 transition-transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-500 mb-6">Admin Instructions</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            {instructions.map((instruction, index) => (
              <li key={index} className="leading-relaxed">
                {instruction}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Section with Getremainder */}
      <footer className="mt-12">
        <Getremainder />
      </footer>

    </div>
  );
};

export default Home;
