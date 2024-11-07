import React from "react";
import { Typography, Divider, Card } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const Privacy = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <Card
        className="max-w-3xl w-full shadow-lg rounded-lg bg-white border border-gray-200"
        style={{
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} className="text-center text-blue-600 mb-4">
          Privacy Policy
        </Title>
        <Divider />
        <Paragraph className="text-gray-700 leading-relaxed text-lg">
          Welcome to our website! We are committed to protecting your privacy.
          This Privacy Policy outlines how we handle your personal information
          and data. We ensure all data is stored securely, following the best
          industry practices.
        </Paragraph>
        <Title level={3} className="text-blue-500 mt-6">
          Information Collection
        </Title>
        <Paragraph className="text-gray-700 text-base leading-relaxed">
          We may collect personal information such as your name, email address,
          and other contact details when you sign up for our services or
          interact with our site. This information is solely used to improve
          your experience with us.
        </Paragraph>
        <Title level={3} className="text-blue-500 mt-6">
          Data Protection
        </Title>
        <Paragraph className="text-gray-700 text-base leading-relaxed">
          We prioritize your data security and follow strict measures to
          safeguard any personal data from unauthorized access. Your data will
          not be shared with third parties unless required by law.
        </Paragraph>
        <Divider />
        <div className="text-center mt-6">
          <Text className="text-gray-500 italic">
            This website is designed and solely made by Akash Patel@delpat
          </Text>
          <br />
          <a
            href="https://delpat-llp.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 flex items-center justify-center mt-2"
          >
            Visit delpat-llp.web.app <LinkOutlined className="ml-1" />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;
