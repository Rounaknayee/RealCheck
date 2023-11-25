import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConnectionTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {

    // fetch("/api/test")
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setMessage(data.message);
    //   })
    //   .catch(error => {
    //     console.error('There was an error!', error);
    //   });
    // Using Axios to make the HTTP request
    axios.get("/api/test")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error.message);
      });
  }, []);

  return (
    <div className="connection-test">
       <p className="text-lg text-teal-600 mb-6">
            Real Check is a platform that helps you verify the authenticity of your products.
          </p>
      <p>{message}</p>
    </div>
  );
}

export default ConnectionTest;
