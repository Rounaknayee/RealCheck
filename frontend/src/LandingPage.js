// ConnectionTest.js

// import { Route,Router, Link, } from 'react-router-dom';
import SignUp from './SignUp';
import ConnectionTest from './ConnectionTest';
import SignIn from './SignIn';
import { useState } from 'react';

function LandingPage() {
  const [activeComponent, setActiveComponent] = useState('connectionTest');
  const renderComponent = () => {
    switch(activeComponent) {
      case 'connectionTest':
        return <ConnectionTest />;
      case 'signUp':
        return <SignUp />;
      case 'signIn':
        return <SignIn />;
      default:
        return null;
    }
  };

  return (
    <div className="landing-page min-h-screen flex flex-col bg-teal-50 text-gray-800">
      {/* Top Navigation Bar */}
      <div className="w-full bg-teal-800 text-white p-4 flex justify-center space-x-4">
        <button onClick={() => setActiveComponent('connectionTest')} className="font-semibold hover:bg-teal-700 p-2">
          Test Connection
        </button>
        <button onClick={() => setActiveComponent('signIn')} className="font-semibold hover:bg-teal-700 p-2">
          Login
        </button>
        <button onClick={() => setActiveComponent('signUp')} className="font-semibold hover:bg-teal-700 p-2">
          Sign Up
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">Welcome to Real Check</h1>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
