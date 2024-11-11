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
    subject: "",
    students: [],
  });
  const { subjectArray } = useAuth();

  // Fetch students when the component mounts
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

        // Initialize students in attendanceData with default attendance set to false
        setAttendanceData((prevData) => ({
          ...prevData,
          students: fetchedStudents.map((student) => ({
            stdId: student._id,
            attendance: false,
          })),
        }));
        setStudents(fetchedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubjectChange = (value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      subject: value,
    }));
  };

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
        subject: "",
        students: students.map((student) => ({
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
            onChange={handleChange}
            style={{
              borderRadius: "10px",
              padding: "10px",
              border: "1px solid #dcdfe6",
            }}
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
            options={subjectArray.map((subjectOption) => ({
              value: subjectOption._id,
              label: subjectOption.name,
            }))}
            placeholder="Select a subject"
            className="w-full mb-4"
          />
        </Form.Item>

        <Form.Item label="Students">
          {students.map((student) => (
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
