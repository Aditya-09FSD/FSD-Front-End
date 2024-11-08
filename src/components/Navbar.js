import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useAuth } from "../context";
import { LogoutOutlined } from "@ant-design/icons";

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isRecordMenuOpen, setIsRecordMenuOpen] = useState(false);
  const { logout, isLoggedIn } = useAuth();

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
          className={`cursor-pointer text-xl font-semibold transition-all duration-700 transform ${
            isMenuVisible
              ? "text-gray-400 translate-x-0"
              : "mx-auto text-white translate-x-0"
          }`}
        >
          Blue Bells Public School
        </h1>

        {/* Main Menu Items - Appear When Title Slides Left */}
        <div
          className={`transition-opacity duration-700 flex space-x-4 ${
            isMenuVisible ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <a
            href="/"
            className="text-white hover:text-yellow-400 transition-all"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-white hover:text-yellow-400 transition-all"
          >
            About
          </a>
          <a
            href="/achievement"
            className="text-white hover:text-yellow-400 transition-all"
          >
            Achievements
          </a>
          <a
            href="/admissions"
            className="text-white hover:text-yellow-400 transition-all"
          >
            Admissions
          </a>
          <a
            href="/contact"
            className="text-white hover:text-yellow-400 transition-all"
          >
            Contact
          </a>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-white hover:text-yellow-400 transition-all"
            >
              Login
            </Link>
          ) : (
            <Button
              onClick={logout}
              type="primary"
              icon={<LogoutOutlined />}
              danger
              style={{
                borderRadius: "50px",
                padding: "0 20px",
                fontWeight: "600",
                backgroundColor: "#ff4d4f",
                borderColor: "#ff4d4f",
              }}
            >
              Log Out
            </Button>
          )}
        </div>

        {/* Hamburger Icon for Record Links (Optional) */}
        {/* <div className="relative">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 12h12M6 6h12M6 18h12"
              />
            </svg>
          </button>
        </div> */}

        {/* Record Links Dropdown */}
        {/* {isRecordMenuOpen && (
            <div className="absolute top-12 right-0 bg-gray-700 p-4 rounded-md space-y-2 text-white">
              <Link to="/admin" className="block hover:text-yellow-400">
                Admin Dashboard
              </Link>
              <Link to="/teacher" className="block hover:text-yellow-400">
                Teacher Dashboard
              </Link>
              <Link
                to="#"
                className="block hover:text-yellow-400"
                onClick={() => alert("We are working on it")}
              >
                Student Dashboard
              </Link>
            </div>
          )} */}
      </div>
    </nav>
  );
}

export default Navbar;
