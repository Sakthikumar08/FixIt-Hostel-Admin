import React, { useState } from 'react';

const Roomclean = () => {
  const [formData, setFormData] = useState({
    staffName: '',
    roomNumber: '',
    group: '',
    status: 'Pending',
    remarks: '',
  });

  const [rooms, setRooms] = useState([
    { id: 1, roomNumber: '101', status: 'Pending', cleanedAt: '' },
    { id: 2, roomNumber: '102', status: 'Pending', cleanedAt: '' },
    { id: 3, roomNumber: '103', status: 'Completed', cleanedAt: '24:03:2025' },
    { id: 4, roomNumber: '104', status: 'Pending', cleanedAt: '' },
    { id: 5, roomNumber: '105', status: 'Pending', cleanedAt: '' },
    { id: 6, roomNumber: '106', status: 'Completed', cleanedAt: '25:03:2025' },
    { id: 7, roomNumber: '107', status: 'Pending', cleanedAt: '' },
    { id: 8, roomNumber: '108', status: 'Pending', cleanedAt: '' },
    { id: 9, roomNumber: '109', status: 'Pending', cleanedAt: '' },
    { id: 10, roomNumber: '110', status: 'Completed', cleanedAt: '23:03:2025' },
    { id: 11, roomNumber: '111', status: 'Pending', cleanedAt: '' },
    { id: 12, roomNumber: '112', status: 'Pending', cleanedAt: '' },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = new Date().toLocaleString();

    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.roomNumber === formData.roomNumber
          ? { ...room, status: formData.status, cleanedAt: currentTime }
          : room
      )
    );

    alert('Room cleaning record submitted successfully!');

    setFormData({
      staffName: '',
      roomNumber: '',
      group: '',
      status: 'Pending',
      remarks: '',
    });

    setShowForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      default:
        return 'bg-yellow-400';
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-600">Room Cleaning Tracker</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`h-40 w-40 rounded-xl shadow-xl p-4 text-white font-bold ${getStatusColor(room.status)}`}
          >
            <p className="text-4xl mb-2">{room.roomNumber}</p>
            <p><strong>Status:</strong> {room.status}</p>
            <p><strong>Last Cleaned:</strong> {room.cleanedAt || 'Not yet cleaned'}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-lg transition-all"
      >
        {showForm ? 'Close Room Cleaning Form' : 'Open Room Cleaning Form'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 mt-8 shadow-2xl rounded-2xl bg-white space-y-6">
          <h3 className="text-2xl font-semibold text-center text-indigo-600">Room Cleaning Form</h3>

          <input
            name="staffName"
            value={formData.staffName}
            onChange={handleChange}
            placeholder="Staff Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Room Number"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="group"
            value={formData.group}
            onChange={handleChange}
            placeholder="Group (e.g., A, B, C)"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Additional Remarks"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            Submit Record
          </button>
        </form>
      )}
    </div>
  );
};

export default Roomclean;