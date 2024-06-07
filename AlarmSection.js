import React, { useState } from 'react';
import './AlarmSection.css';

const AlarmSection = () => {
  const [alarmTime, setAlarmTime] = useState('');

  const setAlarm = () => {
    // Logic to set the alarm
  };

  return (
    <div className="alarm-container">
      <h2>Set Alarm</h2>
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <button onClick={setAlarm}>Set Alarm</button>
    </div>
  );
};

export default AlarmSection;
