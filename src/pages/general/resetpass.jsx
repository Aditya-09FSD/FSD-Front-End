import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/resetPassword", {
        username,
      });
      setMessage("Check your email for the reset link.");
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="username"
          placeholder="Email (Username)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        {message && <p className="text-blue-500">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
