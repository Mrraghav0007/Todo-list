import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide after 3 seconds
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    isVisible && <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
