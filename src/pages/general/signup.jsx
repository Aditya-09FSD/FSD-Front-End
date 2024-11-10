import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "../../devdata/constants";
import { Loading } from "../../components";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Tabs, Input, Button, Form, notification, Select } from "antd";
import { useAuth } from "../../context";

const { TabPane } = Tabs;

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    prn: "",
    panel: "",
    roll_no: "",
    course: "",
    subjects: [],
    role: "student",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const {
    courses,
    loadingCourses,
    error,
    panelArray,
    subjectArray,
    loadingPanels,
    loadingSubjects,
  } = useAuth();
  const [filteredPanels, setFilteredPanels] = useState([]);
  useEffect(() => {
    if (courses && courses.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        course: courses[0].courseName, // Assuming courses contain 'courseName'
      }));
    }
  }, [courses]);

  // Handle changes for normal form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes for the course dropdown
  const handleCourseChange = (value) => {
    setFormData({ ...formData, course: value });
  };

  // Handle subject and panel management
  const handleSubjectChange = (value, index) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index].subname = value; // Update subject name in the respective subject
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { subname: "", panels: [""] }],
    });
  };

  const addPanel = (index) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index].panels.push("");
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    console.log(e);

    try {
      const token = Cookies.get("token");

      const response = await axios.post(`${apiurl}/users/signup`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        await Swal.fire({
          title: "Signup Successful!",
          text: "You can now log in with your credentials.",
          icon: "success",
          confirmButtonText: "Proceed to Login",
        });
      }
    } catch (err) {
      notification.error({
        message: "Signup Failed",
        description: "Error occurred during signup. Please check your details.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (formData.course) {
      const filtered = panelArray.filter(
        (panel) => panel.course === formData.course
      );
      setFilteredPanels(filtered);
    }
  }, [formData.course, panelArray]);

  useEffect(() => {
    if (formData.course) {
      const subjectsForCourse = subjectArray.filter(
        (subject) => subject.course === formData.course
      );
      setFilteredSubjects(subjectsForCourse);
    } else {
      setFilteredSubjects([]);
    }
  }, [formData.course, subjectArray]);

  const handleTabChange = (key) => {
    setFormData({ ...formData, role: key });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 sm:text-4xl">
          Create Account For
        </h2>

        <Tabs defaultActiveKey="student" onChange={handleTabChange}>
          <TabPane tab="Student" key="student">
            <Form onFinish={handleSubmit}>
              {/* Form fields for Student */}
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="username"
                rules={[{ required: true }]}
              >
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true }]}
              >
                <Input.Password
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="PRN" name="prn" rules={[{ required: true }]}>
                <Input
                  name="prn"
                  value={formData.prn}
                  onChange={handleChange}
                />
              </Form.Item>

              {/* Course dropdown for students */}
              <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true }]}
              >
                {loadingCourses ? (
                  <div>Loading courses...</div>
                ) : error ? (
                  <div style={{ color: "red" }}>Error loading courses</div>
                ) : (
                  <Select
                    name="course"
                    value={formData.course}
                    onChange={handleCourseChange}
                  >
                    {courses.map((course) => (
                      <Select.Option key={course._id} value={course._id}>
                        {course.year} {"Y "} {course.courseName} {course.branch}{" "}
                        {course.specialization}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              {/* Panel dropdown */}
              <Form.Item
                label="Panel"
                name="panel"
                rules={[{ required: true }]}
              >
                {loadingPanels ? (
                  <div>Loading panels...</div>
                ) : error ? (
                  <div style={{ color: "red" }}>Error loading panels</div>
                ) : (
                  <Select
                    name="panel"
                    value={formData.panel}
                    onChange={(value) =>
                      setFormData({ ...formData, panel: value })
                    }
                  >
                    {filteredPanels.map((panel) => (
                      <Select.Option key={panel._id} value={panel._id}>
                        {panel.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                label="Roll Number"
                name="roll_no"
                rules={[{ required: true }]}
              >
                <Input
                  name="roll_no"
                  value={formData.roll_no}
                  onChange={handleChange}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" className="w-full">
                Sign Up
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Teacher" key="teacher">
            <Form onFinish={handleSubmit}>
              {/* Form fields for Teacher */}
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="username"
                rules={[{ required: true }]}
              >
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true }]}
              >
                <Input.Password
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="PRN" name="prn" rules={[{ required: true }]}>
                <Input
                  name="prn"
                  value={formData.prn}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true }]}
              >
                {loadingCourses ? (
                  <div>Loading courses...</div>
                ) : error ? (
                  <div style={{ color: "red" }}>Error loading courses</div>
                ) : (
                  <Select
                    name="course"
                    value={formData.course}
                    onChange={handleCourseChange}
                  >
                    {courses.map((course) => (
                      <Select.Option key={course._id} value={course._id}>
                        {course.year} {"Y "} {course.courseName} {course.branch}{" "}
                        {course.specialization}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              {/* Subjects and Panels Management */}
              <div className="space-y-4">
                <label className="block font-semibold text-gray-700 mb-2">
                  Subjects
                </label>
                {formData.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-lg mb-4"
                  >
                    Subject
                    {loadingSubjects ? (
                      <div>Loading panels...</div>
                    ) : error ? (
                      <div style={{ color: "red" }}>Error loading panels</div>
                    ) : (
                      <Select
                        value={subject.subname}
                        onChange={(value) => handleSubjectChange(value, index)}
                        options={filteredSubjects.map((subject) => ({
                          value: subject._id,
                          label: subject.name,
                        }))}
                        placeholder="Select a subject"
                        className="w-full mb-4"
                      />
                    )}
                    <div className="mt-2">
                      Panels
                      {subject.panels.map((panel, panelIndex) => (
                        <div
                          key={panelIndex}
                          className="flex items-center space-x-2 mb-2"
                        >
                          {loadingPanels ? (
                            <div>Loading panels...</div>
                          ) : error ? (
                            <div style={{ color: "red" }}>
                              Error loading panels
                            </div>
                          ) : (
                            <Select
                              name="panel"
                              dropdownStyle={{ width: 100 }}
                              value={formData.panel}
                              onChange={(value) =>
                                setFormData({ ...formData, panel: value })
                              }
                              className="w-1/2"
                            >
                              {filteredPanels.map((panel) => (
                                <Select.Option
                                  key={panel._id}
                                  value={panel._id}
                                >
                                  {panel.name}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                          <button
                            type="button"
                            onClick={() => addPanel(index)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubject}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Another Subject
                </button>
              </div>
              <br />
              <Button type="primary" htmlType="submit" className="w-full">
                Sign Up
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Admin" key="admin">
            <Form onFinish={handleSubmit}>
              {/* Form fields for Admin */}
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="username"
                rules={[{ required: true }]}
              >
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true }]}
              >
                <Input.Password
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Sign Up
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Signup;
