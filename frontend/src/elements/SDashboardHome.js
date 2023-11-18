import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Navlinks = [
    {
        title: 'Dashboard',
        path: '/supplier/dashboard',
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path: '/supplier/products',
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/manufacturer/profile',
        cName: 'nav-text'
    }
]

const SDashboardHome = () => {
    return (
      <div className="flex">
        <div className="w-64 bg-gray-100 min-h-screen">
          <Navigation Navlinks={Navlinks} />
        </div>
        <div className="flex-grow p-4">
          <Outlet /> {/* Nested routes will render their components here */}
        </div>
      </div>
    );
  };


export default SDashboardHome;