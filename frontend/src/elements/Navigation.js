import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navigation = ({ Navlinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/users/logout', {},);
  
      console.log(response);
      if (response.status === 200 && response.data === 'lsuccess') {
        localStorage.clear(); // Clear token from local storage
        sessionStorage.clear(); // Clear all session storage
        navigate('/'); // Redirect to the main index page
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    }
  };

  return (
  <div className="flex flex-col h-full justify-between bg-teal-600 text-white p-4">
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

        <svg className="fill-current h-6 w-6" viewBox="0 0 24 24">  
          {isOpen ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM20 18H4V16H20V18Z"
            />
          ) : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
            />
          )}
        </svg>
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

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className=" py-2 px-6 bg-white hover:bg-red-700 hover:text-white text-red-700 rounded-md"
  >
    Logout
  </button>
</div>

  );
};

export default Navigation;