import React, { useState, useEffect } from "react";
import { Tabs, Input, Button, Form, message, Select } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { apiurl } from "../../devdata/constants";
import { useAuth } from "../../context";
import Cookies from "js-cookie";

const { TabPane } = Tabs;

function RecordCourse() {
  const { courses, loadingCourses } = useAuth();
  const [courseData, setCourseData] = useState({
    courseName: "",
    branch: "",
    year: "",
    specialization: "",
    num_of_panels: "",
    num_of_students: "",
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  // Set initial course to first one in the list if available
  useEffect(() => {
    if (courses.length > 0) {
      setSelectedCourse(courses[0]._id); // Default to the first course
    }
  }, [courses]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle course selection from dropdown and pre-fill form fields
  const handleCourseChange = (value) => {
    const course = courses.find((course) => course._id === value);
    if (course) {
      setSelectedCourse(value);
      setCourseData({
        courseName: course.courseName,
        branch: course.branch,
        year: course.year,
        specialization: course.specialization,
        num_of_panels: course.num_of_panels,
        num_of_students: course.num_of_students,
      });
    }
  };

  // Handle form submission
  const handleSubmitc = async () => {
    try {
      const token = Cookies.get("token");

      await axios.patch(`${apiurl}/courses/${selectedCourse}`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Course Updated Successfully!",
        text: "The course data has been updated.",
      });
      // Clear form after submission
      setCourseData({
        courseName: "",
        branch: "",
        year: "",
        specialization: "",
        num_of_panels: "",
        num_of_students: "",
      });
    } catch (error) {
      message.error("Error updating course. Please try again.");
    }
  };
  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(`${apiurl}/courses`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    } catch (error) {
      message.error("Error recording course. Please try again.");
    }
  };

  return (
    <div className="py-10 bg-gradient-to-br from-pink-100 to-blue-100">
      <div className="max-w-lg mx-auto p-6 shadow-md rounded-lg bg-white mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Manage Courses</h2>
        <Tabs defaultActiveKey="record" centered>
          <TabPane tab="Record Course" key="record">
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              className="space-y-6"
            >
              {/* Same form for adding a new course */}
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
          </TabPane>

          <TabPane tab="Update Course" key="update">
            <Form
              onFinish={handleSubmitc}
              layout="vertical"
              className="space-y-6"
            >
              {/* Course Dropdown for selecting course */}
              <Form.Item label="Select Course" required>
                <Select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  loading={loadingCourses}
                  placeholder="Select a course"
                >
                  {courses.map((course) => (
                    <Select.Option key={course._id} value={course._id}>
                      {course.year} {"Y "} {course.courseName} {course.branch}{" "}
                      {course.specialization}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Editable course fields, pre-filled with selected course details */}
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
                Update Course
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default RecordCourse;
