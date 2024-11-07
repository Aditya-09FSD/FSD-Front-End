import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useAuth } from "../context";
import { LogoutOutlined } from "@ant-design/icons";

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { logout, isLoggedIn } = useAuth();

  const handleTitleClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo (Blue Bells Title) */}
        <h1
          onClick={handleTitleClick}
          className={`cursor-pointer text-xl font-semibold transition-all duration-700 ${
            isMenuVisible
              ? "text-gray-400 transform -translate-x-[40%]"
              : "mx-auto text-white"
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
            href="/achievments"
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
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-400 transition-all"
              >
                Login
              </Link>
            </>
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
      </div>
    </nav>
  );
}

export default Navbar;
