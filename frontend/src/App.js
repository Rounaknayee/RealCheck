import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ConnectionTest from './ConnectionTest.js';
import LandingPage from './LandingPage';
import SignUp from './SignUp';
import ManufacturerDashboard from './elements/ManufacturerDashboard';
import SupplierDashboard from './elements/SupplierDashboard';


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
          
          <Route 
          path="/manufacturer/dashboard" component={<ManufacturerDashboard/>} />
          <Route
          path="/supplier/dashboard" element = {<SupplierDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
