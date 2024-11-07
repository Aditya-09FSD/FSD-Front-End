import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context"; // Import the context
import { apiurl } from "../devdata/constants"; // Import the API URL
import { Loading } from "./";
import Cookies from "js-cookie";

const Profile = () => {
  const { userData, isLoggedIn, setUserData } = useAuth(); // Get user data from context
  const [loading, setLoading] = useState(true);

  // Fetch user data after the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      const token = Cookies.get("token"); // Get token from cookies

      // Check if token exists
      if (token) {
        axios
          .get(`${apiurl}/users/me`, {
            headers: { Authorization: `Bearer ${token}` }, // Use token from cookies
          })
          .then((response) => {
            console.log(response.data.data.data);

            setUserData(response.data.data.data); // Store user data in context
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching profile data:", error);
            setLoading(false);
          });
      } else {
        console.log("No token found in cookies.");
        setLoading(false); // Stop loading if no token
      }
    }
  }, [isLoggedIn, setUserData]); // Only run when isLoggedIn changes

  if (loading) {
    return <Loading />; // Show loading component while fetching data
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-6">
        <img
          src={
            userData?.profilePicture ||
            "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-600">{userData?.name}</h2>
        <p className="text-gray-600">{userData?.username}</p>
        <p className="text-gray-600">{userData?.phone}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-600">About</h3>
        <p className="text-gray-700 mt-2">
          {userData?.bio || "No bio available."}
        </p>
      </div>
    </div>
  );
};

export default Profile;
