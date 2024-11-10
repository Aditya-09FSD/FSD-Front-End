import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  AdminDash,
  StudentDash,
  TeachDash,
  Reset,
  ErrorPage,
} from "./pages";
import { useAuth } from "./context";
import {
  About,
  Achievements,
  Admission,
  Contact,
  Footer,
  Privacy,
} from "./components";
const Navs = () => {
  const { isLoggedIn, role } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/achievement" element={<Achievements />} />
          <Route path="/admissions" element={<Admission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />

          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          {isLoggedIn &&
            (role === "admin" ? (
              <Route path="/admin" element={<AdminDash />} />
            ) : role === "teacher" ? (
              <Route path="/teacher" element={<TeachDash />} />
            ) : (
              role === "user" && (
                <Route path="/student" element={<StudentDash />} />
              )
            ))}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default Navs;
