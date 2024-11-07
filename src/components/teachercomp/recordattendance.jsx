import React, { useState, useEffect } from "react";
import axios from "axios";

function RecordAttendance() {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({
    date: "",
    subject: "",
    students: [],
  });
  const [message, setMessage] = useState(null);

  // Fetch subjects and students when the component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/subjects"); // Adjust the API path as needed
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students"); // Adjust the API path as needed
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchSubjects();
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData({ ...attendanceData, [name]: value });
  };

  const handleAttendanceChange = (stdId) => {
    setAttendanceData((prevData) => {
      const updatedStudents = prevData.students.map((student) =>
        student.stdId === stdId
          ? { ...student, attendance: !student.attendance }
          : student
      );
      return { ...prevData, students: updatedStudents };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/Models/AttendanceModel",
        attendanceData
      ); // Adjust the API path
      setMessage("Attendance recorded successfully!");
      setAttendanceData({
        date: "",
        subject: "",
        students: [],
      });
    } catch (error) {
      setMessage("Error recording attendance. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Record Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={attendanceData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            name="subject"
            value={attendanceData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Students
          </label>
          {students.map((student) => (
            <div key={student._id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={attendanceData.students.some(
                  (att) => att.stdId === student._id && att.attendance
                )}
                onChange={() => handleAttendanceChange(student._id)}
                className="h-4 w-4"
              />
              <label>{student.name}</label>
            </div>
          ))}
        </div>

        {message && <p className="text-green-500">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
}

export default RecordAttendance;
