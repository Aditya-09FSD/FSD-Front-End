import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { apiurl } from "../devdata/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState === "true";
  });
  const [userData, setUserData] = useState();

  const [role, setrole] = useState(() => {
    const savedState = localStorage.getItem("role");
    return savedState ? JSON.parse(savedState) : null;
  });
  const [courses, setCourses] = useState(["Select Cource"]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);

  const [panelArray, setPanelArray] = useState(["Select Panel"]);
  const [subjectArray, setSubjectArray] = useState(["Select Subject"]);
  const [loadingPanels, setLoadingPanels] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiurl}/courses/`);
        setCourses(response.data.data.data);
        setLoadingCourses(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoadingCourses(false);
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const response = await axios.get(`${apiurl}/panels/`);
        setPanelArray(response.data.data.data);
        setLoadingPanels(false);
      } catch (err) {
        setError("Failed to fetch panels");
        setLoadingPanels(false);
        console.error("Error fetching panels:", err);
      }
    };

    fetchPanels();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${apiurl}/subjects/`);
        setSubjectArray(response.data.data.data);
        setLoadingSubjects(false);
      } catch (err) {
        setError("Failed to fetch subjects");
        setLoadingSubjects(false);
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    Cookies.remove("token");
    setrole(null);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("role");
    try {
      await axios.get(`${apiurl}/users/logout`);

      await Swal.fire({
        title: "Logged Out Successfully!",
        text: "You will be redirected to the home page.",
        icon: "success",
        confirmButtonText: "Okay",
      });

      // window.location.href = "/";
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
        role,
        login,
        logout,
        setUserData,
        setCourses,
        setrole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
