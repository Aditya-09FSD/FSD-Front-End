import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "../../devdata/constants";
import Cookies from "js-cookie";
import { useAuth } from "../../context";
import { Button, Input, Select, Checkbox, Form, Space, Typography } from "antd";
import Swal from "sweetalert2";

const { Title } = Typography;

function RecordAttendance() {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({
    date: "",
    course: "",
    subject: "",
    panel: "",
    students: [],
  });

  const { userdet } = useAuth();

  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [filteredPanels, setFilteredPanels] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

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
        setFilteredStudents(fetchedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleCourseChange = (value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      course: value,
      subject: "",
      panel: "",
    }));

    const selectedCourse = userdet.courses.find(
      (course) => course._id === value
    );
    setFilteredSubjects(selectedCourse ? selectedCourse.subjects : []);
  };

  // Handle subject selection
  const handleSubjectChange = (value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      subject: value,
      panel: "", // Reset panel when subject changes
    }));

    // Find the subject and filter panels
    const selectedSubject = userdet.courses
      .flatMap((course) => course.subjects)
      .find((subject) => subject._id === value);

    setFilteredPanels(selectedSubject ? selectedSubject.panels : []);
  };

  // Handle panel selection
  const handlePanelChange = (value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      panel: value,
    }));

    // Filter students based on selected panel
    const selectedPanel = userdet.panels.find((panel) => panel._id === value);
    const studentsInPanel = filteredStudents.filter(
      (student) => student.panel._id === selectedPanel._id
    );

    setFilteredStudents(studentsInPanel); // Update student list based on selected panel
  };

  // Handle attendance change
  const handleAttendanceChange = (stdId) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) =>
        student.stdId === stdId
          ? { ...student, attendance: !student.attendance }
          : student
      ),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(`${apiurl}/attendance`, attendanceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Attendance recorded successfully!",
        icon: "success",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "ant-btn ant-btn-primary",
        },
      });
      setAttendanceData({
        date: "",
        course: "",
        subject: "",
        panel: "",
        students: filteredStudents.map((student) => ({
          stdId: student._id,
          attendance: false,
        })),
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error recording attendance. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
        customClass: {
          confirmButton: "ant-btn ant-btn-danger",
        },
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
        Record Attendance
      </Title>
      <Form
        onFinish={handleSubmit}
        className="space-y-6"
        layout="vertical"
        initialValues={attendanceData}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date!" }]}
        >
          <Input
            type="date"
            name="date"
            value={attendanceData.date}
            onChange={(e) =>
              setAttendanceData({ ...attendanceData, date: e.target.value })
            }
            style={{
              borderRadius: "10px",
              padding: "10px",
              border: "1px solid #dcdfe6",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Course"
          name="course"
          rules={[{ required: true, message: "Please select a course!" }]}
        >
          <Select
            value={attendanceData.course}
            onChange={handleCourseChange}
            options={userdet.courses.map((course) => ({
              value: course._id,
              label: course.courseName,
            }))}
            placeholder="Select a course"
          />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: "Please select a subject!" }]}
        >
          <Select
            value={attendanceData.subject}
            onChange={handleSubjectChange}
            options={filteredSubjects.map((subject) => ({
              value: subject._id,
              label: subject.name,
            }))}
            placeholder="Select a subject"
          />
        </Form.Item>

        <Form.Item
          label="Panel"
          name="panel"
          rules={[{ required: true, message: "Please select a panel!" }]}
        >
          <Select
            value={attendanceData.panel}
            onChange={handlePanelChange}
            options={filteredPanels.map((panel) => ({
              value: panel._id,
              label: panel.name,
            }))}
            placeholder="Select a panel"
          />
        </Form.Item>

        <Form.Item label="Students">
          {filteredStudents.map((student) => (
            <Space
              key={student._id}
              style={{ display: "flex", marginBottom: "10px" }}
            >
              <Checkbox
                checked={attendanceData.students.some(
                  (att) => att.stdId === student._id && att.attendance
                )}
                onChange={() => handleAttendanceChange(student._id)}
                style={{ fontSize: "16px", padding: "5px" }}
              />
              <span style={{ fontSize: "16px", color: "#555" }}>
                {student.name}
              </span>
            </Space>
          ))}
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            borderRadius: "10px",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            padding: "12px 0",
            fontSize: "16px",
          }}
        >
          Submit Attendance
        </Button>
      </Form>
    </div>
  );
}

export default RecordAttendance;
