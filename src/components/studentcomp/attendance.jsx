import React from "react";
import { Table, Typography, Card } from "antd";

const { Title } = Typography;

const Attendance = ({ subjectsAttendance }) => {
  const columns = [
    {
      title: "Subject",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Lectures Attended",
      dataIndex: "lecturesAttended",
      key: "lecturesAttended",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Total Lectures",
      dataIndex: "totalLectures",
      key: "totalLectures",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Attendance %",
      key: "attendancePercentage",
      render: (record) =>
        `${((record.lecturesAttended / record.totalLectures) * 100).toFixed(
          2
        )}%`,
      responsive: ["xs", "sm", "md", "lg"],
    },
  ];

  // Use subjectsAttendance to create the data source
  const data = subjectsAttendance.map((subjectData) => ({
    key: subjectData.subject._id,
    name: subjectData.subject.name,
    lecturesAttended: subjectData.attendanceStats.totalAttended,
    totalLectures: subjectData.attendanceStats.totalLectures,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
        bodyStyle={{ padding: "0px" }}
      >
        <Title
          level={4}
          style={{
            marginBottom: "20px",
            color: "#4a90e2",
            textAlign: "center",
            fontSize: "1.5em",
          }}
        >
          Subject-wise Attendance
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: "100%" }}
          style={{
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
          }}
          rowClassName="responsive-row"
        />
      </Card>
    </div>
  );
};

export default Attendance;
