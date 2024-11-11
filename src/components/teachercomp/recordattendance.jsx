import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../devdata/constants";
import Cookies from "js-cookie";
import { useAuth } from "../../context";
import { Button, Input, Select, Checkbox, Form, Space, Typography } from "antd";
import Swal from "sweetalert2";
const AttendanceForm = () => {
  const { userdet } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPanel, setSelectedPanel] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${apiurl}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedStudents = response.data.data.data;

        if (selectedPanel) {
          const filteredStudents = fetchedStudents.filter(
            (student) => student.panel._id === selectedPanel
          );
          setStudents(filteredStudents);
          setAttendanceData((prevData) => ({
            ...prevData,
            students: filteredStudents.map((student) => ({
              stdId: student._id,
              attendance: false,
            })),
          }));
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedPanel]);

  // Handler to select a course
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedSubject("");
    setSelectedPanel("");
  };

  // Handler to select a subject based on the course
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedPanel("");
  };

  // Handler to select a panel
  const handlePanelChange = (e) => {
    setSelectedPanel(e.target.value);
  };

  const handleAttendanceSubmit = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${apiurl}/attendance`,
        {
          date: new Date(),
          subject: selectedSubject,
          course: selectedCourse,
          panel: selectedPanel,
          students: attendanceData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Attendance submitted:", response.data);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div>
      <h1>Mark Attendance</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAttendanceSubmit();
        }}
      >
        <div>
          <label>Course</label>
          <select value={selectedCourse} onChange={handleCourseChange}>
            <option value="">Select Course</option>
            {userdet.subjects.map((subject) => (
              <option key={subject.course._id} value={subject.course._id}>
                {subject.course.courseName}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div>
            <label>Subject</label>
            <select value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {userdet.subjects
                .find((subject) => subject.course._id === selectedCourse)
                ?.subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {selectedSubject && (
          <div>
            <label>Panel</label>
            <select value={selectedPanel} onChange={handlePanelChange}>
              <option value="">Select Panel</option>
              {userdet.panels.map((panel) => (
                <option key={panel._id} value={panel._id}>
                  {panel.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedPanel && students.length > 0 && (
          <div>
            <h3>Students</h3>
            {students.map((student) => (
              <div key={student._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={attendanceData.some(
                      (data) => data.stdId === student._id && data.attendance
                    )}
                    onChange={() => {
                      setAttendanceData((prev) =>
                        prev.map((data) =>
                          data.stdId === student._id
                            ? { ...data, attendance: !data.attendance }
                            : data
                        )
                      );
                    }}
                  />
                  {student.name}
                </label>
              </div>
            ))}
          </div>
        )}

        <button type="submit">Submit Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
