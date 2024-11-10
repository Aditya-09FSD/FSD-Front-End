import React from "react";
import { Tabs, Button, Layout, Typography } from "antd";
import { Panel, Courses, Subjects, Profile } from "../../components";
import { Signup } from "../../pages";
import { LogoutOutlined, HomeFilled, TeamOutlined } from "@ant-design/icons";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const { Header, Content } = Layout;
const { Title } = Typography;

const Admindash = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const tohome = () => {
    navigate("/");
  };

  const tostudent = () => {
    navigate("/student");
  };
  const toteacher = () => {
    navigate("/teacher");
  };
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
          Admin Dashboard
        </Title>
        <div>
          <Button
            onClick={tostudent}
            ghost
            icon={<TeamOutlined />}
            style={{
              marginRight: "10px",
            }}
          >
            To Student
          </Button>
          <Button
            onClick={toteacher}
            style={{
              marginRight: "10px",
            }}
            ghost
            icon={<TeamOutlined />}
          >
            To Teacher
          </Button>
          {")"}

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
            type="primary"
            icon={<HomeFilled />}
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
          {/* Refresh Button */}

          <Button type="default" onClick={() => window.location.reload()} block>
            Refresh
          </Button>

          {/* Tabs for different sections */}
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
                  Panel
                </span>
              }
              key="2"
            >
              <Panel />
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Subjects
                </span>
              }
              key="3"
            >
              <Subjects />
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Courses
                </span>
              }
              key="4"
            >
              <Courses />
            </TabPane>
            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Signup
                </span>
              }
              key="5"
            >
              <Signup />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Admindash;
