import React from "react";
import { Modal, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
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
              Message id: {selectedMessage._id}
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
              {selectedMessage?.reciver?.name}
            </Text>
            <Text style={{ color: "#8c8c8c", fontSize: "14px" }}>
              {dayjs(selectedMessage?.time).format("hh:mma-DD/MM/YY")}
            </Text>
          </div>

          {/* Message ID */}
          {/* {selectedMessage._id && (
            <Text
              strong
              style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "16px",
                color: "#262626",
              }}
            >
              {selectedMessage._id}
            </Text>
          )} */}

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
