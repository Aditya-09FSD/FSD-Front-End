import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievement';
import Footer from './components/Footer';

import Signup from './components/Signup';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';

import Attendance from './components/Attendance';

import RecordAttendance from './components/RecordAttendence';
import RecordCourse from './components/RecordCourse';
import RecordPanel from './components/RecordPanel';
import RecordStudent from './components/RecordStudent';
import RecordSubject from './components/RecordSubject';
import RecordTeacherCard from './components/RecordTeacherCard';





function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Main Route */}
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Achievements />
              <Footer />
            </>
          } />

          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/record-attendance" element={<RecordAttendance />} />
          <Route path="/record-course" element={<RecordCourse />} />
          <Route path="/record-panel" element={<RecordPanel />} />
          <Route path="/record-student" element={<RecordStudent />} />
          <Route path="/record-subject" element={<RecordSubject />} />
          <Route path="/record-teacher" element={<RecordTeacherCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



