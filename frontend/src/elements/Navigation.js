import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ Navlinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        className="p-2 text-gray-500 hover:text-gray-700 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Navigation Links */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        {Navlinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`${link.cName} block py-2 px-4 text-sm hover:bg-gray-200`}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;