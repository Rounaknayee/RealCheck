import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordShown, setPasswordShown] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const response = await axios.post('/api/users/signin', {
            email: formData.email,
            password: formData.password,
            });
        console.log(response);
        const { token } = response.data;
        localStorage.setItem('token', token); // or sessionStorage.setItem('token', token);
        const userRole = response.data.user.role;
        console.log(userRole);
        if(userRole === 'manufacturer'){
            navigate('/manufacturer/dashboard');
        }
        else if(userRole === 'supplier'){
            navigate('/supplier/dashboard');
        }
      // SignIn logic
      // Example: const response = await axios.post('/api/users/signin', formData);
      // Handle response, set token, navigate, etc.

      console.log('Form submitted');
    } catch (error) {
      // Handle errors
      console.error(error.response.data);
      setErrors(error.response.data || {});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 p-8 bg-teal-100 shadow-lg rounded-lg">
      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-teal-700">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-teal-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-teal-700">Password:</label>
        <div className="flex">
          <input
            type={passwordShown ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-teal-300 rounded-l-lg focus:ring-teal-500 focus:border-teal-500"
          />
          <button type="button" onClick={togglePasswordVisibility} className="px-4 bg-teal-200 rounded-r-lg">
            Show/Hide
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
        Sign In
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

export default SignIn;
