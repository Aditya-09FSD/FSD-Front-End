import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/users/signup", formData);
      setSuccess("Signup successful!");
      setFormData({
        name: "",
        username: "",
        phone: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (err) {
      setError("Error during signup. Please check your inputs.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="email"
          name="username"
          placeholder="Email (Username)"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
