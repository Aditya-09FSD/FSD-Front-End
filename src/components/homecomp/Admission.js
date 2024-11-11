import React, { useState } from "react";
import { Navbar } from "../";

const Admission = () => {
  const [formData, setFormData] = useState({
    academicYear: "",
    location: "",
    firstName: "",
    lastName: "",
    dob: "",
    admissionCourse: "",
    branch: "",
    entranceScore: "",
    currentSchool: "",
    fatherFirstName: "",
    fatherLastName: "",
    email: "",
    phone: "",
    source: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Your inquiry has been submitted successfully!");
    setFormData({
      academicYear: "",
      location: "",
      firstName: "",
      lastName: "",
      dob: "",
      admissionCourse: "",
      branch: "",
      entranceScore: "",
      currentSchool: "",
      fatherFirstName: "",
      fatherLastName: "",
      email: "",
      phone: "",
      source: "",
      query: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-blue-50 p-4">
        <div className="max-w-3xl mx-auto bg-white mt-20 p-8  rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-center text-3xl font-bold text-blue-600 mb-6">
            🎓 Admissions Open for Engineering Courses 🎓
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Fill out this form to get details on courses and the admission
            process.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                label: "Academic Year:*",
                name: "academicYear",
                type: "select",
                options: ["2024", "2025"],
              },
              { label: "Your Location:*", name: "location", type: "text" },
              {
                label: "Student First Name:*",
                name: "firstName",
                type: "text",
              },
              { label: "Student Last Name:*", name: "lastName", type: "text" },
              { label: "Student DOB:*", name: "dob", type: "date" },
              {
                label: "Admission Course:*",
                name: "admissionCourse",
                type: "select",
                options: ["B.Tech", "M.Tech"],
              },
              {
                label: "Branch:*",
                name: "branch",
                type: "select",
                options: [
                  "Computer Science",
                  "Electrical",
                  "Mechanical",
                  "Civil",
                  "Electronics",
                  "Information Technology",
                  "Chemical",
                ],
              },
              {
                label: "Entrance Exam Score (optional):",
                name: "entranceScore",
                type: "number",
              },
              { label: "Current School:", name: "currentSchool", type: "text" },
              {
                label: "Father First Name:*",
                name: "fatherFirstName",
                type: "text",
              },
              {
                label: "Father Last Name:*",
                name: "fatherLastName",
                type: "text",
              },
              { label: "Email:", name: "email", type: "email" },
              { label: "Phone:", name: "phone", type: "tel" },
              {
                label: "Source of Information:",
                name: "source",
                type: "select",
                options: [
                  "Friend",
                  "Website",
                  "Advertisement",
                  "Social Media",
                  "Other",
                ],
              },
              { label: "Any Query:", name: "query", type: "textarea" },
            ].map(({ label, name, type, options }) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium mb-1">
                  {label}
                </label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={label.includes("*")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">{`--Select ${label
                      .replace(":*", "")
                      .replace("*", "")}--`}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={label.includes("*")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full col-span-1 md:col-span-2 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admission;
