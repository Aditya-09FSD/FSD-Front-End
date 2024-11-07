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
import { Navbar, About, Achievements, Admission, Contact } from "./components";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/achievments" element={<Achievements />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/student" element={<StudentDash />} />
        <Route path="/teacher" element={<TeachDash />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
