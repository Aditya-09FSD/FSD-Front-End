// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <nav className="bg-gray-800 p-4 fixed w-full top-0 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white text-xl">Blue Bells Public School</h1>
//         <div className="space-x-4">
//           <a href="#" className="text-white hover:text-yellow-400">Home</a>
//           <a href="#" className="text-white hover:text-yellow-400">About</a>
//           <a href="#" className="text-white hover:text-yellow-400">Achievements</a>
//           <a href="#" className="text-white hover:text-yellow-400">Admissions</a>
//           <a href="#" className="text-white hover:text-yellow-400">Contact</a>
//           <Link to="/signup" className="text-white hover:text-yellow-400">Signup</Link>
//           <Link to="/login"  className="text-white hover:text-yellow-400">Login</Link>
//           <Link to="/record-attendance" className="text-white hover:text-yellow-400">Record Attendance</Link>
//           <Link to="/record-course" className="text-white hover:text-yellow-400">Record Course</Link>
//           <Link to="/record-panel" className="text-white hover:text-yellow-400">Record Panel</Link>
//           <Link to="/record-student" className="text-white hover:text-yellow-400">Record Student</Link>
//           <Link to="/record-subject" className="text-white hover:text-yellow-400">Record Subject</Link>
//           <Link to="/record-teacher" className="text-white hover:text-yellow-400">Record Teacher</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   const [isRecordMenuOpen, setIsRecordMenuOpen] = useState(false);

//   const toggleRecordMenu = () => {
//     setIsRecordMenuOpen(!isRecordMenuOpen);
//   };

//   return (
//     <nav className="bg-gray-800 p-4 fixed w-full top-0 shadow-lg z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="text-white text-xl font-semibold">Blue Bells Public School</h1>

//         {/* Menu Items */}
//         <div className="lg:flex items-center space-x-4">
//           <a href="#" className="text-white hover:text-yellow-400 transition-all">Home</a>
//           <a href="#" className="text-white hover:text-yellow-400 transition-all">About</a>
//           <a href="#" className="text-white hover:text-yellow-400 transition-all">Achievements</a>
//           <a href="#" className="text-white hover:text-yellow-400 transition-all">Admissions</a>
//           <a href="#" className="text-white hover:text-yellow-400 transition-all">Contact</a>
//           <Link to="/signup" className="text-white hover:text-yellow-400 transition-all">Signup</Link>
//           <Link to="/login" className="text-white hover:text-yellow-400 transition-all">Login</Link>

//           {/* "More Options" Button with Three Dots */}
//           <div
//             className="relative"
//             onMouseEnter={() => setIsRecordMenuOpen(true)}  // Show menu on hover
//             onMouseLeave={() => setIsRecordMenuOpen(false)} // Hide menu when mouse leaves
//           >
//             <button className="text-white hover:text-yellow-400 transition-all">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 12h12M6 6h12M6 18h12"
//                 />
//               </svg>
//             </button>

//             {/* Hidden "Record" Links */}
//             <div
//               className={`absolute top-0 right-0 bg-gray-700 p-4 rounded-md space-y-4 text-white ${isRecordMenuOpen ? 'block' : 'hidden'}`}
//             >
//               <Link to="/record-attendance" className="block hover:text-yellow-400">Record Attendance</Link>
//               <Link to="/record-course" className="block hover:text-yellow-400">Record Course</Link>
//               <Link to="/record-panel" className="block hover:text-yellow-400">Record Panel</Link>
//               <Link to="/record-student" className="block hover:text-yellow-400">Record Student</Link>
//               <Link to="/record-subject" className="block hover:text-yellow-400">Record Subject</Link>
//               <Link to="/record-teacher" className="block hover:text-yellow-400">Record Teacher</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isRecordMenuOpen, setIsRecordMenuOpen] = useState(false);

  const handleTitleClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleRecordMenu = () => {
    setIsRecordMenuOpen(!isRecordMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between relative">

        {/* Logo (Blue Bells Title) */}
        <h1
          onClick={handleTitleClick}
          className={`cursor-pointer text-xl font-semibold transition-all duration-700 ${
            isMenuVisible ? 'text-gray-400 transform -translate-x-[40%]' : 'mx-auto text-white'
          }`}
        >
          Blue Bells Public School
        </h1>

        {/* Main Menu Items - Appear When Title Slides Left */}
        <div
          className={`transition-opacity duration-700 flex space-x-4 ${
            isMenuVisible ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          <a href="#" className="text-white hover:text-yellow-400 transition-all">Home</a>
          <a href="#" className="text-white hover:text-yellow-400 transition-all">About</a>
          <a href="#" className="text-white hover:text-yellow-400 transition-all">Achievements</a>
          <a href="#" className="text-white hover:text-yellow-400 transition-all">Admissions</a>
          <a href="#" className="text-white hover:text-yellow-400 transition-all">Contact</a>
          <Link to="/signup" className="text-white hover:text-yellow-400 transition-all">Signup</Link>
          <Link to="/login" className="text-white hover:text-yellow-400 transition-all">Login</Link>
        </div>

        {/* Hamburger Icon for Record Links - Fixed on Right */}
        <div className="relative">
          <button
            onClick={toggleRecordMenu}
            className="text-white hover:text-yellow-400 transition-all"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12M6 6h12M6 18h12" />
            </svg>
          </button>

          {/* Record Links Dropdown */}
          {isRecordMenuOpen && (
            <div className="absolute top-12 right-0 bg-gray-700 p-4 rounded-md space-y-2 text-white">
              <Link to="/record-attendance" className="block hover:text-yellow-400">Record Attendance</Link>
              <Link to="/record-course" className="block hover:text-yellow-400">Record Course</Link>
              <Link to="/record-panel" className="block hover:text-yellow-400">Record Panel</Link>
              <Link to="/record-student" className="block hover:text-yellow-400">Record Student</Link>
              <Link to="/record-subject" className="block hover:text-yellow-400">Record Subject</Link>
              <Link to="/record-teacher" className="block hover:text-yellow-400">Record Teacher</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
