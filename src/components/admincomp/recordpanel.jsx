import React, { useState } from "react";
import axios from "axios";
import { Select, Input, Button, Form, Table } from "antd";
import Swal from "sweetalert2";
import { apiurl } from "../../devdata/constants";
import { useAuth } from "../../context";
import Cookies from "js-cookie";
import { StopOutlined } from "@ant-design/icons";

function RecordPanel() {
  const [form, setForm] = useState({
    name: "", // Added name field
    course: "",
    timetable: [{ subject: "", location: "", timing: "", day: "" }], // Added day to the timetable structure
  });
  const { courses, subjectArray, loadingCourses } = useAuth();
  const [loading, setLoading] = useState(false);

  // Define available time slots
  const timeSlots = [
    "8:30 - 9:30",
    "9:30 - 10:30",
    "10:45 - 12:45",
    "8:30 - 10:30",
    "10:45 - 11:45",
    "11:45 - 12:45",
    "1:30 - 2:30",
    "2:30 - 3:30",
    "1:30 - 3:30",
    "3:45 - 4:45",
  ];

  // Define available days of the week
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
        { subject: "", location: "", timing: "", day: "" },
      ],
    });
  };

  // Remove a timetable entry
  const removeTimetableEntry = (index) => {
    const newTimetable = form.timetable.filter((_, i) => i !== index);
    setForm({ ...form, timetable: newTimetable });
  };

  // Handle form submission
  const handleSubmit = async (value) => {
    setLoading(true);

    // Validate timetable data
    for (let entry of form.timetable) {
      if (!entry.subject || !entry.location || !entry.timing || !entry.day) {
        Swal.fire({
          title: "Error",
          text: "Please fill in all the fields in the timetable.",
          icon: "error",
          confirmButtonText: "Okay",
        });
        setLoading(false);
        return;
      }
    }

    try {
      const token = Cookies.get("token");

      await axios.post(`${apiurl}/panels`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        title: "Success!",
        text: "Panel data saved successfully",
        icon: "success",
        confirmButtonText: "Okay",
      });
      setForm({
        name: "",
        course: "",
        timetable: [{ subject: "", location: "", timing: "", day: "" }],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "There was an issue submitting the form. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };

  // Columns for timetable table
  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      render: (text, record, index) => (
        <Select
          value={record.subject}
          onChange={(value) =>
            handleFormChange({ name: "subject", value }, "timetable", index)
          }
          placeholder="Select Subject"
          options={subjectArray.map((subject) => ({
            value: subject._id,
            label: subject.name,
          }))}
          dropdownStyle={{ width: "250px" }}
          size="large"
        />
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (text, record, index) => (
        <Input
          value={record.location}
          onChange={(e) =>
            handleFormChange(
              { name: "location", value: e.target.value },
              "timetable",
              index
            )
          }
          placeholder="Location"
        />
      ),
    },
    {
      title: "Timing",
      dataIndex: "timing",
      render: (text, record, index) => (
        <Select
          value={record.timing}
          onChange={(value) =>
            handleFormChange({ name: "timing", value }, "timetable", index)
          }
          placeholder="Select Timing"
          options={timeSlots.map((slot) => ({
            value: slot,
            label: slot,
          }))}
          size="large"
          dropdownStyle={{ width: "120px" }}
        />
      ),
    },
    {
      title: "Day",
      dataIndex: "day",
      render: (text, record, index) => (
        <Select
          value={record.day}
          onChange={(value) =>
            handleFormChange({ name: "day", value }, "timetable", index)
          }
          placeholder="Select Day"
          options={daysOfWeek.map((day) => ({
            value: day,
            label: day,
          }))}
          size="large"
          dropdownStyle={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Button
          icon={<StopOutlined />}
          danger
          onClick={() => removeTimetableEntry(index)}
        />
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Record Panel
        </h2>
        <Form onFinish={handleSubmit} layout="vertical" className="space-y-6">
          {/* Name Input */}
          <Form.Item label="Name" name="name" required>
            <Input
              value={form.name}
              onChange={(e) => handleFormChange(e.target.value, "name")}
              placeholder="Enter your name"
            />
          </Form.Item>

          {/* Course Selection */}
          <Form.Item label="Course" name="course" required>
            <Select
              value={form.course}
              placeholder="Select course"
              onChange={(value) => handleFormChange(value, "course")}
              loading={loadingCourses}
              allowClear
              className="w-full"
              disabled={loading}
            >
              {loadingCourses ? (
                <Select.Option value="">Loading...</Select.Option>
              ) : (
                courses.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {course.year} {"Y "} {course.courseName} {course.branch}{" "}
                    {course.specialization}
                  </Select.Option>
                ))
              )}
            </Select>
          </Form.Item>

          {/* Timetable Table */}
          <Form.Item label="Timetable" required>
            <Table
              columns={columns}
              dataSource={form.timetable}
              rowKey={(record, index) => index}
              pagination={false}
              size="middle"
              footer={() => (
                <Button type="primary" onClick={addTimetableEntry}>
                  Add Timetable Entry
                </Button>
              )}
            />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RecordPanel;
