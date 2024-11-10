import React from "react";
import { Table, Typography, Card } from "antd";

const { Title } = Typography;

const Attendance = ({ subjects }) => {
  const columns = [
    { title: "Subject", dataIndex: "name", key: "name" },
    {
      title: "Lectures Attended",
      dataIndex: "lecturesAttended",
      key: "lecturesAttended",
    },
    {
      title: "Total Lectures",
      dataIndex: "totalLectures",
      key: "totalLectures",
    },
    {
      title: "Attendance %",
      key: "attendancePercentage",
      render: (record) =>
        `${((record.lecturesAttended / record.totalLectures) * 100).toFixed(
          2
        )}%`,
    },
  ];

  const data = subjects.map((subject) => ({
    key: subject._id,
    name: subject.name,
    lecturesAttended: subject.lecturesAttended,
    totalLectures: subject.totalLectures,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: "20px", color: "#4a90e2" }}>
          Subject-wise Attendance
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Card>
    </div>
  );
};

export default Attendance;
