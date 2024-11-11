import React from "react";
import { Descriptions, Card, List, Table, Typography, Divider } from "antd";
import Swal from "sweetalert2";
import { Loading } from "../";

const { Title, Text } = Typography;

const CourseDetailsTab = ({ userDetails }) => {
  if (!userDetails) return <Loading />;

  // SweetAlert example for showing additional information or notifications
  const showAlert = (message) => {
    Swal.fire({
      title: "Additional Information",
      text: message,
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <div>
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Title level={2}>Teacher Details</Title>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Name">{userDetails.name}</Descriptions.Item>
          <Descriptions.Item label="PRN">{userDetails.prn}</Descriptions.Item>
          <Descriptions.Item label="Email">
            {userDetails.username}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider orientation="left">
        <Title level={3}>Course Details</Title>
      </Divider>

      {userDetails.subjects &&
        userDetails.subjects.map((subjectDetail) => (
          <Card
            key={subjectDetail._id}
            title={`Course: ${subjectDetail.course.courseName} - ${subjectDetail.course.branch}`}
            style={{ marginBottom: 24 }}
            hoverable
            onClick={() =>
              showAlert(`Viewing details for ${subjectDetail.subname.name}`)
            }
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Subject">
                {subjectDetail.subname.name}
              </Descriptions.Item>
              <Descriptions.Item label="Units">
                <List
                  dataSource={subjectDetail.subname.units}
                  renderItem={(unit) => <List.Item>{unit}</List.Item>}
                  bordered
                  size="small"
                />
              </Descriptions.Item>
            </Descriptions>

            {subjectDetail.panels.map((panel) => (
              <Card
                key={panel._id}
                type="inner"
                title={`Panel: ${panel.name}`}
                style={{ marginTop: 16 }}
              >
                <Title level={5}>Timetable</Title>
                <Table
                  columns={[
                    {
                      title: "Subject",
                      dataIndex: ["subject", "name"],
                      key: "subject",
                    },
                    {
                      title: "Location",
                      dataIndex: "location",
                      key: "location",
                    },
                    { title: "Timing", dataIndex: "timing", key: "timing" },
                  ]}
                  dataSource={panel.timetable}
                  rowKey="_id"
                  pagination={false}
                  bordered
                />
              </Card>
            ))}
          </Card>
        ))}
    </div>
  );
};

export default CourseDetailsTab;
