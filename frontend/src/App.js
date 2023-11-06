import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ConnectionTest from './ConnectionTest.js';
import LandingPage from './LandingPage';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          {/* Link components for navigation */}
          <Link to="/">Home</Link>
          <Link to="/test-connection">Test Connection</Link>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/test-connection" element={<ConnectionTest />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          {/* nested rotes for manufacturers and suppliers wiht their own homepages */}
          {/* <Route path="/manufacturer-homepage" component={ManufacturerHomepage} />
          <Route path="/supplier-homepage" component={SupplierHomepage} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
