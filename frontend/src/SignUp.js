import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { NavigationContext } from 'react-router/dist/lib/context';


function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
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

  const togglePasswordVisiblity = () => {
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
      const response = await axios.post('/api/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });
      // Handle success (maybe log the user in or redirect to a login page)

      console.log(response.data);

      // Depending on the user type, redirect to the respective homepage
      if (response.data.user.type === 'manufacturer') {
        navigate('/manufacturer/homepage');
      } else if (response.data.user.type === 'supplier') {
        navigate('/supplier/homepage');
      }
    } catch (error) {
      // Handle errors (display error messages to the user)
      setErrors(error.response.data.errors || {});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type={passwordShown ? "text" : "password"}
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="button" onClick={togglePasswordVisiblity}>Show/Hide Password</button>

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type={confirmPasswordShown ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="button" onClick={toggleConfirmPasswordVisibility}>Show/Hide Confirm Password</button>

      <label htmlFor="userType">I am a:</label>
      <select
        id="userType"
        name="userType"
        value={formData.userType}
        onChange={handleChange}
        required
      >
        <option value="">Select Type</option>
        <option value="manufacturer">Manufacturer</option>
        <option value="supplier">Supplier</option>
      </select>

      <button type="submit">Sign Up</button>

      {/* Display errors if any */}
      {Object.keys(errors).length > 0 && (
        <div className="errors">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key]}</p>
          ))}
        </div>
      )}
    </form>
  );
}

export default SignUp;
