import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Blue Bells Public School</h1>
        <div className="space-x-4">
          <a href="#" className="text-white hover:text-yellow-400">Home</a>
          <a href="#" className="text-white hover:text-yellow-400">About</a>
          <a href="#" className="text-white hover:text-yellow-400">Achievements</a>
          <a href="#" className="text-white hover:text-yellow-400">Admissions</a>
          <a href="#" className="text-white hover:text-yellow-400">Contact</a>
          <a href="#" className="text-white hover:text-yellow-400">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
