import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <div className="text-6xl">🐱‍🚀</div>
      <h2 className="text-3xl font-semibold mt-4">Oops! Lost in Space!</h2>
      <p className="text-lg text-gray-600 mt-2">
        The page you're looking for doesn't exist.
      </p>
      <p className="text-gray-500 mt-4">Redirecting you back to safety...</p>
    </div>
  );
};

export default ErrorPage;
