import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Loading, Navbar } from "../../components"; // Import Loading component (if applicable)

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post("/api/users/resetPassword", {
        username,
      });
      console.log(response.data);

      await Swal.fire({
        title: "Check your email!",
        text: "Please check your inbox for the password reset link.",
        icon: "success",
        confirmButtonText: "Okay",
      });

      setUsername("");
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: "There was an issue resetting your password. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="username"
            placeholder="Email (Username)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          {message && <p className="text-blue-500">{message}</p>}{" "}
          {/* Show custom message */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200 transform hover:scale-105 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
