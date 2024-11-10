import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Select, Form, message } from "antd"; // Import Ant Design components
import { useAuth } from "../../context";
import { apiurl } from "../../devdata/constants";
import Cookies from "js-cookie";

function RecordSubject() {
  const [form] = Form.useForm(); // Form instance for Ant Design Form
  const { courses, loadingCourses } = useAuth();

  const [loadingSubmit, setLoadingSubmit] = useState(false); // Track loading state for submission

  const handleSubmit = async (values) => {
    setLoadingSubmit(true); // Set loading state while submitting
    try {
      const token = Cookies.get("token");
      await axios.post(`${apiurl}/subjects`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Subject data saved successfully"); // Use Ant Design message for success
      form.resetFields(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        "There was an issue saving the subject data. Please try again."
      ); // Use Ant Design message for error
    } finally {
      setLoadingSubmit(false); // Reset loading state after submission
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl transform transition duration-300 ease-in-out relative">
        {/* Close Button */}

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Record Subject
        </h2>

        {/* Form */}
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
          {/* Subject Name */}
          <Form.Item
            name="name"
            label="Subject Name"
            rules={[
              { required: true, message: "Please enter the subject name!" },
            ]}
          >
            <Input
              placeholder="Enter subject name"
              allowClear
              disabled={loadingSubmit}
            />
          </Form.Item>

          {/* Course Selection */}
          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select
              placeholder="Select course"
              loading={loadingCourses}
              allowClear
              disabled={loadingSubmit}
            >
              {loadingCourses ? (
                <Select.Option value="">Loading...</Select.Option>
              ) : (
                courses.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {course.year}
                    {"Y "}
                    {course.courseName} {course.branch} {course.specialization}
                  </Select.Option>
                ))
              )}
            </Select>
          </Form.Item>

          {/* Units */}
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
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, fieldKey, name, field }, index) => (
                  <div key={key} className="mb-2 flex">
                    <Form.Item
                      {...field}
                      name={[name, "unit"]}
                      fieldKey={[fieldKey, "unit"]}
                      rules={[
                        { required: true, message: "Please enter a unit!" },
                      ]}
                    >
                      <Input
                        placeholder="Enter unit"
                        allowClear
                        disabled={loadingSubmit}
                      />
                    </Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<span className="material-icons">add</span>}
                      disabled={loadingSubmit}
                    >
                      Add Unit
                    </Button>
                    {fields.length > 1 && (
                      <Button
                        type="link"
                        onClick={() => remove(name)}
                        icon={<span className="material-icons">remove</span>}
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

          {/* Submit Button */}
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
      </div>
    </div>
  );
}

export default RecordSubject;
