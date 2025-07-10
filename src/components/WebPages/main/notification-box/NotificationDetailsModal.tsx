import React from "react";
import { Modal, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;

export default function NotificationDetailsModal({
  isModalVisible,
  setIsModalVisible,
  selectedMessage,
}: {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  selectedMessage: any;
}) {
  return (
    <Modal
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      width={500}
      closeIcon={
        <CloseOutlined style={{ fontSize: "16px", color: "#8c8c8c" }} />
      }
      styles={{
        header: { display: "none" },
        body: { padding: "24px" },
      }}
    >
      {selectedMessage && (
        <div>
          {/* Header with s.no and close button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Text style={{ color: "#8c8c8c", fontSize: "14px" }}>
              s.no {selectedMessage.sno}
            </Text>
          </div>

          {/* Name and Time */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Text strong style={{ fontSize: "16px", color: "#262626" }}>
              {selectedMessage.name}
            </Text>
            <Text style={{ color: "#8c8c8c", fontSize: "14px" }}>
              {selectedMessage.time}
            </Text>
          </div>

          {/* Message ID */}
          {selectedMessage.messageId && (
            <Text
              strong
              style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "16px",
                color: "#262626",
              }}
            >
              {selectedMessage.messageId}
            </Text>
          )}

          {/* Title */}
          {selectedMessage.title && (
            <Title
              level={5}
              style={{
                color: "#1890ff",
                marginBottom: "16px",
                fontWeight: 500,
                fontSize: "16px",
              }}
            >
              {selectedMessage.title}
            </Title>
          )}

          {/* Message Content */}
          <Text
            style={{
              lineHeight: "1.6",
              color: "#595959",
              display: "block",
              fontSize: "14px",
            }}
          >
            {selectedMessage.fullMessage || selectedMessage.message}
          </Text>
        </div>
      )}
    </Modal>
  );
}
