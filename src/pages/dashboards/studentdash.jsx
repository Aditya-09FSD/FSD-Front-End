// Studentdash.js
import React from "react";
import { useAuth } from "../../context";
import { Profile } from "../../components";

const Studentdash = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-blue-600">
          Please log in to view the dashboard.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-blue-700 text-center mb-8">
          Student Dashboard
        </h1>

        <Profile />

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-600">
            Recent Activities
          </h3>
          <p className="mt-4 text-gray-600">
            Here you can show recent activities or notifications...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Studentdash;
