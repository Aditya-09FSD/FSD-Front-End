import React, { useState, useEffect } from "react";
import { Tabs, Input, Button, Select, Form, message } from "antd";
import axios from "axios";
import { useAuth } from "../../context";
import { apiurl } from "../../devdata/constants";
import Cookies from "js-cookie";

const { TabPane } = Tabs;

function RecordSubject() {
  const [form] = Form.useForm();
  const { courses, loadingCourses, subjectArray, loadingSubjects } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (subjectArray && subjectArray.length > 0) {
      setSelectedSubject(subjectArray[0]._id); // Set the first subject as default for update
    }
  }, [subjectArray]);

  // Handle form submission for creating a new subject
  const handleSubmit = async (values) => {
    setLoadingSubmit(true);
    try {
      const token = Cookies.get("token");
      values.units = values.units.map((unit) => unit.unit);
      await axios.post(`${apiurl}/subjects`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Subject data saved successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        "There was an issue saving the subject data. Please try again."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Handle form submission for updating an existing subject
  const handleUpdate = async (values) => {
    setLoadingSubmit(true);
    try {
      const token = Cookies.get("token");
      values.units = values.units.map((unit) => unit.unit);
      await axios.patch(`${apiurl}/subjects/${selectedSubject?._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Subject updated successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error updating subject:", error);
      message.error(
        "There was an issue updating the subject. Please try again."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Handle subject selection for update
  const handleSubjectChange = (value) => {
    const selected = subjectArray.find((subject) => subject._id === value);
    if (selected) {
      setSelectedSubject(selected);
      form.setFieldsValue({
        name: selected.name,
        course: selected.course,
        units: selected.units,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl transform transition duration-300 ease-in-out relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Manage Subjects
        </h2>

        <Tabs
          defaultActiveKey="create"
          centered
          onTabClick={() => {
            form.resetFields();
          }}
        >
          {/* Create Tab */}
          <TabPane tab="Create Subject" key="create">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                name: "",
                course: "",
                units: [""],
              }}
            >
              <Form.Item
                name="name"
                label="Subject Name"
                rules={[
                  { required: true, message: "Please enter the subject name!" },
                ]}
              >
                <Input placeholder="Enter subject name" allowClear />
              </Form.Item>

              <Form.Item
                name="course"
                label="Course"
                rules={[{ required: true, message: "Please select a course!" }]}
              >
                <Select placeholder="Select course" loading={loadingCourses}>
                  {courses.map((course) => (
                    <Select.Option key={course._id} value={course._id}>
                      {course.year} {course.courseName} {course.branch}{" "}
                      {course.specialization}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.List
                name="units"
                initialValue={[""]}
                rules={[
                  {
                    validator: async (_, units) => {
                      if (!units || units.length < 1) {
                        return Promise.reject(
                          new Error("At least one unit is required")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => {
                  console.log(fields);

                  return (
                    <>
                      {fields.map(({ key, name, field }) => (
                        <div key={key} className="mb-2 flex">
                          <Form.Item
                            {...field}
                            name={[name, "unit"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter a unit!",
                              },
                            ]}
                          >
                            <Input placeholder="Enter unit" allowClear />
                          </Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            className="ml-2"
                          >
                            Add Unit
                          </Button>
                          {fields.length > 1 && (
                            <Button danger onClick={() => remove(name)}>
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </>
                  );
                }}
              </Form.List>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loadingSubmit}
                >
                  {loadingSubmit ? "Submitting..." : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* Update Tab */}
          <TabPane tab="Update Subject" key="update">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdate}
              initialValues={{
                name: "",
                course: "",
                units: [""],
              }}
            >
              <Form.Item
                name="subject"
                label="Select Subject"
                rules={[
                  { required: true, message: "Please select a subject!" },
                ]}
              >
                <Select
                  value={selectedSubject?._id}
                  onChange={handleSubjectChange}
                  loading={loadingSubjects}
                  placeholder="Select a subject to update"
                >
                  {subjectArray.map((subject) => (
                    <Select.Option key={subject._id} value={subject._id}>
                      {subject.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="name"
                label="Subject Name"
                rules={[
                  { required: true, message: "Please enter the subject name!" },
                ]}
              >
                <Input placeholder="Enter subject name" allowClear />
              </Form.Item>

              <Form.Item
                name="course"
                label="Course"
                rules={[{ required: true, message: "Please select a course!" }]}
              >
                <Select placeholder="Select course" loading={loadingCourses}>
                  {courses.map((course) => (
                    <Select.Option key={course._id} value={course._id}>
                      {course.year} {course.courseName} {course.branch}{" "}
                      {course.specialization}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.List
                name="units"
                initialValue={selectedSubject ? selectedSubject.units : []}
                rules={[
                  {
                    validator: async (_, units) => {
                      if (!units || units.length < 1) {
                        return Promise.reject(
                          new Error("At least one unit is required")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, field }) => (
                      <div key={key} className="mb-2 flex">
                        <Form.Item
                          {...field}
                          name={[name, "unit"]}
                          fieldKey={[fieldKey, "unit"]}
                          rules={[
                            { required: true, message: "Please enter a unit!" },
                          ]}
                        >
                          <Input placeholder="Enter unit" allowClear />
                        </Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          disabled={loadingSubmit}
                          className="ml-2"
                        >
                          Add Unit
                        </Button>
                        {fields.length > 1 && (
                          <Button
                            danger
                            onClick={() => remove(name)}
                            disabled={loadingSubmit}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loadingSubmit}
                >
                  {loadingSubmit ? "Updating..." : "Update"}
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default RecordSubject;
