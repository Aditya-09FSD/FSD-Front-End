import React, { useState, useEffect } from "react";
import axios from "axios";

function RecordPanel() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    selectedStudents: [],
    course: "",
    selectedTeachers: [],
    timetable: [{ subject: "", teacher: "", location: "", timing: "" }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get("/api/students");
        const coursesRes = await axios.get("/api/courses");
        const teachersRes = await axios.get("/api/teachers");
        const subjectsRes = await axios.get("/api/subjects");

        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        setTeachers(teachersRes.data);
        setSubjects(subjectsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (e, index, field) => {
    if (field === "timetable") {
      const newTimetable = [...form.timetable];
      newTimetable[index][e.target.name] = e.target.value;
      setForm({ ...form, timetable: newTimetable });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addTimetableEntry = () => {
    setForm({
      ...form,
      timetable: [
        ...form.timetable,
        { subject: "", teacher: "", location: "", timing: "" },
      ],
    });
  };

  const removeTimetableEntry = (index) => {
    const newTimetable = form.timetable.filter((_, i) => i !== index);
    setForm({ ...form, timetable: newTimetable });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/panels", form);
      alert("Panel data saved successfully");
      setForm({
        selectedStudents: [],
        course: "",
        selectedTeachers: [],
        timetable: [{ subject: "", teacher: "", location: "", timing: "" }],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Record Panel
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Course:
            </label>
            <select
              name="course"
              value={form.course}
              onChange={(e) => handleFormChange(e)}
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

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Students:
            </label>
            <select
              multiple
              name="selectedStudents"
              value={form.selectedStudents}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedStudents: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            >
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Teachers:
            </label>
            <select
              multiple
              name="selectedTeachers"
              value={form.selectedTeachers}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedTeachers: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            >
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Timetable:
            </label>
            {form.timetable.map((entry, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-lg mb-4"
              >
                <select
                  name="subject"
                  value={entry.subject}
                  onChange={(e) => handleFormChange(e, index, "timetable")}
                  className="border border-gray-300 rounded-lg p-2 mr-2 w-full focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <select
                  name="teacher"
                  value={entry.teacher}
                  onChange={(e) => handleFormChange(e, index, "timetable")}
                  className="border border-gray-300 rounded-lg p-2 mr-2 w-full focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={entry.location}
                  onChange={(e) => handleFormChange(e, index, "timetable")}
                  className="border border-gray-300 rounded-lg p-2 mr-2 w-full focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  name="timing"
                  placeholder="Timing"
                  value={entry.timing}
                  onChange={(e) => handleFormChange(e, index, "timetable")}
                  className="border border-gray-300 rounded-lg p-2 mr-2 w-full focus:ring focus:ring-blue-200"
                />
                <button
                  type="button"
                  onClick={() => removeTimetableEntry(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTimetableEntry}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Add Timetable Entry
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecordPanel;
