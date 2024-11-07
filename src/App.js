import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  AdminDash,
  StudentDash,
  TeachDash,
} from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/student" element={<StudentDash />} />
        <Route path="/teacher" element={<TeachDash />} />
      </Routes>
    </Router>
  );
}

export default App;
