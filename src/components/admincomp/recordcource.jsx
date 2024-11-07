import React, { useState, useEffect } from "react";
import axios from "axios";

function RecordCourse() {
  const [courseData, setCourseData] = useState({
    courseName: "",
    branch: "",
    year: "",
    specialization: "",
    num_of_panels: "",
    num_of_students: "",
    subjects: [],
    faculties: [],
  });
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState(null);

  // Fetch subjects and teachers on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/subjects"); // Adjust API path as needed
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/teachers"); // Adjust API path as needed
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchSubjects();
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubjectsChange = (e) => {
    const { options } = e.target;
    const selectedSubjects = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setCourseData({ ...courseData, subjects: selectedSubjects });
  };

  const handleFacultiesChange = (e) => {
    const { options } = e.target;
    const selectedFaculties = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setCourseData({ ...courseData, faculties: selectedFaculties });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/courses", courseData); // Adjust API path as needed
      setMessage("Course recorded successfully!");
      setCourseData({
        courseName: "",
        branch: "",
        year: "",
        specialization: "",
        num_of_panels: "",
        num_of_students: "",
        subjects: [],
        faculties: [],
      });
    } catch (error) {
      setMessage("Error recording course. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Record Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Branch
          </label>
          <input
            type="text"
            name="branch"
            value={courseData.branch}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={courseData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={courseData.specialization}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Panels
          </label>
          <input
            type="number"
            name="num_of_panels"
            value={courseData.num_of_panels}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Students
          </label>
          <input
            type="number"
            name="num_of_students"
            value={courseData.num_of_students}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subjects
          </label>
          <select
            name="subjects"
            multiple
            value={courseData.subjects}
            onChange={handleSubjectsChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Faculties
          </label>
          <select
            name="faculties"
            multiple
            value={courseData.faculties}
            onChange={handleFacultiesChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {message && <p className="text-green-500">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
}

export default RecordCourse;
