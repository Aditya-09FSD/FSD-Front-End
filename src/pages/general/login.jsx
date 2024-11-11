import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "../../devdata/constants";
import { Loading, Navbar } from "../../components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context";

function Login() {
  const { login, setrole } = useAuth();

  const [formData, setFormData] = useState({
    username: "akashpatelyo2@gmail.com",
    password: "akashpatel",
    role: "user",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Start loading on submit

    try {
      const response = await axios.post(`${apiurl}/users/login`, formData);
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        login();

        await Swal.fire({
          title: "Login Successful!",
          text: "You will be redirected to your dashboard.",
          icon: "success",
          confirmButtonText: "Okay",
        });
        const role = response.data.role;
        setrole(role);
        localStorage.setItem("role", JSON.stringify(role));
        if (role === "teacher") {
          navigate("/teacher");
        } else if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/student");
        }
      }
    } catch (err) {
      setError("Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg animate-fade-in">
          <h2 className="text-3xl font-extrabold text-center text-blue-600 sm:text-4xl">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="username"
              placeholder="Email Address"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 h-1/2 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
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
            {error && (
              <p className="text-sm text-red-500 animate-pulse">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 focus:outline-none"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
