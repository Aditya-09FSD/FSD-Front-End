import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message, Form } from "antd";
import Swal from "sweetalert2";
import { apiurl } from "../../devdata/constants";
import Cookies from "js-cookie";

function RecordCourse() {
  const [courseData, setCourseData] = useState({
    courseName: "",
    branch: "",
    year: "",
    specialization: "",
    num_of_panels: "",
    num_of_students: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await axios.post(`${apiurl}/courses`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Course Recorded Successfully!",
          text: "The course data has been successfully saved.",
        });
        setCourseData({
          courseName: "",
          branch: "",
          year: "",
          specialization: "",
          num_of_panels: "",
          num_of_students: "",
        });
      }
    } catch (error) {
      message.error("Error recording course. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Record Course</h2>
      <Form onSubmit={handleSubmit} layout="vertical" className="space-y-6">
        <Form.Item label="Course Name" required>
          <Input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            placeholder="Enter course name"
          />
        </Form.Item>

        <Form.Item label="Branch" required>
          <Input
            type="text"
            name="branch"
            value={courseData.branch}
            onChange={handleChange}
            placeholder="Enter branch name"
          />
        </Form.Item>

        <Form.Item label="Year" required>
          <Input
            type="text"
            name="year"
            value={courseData.year}
            onChange={handleChange}
            placeholder="Enter year"
          />
        </Form.Item>

        <Form.Item label="Specialization" required>
          <Input
            type="text"
            name="specialization"
            value={courseData.specialization}
            onChange={handleChange}
            placeholder="Enter specialization"
          />
        </Form.Item>

        <Form.Item label="Number of Panels" required>
          <Input
            type="number"
            name="num_of_panels"
            value={courseData.num_of_panels}
            onChange={handleChange}
            placeholder="Enter number of panels"
          />
        </Form.Item>

        <Form.Item label="Number of Students" required>
          <Input
            type="number"
            name="num_of_students"
            value={courseData.num_of_students}
            onChange={handleChange}
            placeholder="Enter number of students"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Course
        </Button>
      </Form>
    </div>
  );
}

export default RecordCourse;
