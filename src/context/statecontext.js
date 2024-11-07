// context.js
import React, { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { apiurl } from "../devdata/constants";

// Create Context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to log in
  const login = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  // Function to log out
  const logout = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    Cookies.remove("token");

    try {
      // Call your API to handle the server-side logout
      await axios.get(`${apiurl}/users/logout`);

      // Redirect to homepage after SweetAlert
      // Show SweetAlert success message
      await Swal.fire({
        title: "Logged Out Successfully!",
        text: "You will be redirected to the home page.",
        icon: "success",
        confirmButtonText: "Okay",
      });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
      await Swal.fire({
        title: "Error",
        text: "There was an issue logging out. Please try again later.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
