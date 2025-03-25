import React from 'react';
import './RoomcleanreportStyle.css';

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const Roomcleanreport = () => {
  const currentMonth = 'March';
  const currentYear = new Date().getFullYear();
  const days = daysInMonth(3, currentYear); // March is month 3

  return (
    <div className='room-clean-container'>
      <div className='room-clean-box'>
        <h2>Room No: 339</h2>
        <h3>{currentMonth}</h3>
        <div className='calendar-grid'>
          {Array.from({ length: days }, (_, i) => (
            <div key={i} className='day-box'>
              <label>
                <input type='checkbox' />
                <span>{i + 1}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roomcleanreport;
