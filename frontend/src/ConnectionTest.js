// ConnectionTest.js

import React, { useEffect, useState } from 'react';

function ConnectionTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className = "connection-test">
        <p>{message}</p>
    </div>

  );
}

export default ConnectionTest;
