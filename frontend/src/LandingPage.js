// ConnectionTest.js

import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {

  return (
    <div className="landing-page">
        <h1>Welcome to Real Check</h1>
        <p>Real Check is a platform that helps you verify the authenticity of your products.</p>
        {/* Link components for navigation */}
        <Link to="/">Home</Link>
          <Link to="/test-connection">Test Connection</Link>
          <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default LandingPage;