import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  AdminDash,
  StudentDash,
  TeachDash,
  Reset,
  ErrorPage,
} from "./pages";
import { useAuth } from "./context";
import { About, Achievements, Admission, Contact, Footer } from "./components";
const Navs = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/achievments" element={<Achievements />} />
          <Route path="/admissions" element={<Admission />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && (
            <>
              <Route path="/admin" element={<AdminDash />} />
              <Route path="/student" element={<StudentDash />} />
              <Route path="/teacher" element={<TeachDash />} />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default Navs;
