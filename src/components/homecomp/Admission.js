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
      <div
        className="admission-container"
        style={{
          padding: "50px 20px", // More space around the form for better alignment
          maxWidth: "900px", // Increased width for the form
          margin: "80px auto", // Center the form with more margin from top and bottom (80px for distance from header)
          backgroundColor: "#ffffff", // Background color for the form card
          borderRadius: "12px", // Rounded corners
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Elevated shadow effect
          minHeight: "600px", // Ensure the form card has a minimum height for balance
          border: "1px solid #ddd", // Subtle border for separation
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "20px",
            color: "#007bff", // Change this color to blue
          }}
        >
          Admissions Open for Engineering Courses
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        >
          Fill in this form to inquire about available courses and admission
          process.
        </p>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "30px", // Increased margin at the bottom
            }}
          >
            {/* Form fields */}
            <div>
              <label>Academic Year:*</label>
              <select
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">--Select Academic Year--</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <label>Your Location:*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Student First Name:*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Student Last Name:*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Student DOB:*</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Seeking Admission to Engineering Course:*</label>
              <select
                name="admissionCourse"
                value={formData.admissionCourse}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">--Select Course--</option>
                <option value="BTech">B.Tech</option>
                <option value="MTech">M.Tech</option>
              </select>
            </div>
            <div>
              <label>Branch (For B.Tech):*</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">--Select Branch--</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Electronics">Electronics</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Chemical">Chemical</option>
              </select>
            </div>
            <div>
              <label>Entrance Exam Score (if available):</label>
              <input
                type="number"
                name="entranceScore"
                value={formData.entranceScore}
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Current School Name:</label>
              <input
                type="text"
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Father First Name:*</label>
              <input
                type="text"
                name="fatherFirstName"
                value={formData.fatherFirstName}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Father Last Name:*</label>
              <input
                type="text"
                name="fatherLastName"
                value={formData.fatherLastName}
                onChange={handleChange}
                required
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Source of Information:</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">--Select Source--</option>
                <option value="Friend">Friend</option>
                <option value="Website">Website</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Social Media">Social Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Any Query:</label>
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                rows="3"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px",
                  margin: "8px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit Form
          </button>
        </form>
      </div>
    </>
  );
};

export default Admission;
