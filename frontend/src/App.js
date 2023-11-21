import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import ManufacturerDashboard from './elements/ManufacturerDashboard';
import MDashboardHome from './elements/MDashboardHome';
import MProducts from './elements/MProducts';
import MSuppliers from './elements/MSuppliers';
import MProfile from './elements/MProfile';
import SupplierDashboard from './elements/SupplierDashboard.js';
import SDashboardHome from './elements/SDashboardHome.js';
import SProducts from './elements/SProducts.js';
import SProfile from './elements/SProfile.js';
import Scan from './elements/Scan.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route 
          path="/test-connection" element={<ConnectionTest />} />
          <Route 
          path="/signup" element={<SignUp />} /> */}
          <Route 
          path="/" element={<LandingPage />} /> 
          <Route
          path="/scan" element={<Scan />} />

          {/* nested rotes for manufacturers and suppliers wiht their own homepages */}
                    
          <Route path="/manufacturer/" element={<ManufacturerDashboard />}>
            <Route index element={<MDashboardHome />} /> {/* Default route */}
            <Route path="dashboard" element={<MDashboardHome />} />
            <Route path="products" element={<MProducts />} />
            <Route path="suppliers" element={<MSuppliers />} />
            <Route path="profile" element={<MProfile />} />
            {/* Add more nested routes as needed */}
          </Route>
          
          <Route path="/supplier/" element = {<SupplierDashboard />} >
            {/* Here below i need routes for suppliers */}
            <Route index element={<SDashboardHome />} /> {/* Default route */}
            <Route path="dashboard" element={<SDashboardHome />} />
            <Route path="products" element={<SProducts />} />
            <Route path="profile" element={<SProfile />} />
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
