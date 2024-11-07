import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Input, Button, Form, Space } from "antd";
import Swal from "sweetalert2"; // Import SweetAlert2
import { apiurl } from "../../devdata/constants";
import { useAuth } from "../../context";
import Cookies from "js-cookie";

function RecordPanel() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    selectedStudents: [],
    course: "",
    selectedTeachers: [],
    timetable: [{ subject: "", teacher: "", location: "", timing: "" }],
  });
  const { courses, subjectArray } = useAuth();

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const studentsRes = await axios.get(
          `${apiurl}/students`,

          { headers: { Authorization: `Bearer ${token}` } }
        );
        const teachersRes = await axios.get(
          `${apiurl}/teachers`,

          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStudents(studentsRes.data.data.data);
        setTeachers(teachersRes.data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: "Error",
          text: "There was an issue fetching data. Please try again.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    };
    fetchData();
  }, []);

  // Handle form field changes
  const handleFormChange = (value, name, index) => {
    if (name === "timetable") {
      const newTimetable = [...form.timetable];
      newTimetable[index][value.name] = value.value;
      setForm({ ...form, timetable: newTimetable });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add a new timetable entry
  const addTimetableEntry = () => {
    setForm({
      ...form,
      timetable: [
        ...form.timetable,
        { subject: "", teacher: "", location: "", timing: "" },
      ],
    });
  };

  // Remove a timetable entry
  const removeTimetableEntry = (index) => {
    const newTimetable = form.timetable.filter((_, i) => i !== index);
    setForm({ ...form, timetable: newTimetable });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");

      await axios.post(
        `${apiurl}/panels`,
        form,

        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: "Success!",
        text: "Panel data saved successfully",
        icon: "success",
        confirmButtonText: "Okay",
      });
      setForm({
        selectedStudents: [],
        course: "",
        selectedTeachers: [],
        timetable: [{ subject: "", teacher: "", location: "", timing: "" }],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "There was an issue submitting the form. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Record Panel
        </h2>
        <Form onFinish={handleSubmit} layout="vertical" className="space-y-6">
          {/* Course Selection */}
          <Form.Item label="Course" name="course" required>
            <Select
              value={form.course}
              onChange={(value) => handleFormChange(value, "course")}
              placeholder="Select Course"
              options={courses.map((course) => ({
                value: course._id,
                label: course.courseName,
              }))}
            />
          </Form.Item>

          {/* Students Selection */}
          <Form.Item label="Students" name="selectedStudents" required>
            <Select
              mode="multiple"
              value={form.selectedStudents}
              onChange={(value) => handleFormChange(value, "selectedStudents")}
              placeholder="Select Students"
              options={students.map((student) => ({
                value: student._id,
                label: student.name,
              }))}
            />
          </Form.Item>

          {/* Teachers Selection */}
          <Form.Item label="Teachers" name="selectedTeachers" required>
            <Select
              mode="multiple"
              value={form.selectedTeachers}
              onChange={(value) => handleFormChange(value, "selectedTeachers")}
              placeholder="Select Teachers"
              options={teachers.map((teacher) => ({
                value: teacher._id,
                label: teacher.name,
              }))}
            />
          </Form.Item>

          {/* Timetable Entries */}
          <Form.Item label="Timetable" required>
            {form.timetable.map((entry, index) => (
              <div key={index} className="mb-4">
                <Space size="middle">
                  Subject
                  <Select
                    name="subject"
                    value={entry.subject}
                    onChange={(value) =>
                      handleFormChange(
                        { name: "subject", value },
                        "timetable",
                        index
                      )
                    }
                    placeholder="Select Subject"
                    options={subjectArray.map((subject) => ({
                      value: subject._id,
                      label: subject.name,
                    }))}
                    className="w-1/4"
                  />
                  Teacher
                  <Select
                    name="teacher"
                    value={entry.teacher}
                    onChange={(value) =>
                      handleFormChange(
                        { name: "teacher", value },
                        "timetable",
                        index
                      )
                    }
                    placeholder="Select Teacher"
                    options={teachers.map((teacher) => ({
                      value: teacher._id,
                      label: teacher.name,
                    }))}
                    className="w-1/4"
                  />
                  Location
                  <Input
                    name="location"
                    value={entry.location}
                    onChange={(e) =>
                      handleFormChange(
                        { name: "location", value: e.target.value },
                        "timetable",
                        index
                      )
                    }
                    placeholder="Location"
                    className="w-1/4"
                  />
                  Timmings
                  <Input
                    name="timing"
                    value={entry.timing}
                    onChange={(e) =>
                      handleFormChange(
                        { name: "timing", value: e.target.value },
                        "timetable",
                        index
                      )
                    }
                    placeholder="Timing"
                    className="w-1/4"
                  />
                  <Button
                    type="danger"
                    onClick={() => removeTimetableEntry(index)}
                    icon="delete"
                  >
                    Remove
                  </Button>
                </Space>
              </div>
            ))}
            <Button type="primary" onClick={addTimetableEntry}>
              Add Timetable Entry
            </Button>
          </Form.Item>

          {/* Submit Button */}
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RecordPanel;
