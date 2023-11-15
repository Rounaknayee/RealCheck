import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Navlinks = [
    {
        title: 'Dashboard',
        path: '/manufacturer/dashboard',
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path: '/manufacturer/products',
        cName: 'nav-text'
    },
    {
        title: 'Suppliers',
        path: '/manufacturer/suppliers',
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/manufacturer/profile',
        cName: 'nav-text'
    }
    // ,
    // {
    //     title: 'Logout',
    //     path: '',
    //     cName: 'nav-text'
    // }
]

const ManufacturerDashboard = () => {
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
  
  export default ManufacturerDashboard;