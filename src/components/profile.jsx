import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context";
import { apiurl } from "../devdata/constants";
import { Loading } from "./";
import Cookies from "js-cookie";

const Profile = () => {
  const { userData, isLoggedIn, setUserData, setUserDet } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      const token = Cookies.get("token");

      if (token) {
        axios
          .get(`${apiurl}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response.data.data);

            setUserData(response.data.data.user);
            setUserDet(response.data.data.userDetails);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching profile data:", error);
            setLoading(false);
          });
      } else {
        console.log("No token found in cookies.");
        setLoading(false);
      }
    }
  }, [isLoggedIn, setUserData]);

  if (loading) {
    return <Loading />;
  }

  return userData ? (
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
          Bio: {userData?.bio || "No bio available."} <br />
          Role: {userData?.role || "User"}
        </p>
      </div>
    </div>
  ) : (
    <div className="p-6 bg-red-100 text-red-700 shadow-lg rounded-lg flex items-center space-x-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zm-5.659 7.769a1 1 0 00-1.414 0L8.293 16.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414zm4.293-5.243a1 1 0 10-1.414-1.414L11 11.293a1 1 0 101.414 1.414l5.293-5.293z"
        />
      </svg>
      <p className="text-lg font-semibold">
        There was some error fetching your data~!!
      </p>
    </div>
  );
};

export default Profile;
