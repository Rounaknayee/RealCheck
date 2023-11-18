import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navigation = ({ Navlinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/users/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored with the key 'token'
        }
      });
  
      console.log(response);
      if (response.status === 200 && response.data === 'lsuccess') {
        localStorage.removeItem('token'); // Clear token from local storage
        navigate('/'); // Redirect to the main index page
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    }
  };

  return (
  <div className="flex flex-col h-full justify-between bg-teal-600 text-white">
  <div>
      {/* Application Name */}
      <div className="p-4 text-2xl font-bold">
        Real Check
      </div>

      {/* Hamburger Icon */}
      <button
        className="p-2 text-white hover:text-teal-200 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* SVG Icon */}
      </button>

      {/* Navigation Links */}
      <div className={`flex flex-col items-center ${isOpen ? 'block' : 'hidden'} md:block`}>
        {Navlinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`${link.cName} block mx-8 my-16 py-2 px-4 text-sm hover:bg-teal-700 hover:font-bold rounded-lg`}
          >
            {link.title}
          </Link>
        ))}
      </div>
  </div>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="m-4 py-2 px-6 bg-white hover:bg-red-700 hover:text-white text-red-700 rounded-md"
  >
    Logout
  </button>
</div>

  );
};

export default Navigation;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navigation = ({ Navlinks }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Hamburger Icon */}
//       <button
//         className="p-2 text-gray-500 hover:text-gray-700 md:hidden"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
//         </svg>
//       </button>

//       {/* Navigation Links */}
//       <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
//         {Navlinks.map((link, index) => (
//           <Link
//             key={index}
//             to={link.path}
//             className={`${link.cName} block py-2 px-4 text-sm hover:bg-gray-200`}
//           >
//             {link.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Navigation;