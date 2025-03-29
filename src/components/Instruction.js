import React, { useState } from 'react';

const Instruction = () => {
  const [announcement, setAnnouncement] = useState('');
  const [image, setImage] = useState(null);
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const handleAnnouncementChange = (e) => setAnnouncement(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleDepartmentChange = (e) => setDepartment(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!announcement && !image) {
      alert('Please add either text or an image for the announcement.');
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      content: announcement,
      image: image ? URL.createObjectURL(image) : null,
      year,
      department,
      date: new Date().toLocaleString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setAnnouncement('');
    setImage(null);
    setYear('');
    setDepartment('');
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all announcements?')) {
      setAnnouncements([]);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">Student Announcements</h1>

      <form className="bg-white p-8 rounded-2xl shadow-2xl mb-10 max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold mb-6 text-blue-700">Create Announcement</h2>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 mb-6"
          rows="4"
          placeholder="Enter announcement..."
          value={announcement}
          onChange={handleAnnouncementChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-6 w-full p-2 border rounded-xl"
        />

        <div className="grid grid-cols-2 gap-6 mb-6">
          <select
            className="p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500"
            value={year}
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            <option value="All Years">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <select
            className="p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500"
            value={department}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            <option value="All Departments">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all w-full"
        >
          Post Announcement
        </button>
      </form>

      {announcements.length > 0 && (
        <button
          onClick={handleClearAll}
          className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all mb-8 block mx-auto"
        >
          Clear All Announcements
        </button>
      )}

      <div className="space-y-8 max-w-4xl mx-auto">
        {announcements.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-2xl shadow-lg relative">
            <div className="flex justify-between items-start mb-6">
              <p className="text-gray-600 text-lg ">Year: {item.year} | Department: {item.department}</p>
              <span className="text-gray-500 text-lg">{item.date}</span>
            </div>
            {item.image && <img src={item.image} alt="announcement" className="w-full h-64 object-cover rounded-xl mb-6" />}
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">{item.content}</h3>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instruction;
