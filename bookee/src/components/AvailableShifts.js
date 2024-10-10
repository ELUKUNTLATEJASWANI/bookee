import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableShifts.css';

const AvailableShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Helsinki'); // Default city
  const [loading, setLoading] = useState(true);


  const fetchShifts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8080/shifts'); 
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

 
  const handleBook = async (shiftId) => {
    try {
      await axios.post(`http://127.0.0.1:8080/shifts/${shiftId}/book`);

      fetchShifts();
    } catch (error) {
      console.error('Error booking shift:', error);
    }
  };


  const handleCancel = async (shiftId) => {
    try {
      await axios.post(`http://127.0.0.1:8080/shifts/${shiftId}/cancel`);
    
      fetchShifts();
    } catch (error) {
      console.error('Error cancelling shift:', error);
    }
  };


  const groupShiftsByDate = (shifts) => {
    return shifts.reduce((grouped, shift) => {
      const date = new Date(shift.startTime).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(shift);
      return grouped;
    }, {});
  };


  const groupedShifts = groupShiftsByDate(shifts.filter(shift => shift.area === selectedCity));

  return (
    <div className="available-shifts">
      <div className="header-tabs">
        <button
          className={selectedCity === 'Helsinki' ? 'active-tab' : ''}
          onClick={() => setSelectedCity('Helsinki')}
        >
          Helsinki ({shifts.filter(shift => shift.area === 'Helsinki').length})
        </button>
        <button
          className={selectedCity === 'Tampere' ? 'active-tab' : ''}
          onClick={() => setSelectedCity('Tampere')}
        >
          Tampere ({shifts.filter(shift => shift.area === 'Tampere').length})
        </button>
        <button
          className={selectedCity === 'Turku' ? 'active-tab' : ''}
          onClick={() => setSelectedCity('Turku')}
        >
          Turku ({shifts.filter(shift => shift.area === 'Turku').length})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading shifts...</div>
      ) : (
        <div className="shift-list">
          {Object.keys(groupedShifts).map(date => (
            <div key={date} className="shift-group">
              <h3>{date === new Date().toDateString() ? 'Today' : date}</h3>
              {groupedShifts[date].map(shift => (
                <div key={shift.id} className="shift-item">
                  <div className="shift-time">
                    {new Date(shift.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                    {new Date(shift.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={`shift-status ${shift.booked ? 'booked' : shift.overlapping ? 'overlapping' : ''}`}>
                    {shift.booked ? 'Booked' : shift.overlapping ? 'Overlapping' : ''}
                  </div>
                  <button
                    className={`shift-action ${shift.booked ? 'cancel' : 'book'}`}
                    onClick={() => shift.booked ? handleCancel(shift.id) : handleBook(shift.id)}
                  >
                    {shift.booked ? 'Cancel' : 'Book'}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableShifts;
