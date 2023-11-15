import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { NavigationContext } from 'react-router/dist/lib/context';


function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    // username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown => !confirmPasswordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return; // Stop the submission since the passwords don't match
    }

    try {
      // Perform client-side validation here if needed
  
      // Send a POST request to the server to create a new user
      const response = await axios.post('/api/users/signup', {
        // username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.userType
      });
      // Handle success (maybe log the user in or redirect to a login page)

      console.log(response);

      const { token } = response.data;
      localStorage.setItem('token', token); // or sessionStorage.setItem('token', token);

      // Redirect based on user role
      const userRole = response.data.user.role;
      if (userRole === 'manufacturer') {
        navigate('/manufacturer/dashboard');
      } else if (userRole === 'supplier') {
        navigate('/supplier/dashboard');
  }
    } catch (error) {
      // Handle errors (display error messages to the user)
      setErrors(error.response.data.errors || {}); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
  
  {/* Email */}
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Password */}
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
    <div className="flex">
      <input
        type={passwordShown ? "text" : "password"}
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button type="button" onClick={togglePasswordVisibility} className="px-4 bg-gray-200 rounded-r-lg">
        Show/Hide
      </button>
    </div>
  </div>

  {/* Confirm Password */}
  <div className="mb-6">
    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password:</label>
    <div className="flex">
      <input
        type={confirmPasswordShown ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button type="button" onClick={toggleConfirmPasswordVisibility} className="px-4 bg-gray-200 rounded-r-lg">
        Show/Hide
      </button>
    </div>
  </div>

  {/* User Type */}
  <div className="mb-6">
    <label htmlFor="userType" className="block mb-2 text-sm font-medium text-gray-700">I am a:</label>
    <select
      id="userType"
      name="userType"
      value={formData.userType}
      onChange={handleChange}
      required
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select Type</option>
      <option value="manufacturer">Manufacturer</option>
      <option value="supplier">Supplier</option>
    </select>
  </div>

  {/* Submit Button */}
  <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Sign Up
  </button>

  {/* Errors */}
  {Object.keys(errors).length > 0 && (
    <div className="mt-6 p-4 text-sm text-red-600 bg-red-100 rounded-lg">
      {Object.keys(errors).map((key) => (
        <p key={key}>{errors[key]}</p>
      ))}
    </div>
  )}
</form>

  );
}

export default SignUp;
