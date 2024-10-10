import React, { useState } from 'react';
import './MyShifts.css'; 

function MyShifts() {

  const [shifts] = useState([
    {
      date: "Today",
      totalShifts: "2 shifts, 4 h",
      items: [
        { id: 1, time: "12:00-14:00", location: "Helsinki", isCancelled: false },
        { id: 2, time: "14:00-16:00", location: "Helsinki", isCancelled: false }
      ]
    },
    {
      date: "Tomorrow",
      totalShifts: "1 shift, 4 h",
      items: [
        { id: 3, time: "12:00-16:00", location: "Tampere", isCancelled: false }
      ]
    },
    {
      date: "September 22",
      totalShifts: "2 shifts, 3 h 30 m",
      items: [
        { id: 4, time: "9:00-11:00", location: "Turku", isCancelled: false },
        { id: 5, time: "13:30-15:00", location: "Turku", isCancelled: false }
      ]
    }
  ]);

 
  const handleCancel = (id) => {
    console.log(`Cancelled shift with id: ${id}`);
 
  };

  return (
    <div className="my-shifts">
      {shifts.map((shiftGroup, index) => (
        <div key={index}>
          <div className="shift-header">
            <h3>{shiftGroup.date}</h3>
            <span>{shiftGroup.totalShifts}</span>
          </div>
          {shiftGroup.items.map(shift => (
            <div key={shift.id} className="shift-item">
              <div className="shift-details">
                <strong>{shift.time}</strong>
                <p>{shift.location}</p>
              </div>
              <button
                className="cancel-button"
                onClick={() => handleCancel(shift.id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyShifts;
