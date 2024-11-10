import React from "react";
import { Typography, List, Card } from "antd";

const { Title } = Typography;

const RecentActivities = ({ activities }) => (
  <div style={{ padding: "20px" }}>
    <Card
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <Title level={4} style={{ marginBottom: "20px", color: "#4a90e2" }}>
        Recent Activities
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={activities}
        renderItem={(activity) => (
          <List.Item style={{ marginBottom: "15px" }}>
            <List.Item.Meta
              title={
                <span style={{ fontWeight: "bold" }}>{activity.title}</span>
              }
              description={activity.description}
            />
          </List.Item>
        )}
      />
    </Card>
  </div>
);

export default RecentActivities;
