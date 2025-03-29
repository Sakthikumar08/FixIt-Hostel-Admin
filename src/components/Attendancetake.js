import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Attendancetake = () => {
  const rooms = [
    { roomNo: 101, members: [
      { name: 'John Doe', rollNo: '22EC210' },
      { name: 'Jane Doe', rollNo: '22EC211' },
      { name: 'Alice', rollNo: '22EC212' },
      { name: 'Bob', rollNo: '22EC213' }
    ]},
    { roomNo: 102, members: [
      { name: 'Charlie', rollNo: '22EC214' },
      { name: 'David', rollNo: '22EC215' },
      { name: 'Eve', rollNo: '22EC216' },
      { name: 'Frank', rollNo: '22EC217' }
    ]},
    { roomNo: 103, members: [
      { name: 'Grace', rollNo: '22EC218' },
      { name: 'Hank', rollNo: '22EC219' },
      { name: 'Ivy', rollNo: '22EC220' },
      { name: 'Jack', rollNo: '22EC221' }
    ]},
    { roomNo: 104, members: [
      { name: 'Kate', rollNo: '22EC222' },
      { name: 'Leo', rollNo: '22EC223' },
      { name: 'Mia', rollNo: '22EC224' },
      { name: 'Noah', rollNo: '22EC225' }
    ]},
    { roomNo: 105, members: [
      { name: 'Olivia', rollNo: '22EC226' },
      { name: 'Paul', rollNo: '22EC227' },
      { name: 'Quinn', rollNo: '22EC228' },
      { name: 'Ryan', rollNo: '22EC229' }
    ]}
  ];

  const [openRoom, setOpenRoom] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [filter, setFilter] = useState('all');

  const toggleRoom = (index) => setOpenRoom(openRoom === index ? null : index);

  const handleAttendanceChange = (roomIndex, memberIndex, type) => {
    setAttendance((prev) => {
      const updated = { ...prev };
      if (!updated[roomIndex]) updated[roomIndex] = {};
      updated[roomIndex][memberIndex] = type;
      return updated;
    });
  };

  const totalMembers = rooms.reduce((total, room) => total + room.members.length, 0);
  const totalPresent = Object.values(attendance).reduce((sum, room) => sum + Object.values(room).filter(status => status === 'present').length, 0);
  const totalAbsent = Object.values(attendance).reduce((sum, room) => sum + Object.values(room).filter(status => status === 'absent').length, 0);

  const chartData = [
    { name: 'Present', value: totalPresent },
    { name: 'Absent', value: totalAbsent },
    { name: 'Unmarked', value: totalMembers - (totalPresent + totalAbsent) }
  ];

  const COLORS = ['#4CAF50', '#F44336', '#FFC107'];

  const saveAttendance = () => {
    console.log('Attendance Saved:', attendance);
    alert('Attendance has been successfully saved!');
  };

  const filterMembers = (room) => {
    return room.members.filter((_, index) => {
      const status = attendance[rooms.indexOf(room)]?.[index];
      if (filter === 'present') return status === 'present';
      if (filter === 'absent') return status === 'absent';
      return true;
    });
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h1 className="text-4xl text-blue-500 font-bold mb-8 text-center">Attendance Tracker</h1>

      <div className="flex justify-center mb-6 space-x-4">
        {['all', 'present', 'absent'].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg ${filter === type ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="bg-white p-6 rounded-2xl shadow-lg">
            <div
              className="text-xl font-semibold mb-4 text-blue-500 cursor-pointer flex justify-between items-center"
              onClick={() => toggleRoom(roomIndex)}
            >
              Room No: {room.roomNo} ({filterMembers(room).length}/{room.members.length} marked)
              <span className={openRoom === roomIndex ? 'rotate-180' : 'rotate-0'}>▼</span>
            </div>
            {openRoom === roomIndex && (
              <ul className="mt-4">
                {filterMembers(room).map((member, memberIndex) => (
                  <li key={memberIndex} className="flex justify-between items-center mb-4">
                    <span>{member.rollNo} - {member.name}</span>
                    <div className="flex space-x-4">
                      <button
                        className={`px-4 py-1 rounded-lg ${attendance[roomIndex]?.[memberIndex] === 'present' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => handleAttendanceChange(roomIndex, memberIndex, 'present')}
                      >Present</button>
                      <button
                        className={`px-4 py-1 rounded-lg ${attendance[roomIndex]?.[memberIndex] === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => handleAttendanceChange(roomIndex, memberIndex, 'absent')}
                      >Absent</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl" onClick={saveAttendance}>Save Attendance</button>
      </div>

      <div className="mt-10 flex justify-center">
        <PieChart width={400} height={400}>
          <Pie data={chartData} cx="50%" cy="50%" outerRadius={150} label>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Attendancetake;
