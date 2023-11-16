// // ConnectionTest.js

// import React, { useEffect, useState } from 'react';

// function ConnectionTest() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("/api/test")
//       .then(response => response.json())
//       .then(data => setMessage(data.message));
//   }, []);

//   return (
//     <div className = "connection-test">
//         <p>{message}</p>
//     </div>

//   );
// }

// export default ConnectionTest;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConnectionTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Using Axios to make the HTTP request
    axios.get("/api/test")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="connection-test">
      {/* <p>{message}</p> */}
    </div>
  );
}

export default ConnectionTest;
