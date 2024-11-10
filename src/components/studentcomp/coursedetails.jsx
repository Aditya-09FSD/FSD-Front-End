import React from "react";
import { Card, Button, Divider } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import html2pdf from "html2pdf.js";
import { Timetable } from "../"; // Import the Timetable component

const CourseDetails = ({ user, userDetails }) => {
  if (!userDetails) return <p>Loading...</p>;

  const { course, panel, roll_no, subjectsAttendance } = userDetails;

  // Export syllabus to PDF
  const exportToPDF = () => {
    const element = document.getElementById("course-details");
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: `${user.name}_Syllabus.pdf`,
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div id="course-details">
        <Card className="mb-4" title={`Course Details for ${user.name}`}>
          {/* Basic user information */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Student Information</h3>
            <p>
              <strong>PRN:</strong> {userDetails.prn}
            </p>
            <p>
              <strong>Roll Number:</strong> {roll_no}
            </p>
            <p>
              <strong>Panel Name:</strong> {panel.name}
            </p>
          </div>

          {/* Course details */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Course Information</h3>
            <p>
              <strong>Course Name:</strong> {course.courseName}
            </p>
            <p>
              <strong>Branch:</strong> {course.branch}
            </p>
            <p>
              <strong>Year:</strong> {course.year}
            </p>
            <p>
              <strong>Specialization:</strong> {course.specialization}
            </p>
          </div>
        </Card>

        {/* Subject Details Section */}
        <Card title="Subjects">
          {subjectsAttendance.map((subjectData) => (
            <div
              key={subjectData.subject._id}
              className="mb-4 p-3 border rounded-lg bg-white shadow-sm"
            >
              <h4>{subjectData.subject.name}</h4>
              <ul className="ml-5 list-disc">
                {subjectData.subject.units.map((unit, index) => (
                  <li key={index}>{unit}</li>
                ))}
              </ul>
            </div>
          ))}
        </Card>
      </div>

      <Divider />

      {/* Export to PDF button */}
      <Button type="primary" icon={<FilePdfOutlined />} onClick={exportToPDF}>
        Export Syllabus to PDF
      </Button>
    </div>
  );
};

export default CourseDetails;
