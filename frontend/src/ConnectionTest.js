import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth } from '@fortawesome/free-solid-svg-icons';

function ConnectionTest() {
  const [isConnected, setIsConnected] = useState(false);

  const apiUrl = process.env.REACT_APP_BACKEND_URL; // URL of the backend API

  useEffect(() => {
    axios.get("/api/test")
      .then(response => {
        setIsConnected(true);
      })
      .catch(error => {
        console.error('There was an error!', error.message);
        setIsConnected(false);
      });
  }, []);

  const connectionStatusStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 15px',
    border: '2px solid',
    borderRadius: '25px',
    textAlign: 'center',
    color: isConnected ? "#10B981" : "#EF4444",
    backgroundColor: 'transparent'   ,      // transparent background color
    borderColor: isConnected ? "#10B981" : "#EF4444",
    fontSize: '14px',
    fontWeight: 'bold'
  };

  return (
    <div className="connection-test" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '16px' }}>
        Real Check is a platform that helps you verify the authenticity of your products.
      </p>
      <div style={connectionStatusStyle}>
          <FontAwesomeIcon icon={ faEarth } />
        <p>{isConnected ? `Backend Online @ ${apiUrl}` : `Backend Offline @ ${apiUrl}`}</p>
      </div>
    </div>
  );
}

export default ConnectionTest;
