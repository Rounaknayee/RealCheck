import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {message}
      </header>
      
    </div>
  );
}

export default App;
