import React from "react";
import { Tabs, Button, Layout, Typography } from "antd";
import { LogoutOutlined, HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import {
  Profile,
  Addash,
  RecentActs,
  CourseDet,
  Timetable,
} from "../../components";

const { TabPane } = Tabs;
const { Header, Content } = Layout;
const { Title } = Typography;

const Studentdash = () => {
  const { isLoggedIn, logout, userData, userdet } = useAuth();
  const navigate = useNavigate();
  const tohome = () => {
    navigate("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-blue-600">
          Please log in to view the dashboard.
        </h2>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
          Student Dashboard
        </Title>
        <div>
          <Button
            onClick={logout}
            type="primary"
            icon={<LogoutOutlined />}
            danger
            style={{
              borderRadius: "50px",
              padding: "0 20px",
              fontWeight: "600",
              backgroundColor: "#ff4d4f",
              borderColor: "#ff4d4f",
              marginRight: "10px",
            }}
          >
            Log Out
          </Button>
          <Button
            onClick={tohome}
            icon={<HomeFilled />}
            type="primary"
            style={{
              borderRadius: "50px",
              padding: "0 20px",
              fontWeight: "600",
              backgroundColor: "green",
              borderColor: "darkgreen",
            }}
          >
            To Home
          </Button>
        </div>
      </Header>

      <Content
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            type="card"
            style={{ backgroundColor: "#f7f7f7", borderRadius: "15px" }}
          >
            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Profile
                </span>
              }
              key="1"
            >
              <Profile />
            </TabPane>

            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Attendance
                </span>
              }
              key="2"
            >
              <Addash subjectsAttendance={userdet?.subjectsAttendance || []} />
            </TabPane>

            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Course
                </span>
              }
              key="3"
            >
              <CourseDet user={userData} userDetails={userdet} />
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  TimeTable
                </span>
              }
              key="4"
            >
              <Timetable userDetails={userdet} />
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Recent Activities
                </span>
              }
              key="5"
            >
              <RecentActs activities={userData?.activities || []} />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Studentdash;
