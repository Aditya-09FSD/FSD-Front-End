import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { useAuth } from "../context";
import {
  LogoutOutlined,
  DashboardOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { logout, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const todash = () => {
    if (role === "teacher") {
      navigate("/teacher");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  const tologin = () => {
    navigate("/login");
  };

  useEffect(() => {
    setIsMenuVisible(false);
  }, [location.pathname]);

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between">
        <h1
          onClick={handleMenuToggle}
          className="cursor-pointer text-xl font-semibold text-white"
        >
          Blue Bells Engineering College
        </h1>

        {/* Hamburger Icon */}
        <button
          onClick={handleMenuToggle}
          className="text-white text-2xl md:hidden focus:outline-none"
        >
          <MenuOutlined />
        </button>

        {/* Menu Items */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto transition-all duration-700 bg-gray-800 md:bg-transparent ${
            isMenuVisible ? "opacity-100" : "opacity-0 md:opacity-100 md:flex"
          }`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 text-center md:text-left py-4 md:py-0">
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-yellow-400 transition-all"
            >
              About
            </Link>
            <Link
              to="/achievement"
              className="text-white hover:text-yellow-400 transition-all"
            >
              Achievements
            </Link>
            <Link
              to="/admissions"
              className="text-white hover:text-yellow-400 transition-all"
            >
              Admissions
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-yellow-400 transition-all"
            >
              Contact
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 items-center md:ml-auto py-4 md:py-0">
            {!isLoggedIn ? (
              <Button
                onClick={tologin}
                type="primary"
                icon={<LoginOutlined />}
                danger
                style={{
                  borderRadius: "50px",
                  padding: "0 20px",
                  fontWeight: "600",
                  backgroundColor: "blue",
                  borderColor: "darkblue",
                }}
              >
                Login
              </Button>
            ) : (
              <>
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
                <Button
                  onClick={todash}
                  type="primary"
                  icon={<DashboardOutlined />}
                  style={{
                    borderRadius: "50px",
                    padding: "0 20px",
                    fontWeight: "600",
                    backgroundColor: "green",
                    borderColor: "darkgreen",
                  }}
                >
                  To Dashboard
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
