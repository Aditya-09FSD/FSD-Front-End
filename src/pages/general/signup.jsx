import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "../../devdata/constants";
import { Loading } from "../../components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Swal from "sweetalert2"; // Import SweetAlert2

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true); // Set loading to true on form submit

    try {
      const response = await axios.post(`${apiurl}/users/signup`, formData);

      if (response.data.token) {
        // Store token in cookies
        Cookies.set("token", response.data.token, { expires: 7 });

        // Show success alert using SweetAlert
        await Swal.fire({
          title: "Signup Successful!",
          text: "You can now log in with your credentials.",
          icon: "success",
          confirmButtonText: "Proceed to Login",
        });

        // Redirect to login page
        navigate("/login"); // Assuming /login is the route for the login page
      }
    } catch (err) {
      setError("Error during signup. Please check your inputs.");
    } finally {
      setIsLoading(false); // Stop loading after the request completes
    }
  };

  // Render loading component if isLoading is true
  if (isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 sm:text-4xl">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
            required
          />
          <input
            type="email"
            name="username"
            placeholder="Email Address"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
            required
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
            required
          />
          {error && (
            <p className="text-sm text-red-500 animate-pulse">{error}</p>
          )}
          {success && <p className="text-sm text-green-500">{success}</p>}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
