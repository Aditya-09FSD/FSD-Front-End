import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 mb-4"></div>
      <p className="text-xl font-semibold text-blue-700">
        Hang tight, we're getting things ready! 🐱‍🏍
      </p>
    </div>
  );
};

export default Loading;
