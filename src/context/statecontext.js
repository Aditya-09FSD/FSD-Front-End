import React, { createContext, useState, useContext, useEffect } from "react";
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
  const [courses, setCourses] = useState(["Select Cource"]); // Initialize courses as an empty array
  const [loadingCourses, setLoadingCourses] = useState(true); // Track loading state for courses
  const [error, setError] = useState(null); // Track any errors

  // New states for panels and subjects
  const [panelArray, setPanelArray] = useState(["Select Panel"]); // Panel data state
  const [subjectArray, setSubjectArray] = useState(["Select Subject"]); // Subject data state
  const [loadingPanels, setLoadingPanels] = useState(true); // Track loading state for panels
  const [loadingSubjects, setLoadingSubjects] = useState(true); // Track loading state for subjects

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiurl}/courses/`);
        setCourses(response.data.data.data); // Set the fetched courses to state
        setLoadingCourses(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to fetch courses");
        setLoadingCourses(false); // Set loading to false even in case of an error
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Fetch panels from the API
  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const response = await axios.get(`${apiurl}/panels/`);
        setPanelArray(response.data.data.data); // Set the fetched panels to state
        setLoadingPanels(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to fetch panels");
        setLoadingPanels(false); // Set loading to false even in case of an error
        console.error("Error fetching panels:", err);
      }
    };

    fetchPanels();
  }, []);

  // Fetch subjects from the API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${apiurl}/subjects/`);
        setSubjectArray(response.data.data.data); // Set the fetched subjects to state
        setLoadingSubjects(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Failed to fetch subjects");
        setLoadingSubjects(false); // Set loading to false even in case of an error
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  // Function to log in
  const login = (data) => {
    setIsLoggedIn(true);
  };

  // Function to log out
  const logout = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    Cookies.remove("token");

    try {
      // Call your API to handle the server-side logout
      await axios.get(`${apiurl}/users/logout`);

      // Show SweetAlert success message
      await Swal.fire({
        title: "Logged Out Successfully!",
        text: "You will be redirected to the home page.",
        icon: "success",
        confirmButtonText: "Okay",
      });

      // Redirect to homepage after SweetAlert
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
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        courses,
        panelArray,
        subjectArray,
        loadingCourses,
        loadingPanels,
        loadingSubjects,
        error,
        login,
        logout,
        setUserData,
        setCourses, // Setter for courses (optional)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
