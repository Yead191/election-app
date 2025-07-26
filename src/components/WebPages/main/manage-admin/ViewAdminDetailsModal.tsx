"use client";

import { Modal, Descriptions, Avatar, Tag, Button, Badge } from "antd";
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import AssignStationModal from "./AssignStationModal";

interface ViewAdminDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  adminData: any;
  refetch: () => void;
}

export default function ViewAdminDetailsModal({
  visible,
  onClose,
  adminData,
  refetch,
}: ViewAdminDetailsModalProps) {
  const [assignStationVisible, setAssignStationVisible] = useState(false);

//   console.log(adminData?.stations);
  if (!adminData) return null;

  // TODO: Replace this mock with actual stations data fetching logic
  const stations = adminData?.stations || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-3">
            <Avatar size={40} src={adminData.image} icon={<UserOutlined />} />
            <span className="text-lg font-semibold">Admin Details</span>
          </div>
        }
        open={visible}
        onCancel={onClose}
        footer={[
          <Button
            key="assign"
            type="primary"
            style={{
              backgroundColor: "#18953D",
              borderColor: "#18953D",
            }}
            onClick={() => setAssignStationVisible(true)}
          >
            Assign Station
          </Button>,
          <Button key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
        width={600}
      >
        <div className="py-4">
          <Descriptions
            bordered
            column={1}
            size="middle"
            labelStyle={{
              backgroundColor: "#fafafa",
              fontWeight: "600",
              width: "150px",
            }}
          >
            <Descriptions.Item
              label={
                <span className="flex items-center gap-2">
                  <UserOutlined />
                  Full Name
                </span>
              }
            >
              {adminData.name}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span className="flex items-center gap-2">
                  <MailOutlined />
                  Email
                </span>
              }
            >
              {adminData.email}
            </Descriptions.Item>

            <Descriptions.Item label="Role">
              <Tag color="blue" className="px-3 py-1">
                {adminData.role}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              <Tag
                color={adminData.status === "active" ? "green" : "red"}
                className="px-3 py-1"
              >
                {adminData.status === "active" ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Verification">
              <span className="flex items-center gap-2">
                {adminData.verified ? (
                  <>
                    <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    <span style={{ color: "#52c41a" }}>Verified</span>
                  </>
                ) : (
                  <>
                    <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                    <span style={{ color: "#ff4d4f" }}>Not Verified</span>
                  </>
                )}
              </span>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span className="flex items-center gap-2">
                  <CalendarOutlined />
                  Created At
                </span>
              }
            >
              {formatDate(adminData.createdAt)}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span className="flex items-center gap-2">
                  <CalendarOutlined />
                  Last Updated
                </span>
              }
            >
              {formatDate(adminData.updatedAt)}
            </Descriptions.Item>

            <Descriptions.Item label="Admin ID">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {adminData._id}
              </code>
            </Descriptions.Item>
            <Descriptions.Item label="Assigned Stations">
              <div className="flex flex-wrap gap-1">
                {adminData?.stations?.length > 0 ? (
                  adminData.stations.map(
                    (station: { id: string; name: string }) => (
                      <Tag key={station.id} color="blue">
                        {station.name}
                      </Tag>
                    )
                  )
                ) : (
                  <span>No stations assigned</span>
                )}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>

      <AssignStationModal
        refetch={refetch}
        visible={assignStationVisible}
        onClose={() => setAssignStationVisible(false)}
        adminData={adminData}
      />
    </>
  );
}
