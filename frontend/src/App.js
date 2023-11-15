import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ConnectionTest from './ConnectionTest.js';
import LandingPage from './LandingPage';
import SignUp from './SignUp';
import ManufacturerDashboard from './elements/ManufacturerDashboard';
import DashboardHome from './elements/DashboardHome';
import Products from './elements/Products';
import Suppliers from './elements/Suppliers';
import Profile from './elements/Profile';
import SupplierDashboard from './elements/SupplierDashboard.js';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
          path="/test-connection" element={<ConnectionTest />} />
          <Route 
          path="/" element={<LandingPage />} /> 
          <Route 
          path="/signup" element={<SignUp />} />
          {/* nested rotes for manufacturers and suppliers wiht their own homepages */}
          
          {/* <Route 
          path="/manufacturer/dashboard" component={<ManufacturerDashboard/>} /> */}
          
          <Route path="/manufacturer/" element={<ManufacturerDashboard />}>
            <Route index element={<DashboardHome />} /> {/* Default route */}
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="products" element={<Products />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="profile" element={<Profile />} />
            {/* Add more nested routes as needed */}
          </Route>
        {/* Other routes */}
          
          <Route
          path="/supplier/dashboard" element = {<SupplierDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
