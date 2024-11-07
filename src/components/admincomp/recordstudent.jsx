import React, { useState, useEffect } from "react";
import axios from "axios";

function RecordStudent() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    prn: "",
    name: "",
    panel: "",
    roll_no: "",
    course: "",
  });
  const [isCardVisible, setIsCardVisible] = useState(true); // State to control visibility of the card

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRes = await axios.get("/api/courses");
        setCourses(coursesRes.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/students", form);
      alert("Student data saved successfully");
      setForm({
        prn: "",
        name: "",
        panel: "",
        roll_no: "",
        course: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseCard = () => {
    setIsCardVisible(false); // Hide the card when the close button is clicked
  };

  if (!isCardVisible) return null; // Return null if the card is not visible

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleCloseCard}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Record Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              PRN:
            </label>
            <input
              type="number"
              name="prn"
              value={form.prn}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Panel:
            </label>
            <input
              type="text"
              name="panel"
              value={form.panel}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Roll Number:
            </label>
            <input
              type="number"
              name="roll_no"
              value={form.roll_no}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Course:
            </label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecordStudent;
