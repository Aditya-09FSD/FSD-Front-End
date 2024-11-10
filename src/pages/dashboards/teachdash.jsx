import React from "react";
import { Tabs, Button, Layout, Typography } from "antd";
import { Attendance, Profile } from "../../components"; // Assuming Profile is a component in your project
import { LogoutOutlined, HomeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

const { TabPane } = Tabs;
const { Header, Content } = Layout;
const { Title } = Typography;

const Teachdash = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const tohome = () => {
    navigate("/");
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
          Teacher Dashboard
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
          {/* Tabs for different sections */}
          <Tabs
            defaultActiveKey="1"
            type="card"
            style={{ backgroundColor: "#f7f7f7", borderRadius: "15px" }}
          >
            {/* Profile Tab */}
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
            {/* Attendance Tab */}
            <TabPane
              tab={
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Attendance
                </span>
              }
              key="2"
            >
              <Attendance />
            </TabPane>
            {/* Add other tabs as needed */}
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Teachdash;
