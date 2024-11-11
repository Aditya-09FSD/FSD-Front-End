import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { useAuth } from "../context";
import {
  LogoutOutlined,
  DashboardOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { logout, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTitleClick = () => {
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
          onClick={handleTitleClick}
          className={`cursor-pointer text-xl font-semibold transition-all duration-700 transform ${
            isMenuVisible
              ? "text-gray-400 translate-x-0"
              : "mx-auto text-white translate-x-0"
          }`}
        >
          Blue Bells Engineering College
        </h1>

        <div
          className={`transition-opacity duration-700 flex items-center space-x-6 ${
            isMenuVisible ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <div className="flex space-x-4">
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

          <div className="flex space-x-4 ml-auto">
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
