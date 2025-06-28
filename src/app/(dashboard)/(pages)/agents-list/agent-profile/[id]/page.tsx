"use client";

import { Button, Avatar, Space, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  SettingOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const mockAgentData = {
  name: "Asadujjaman Mahfuz",
  position: "Polling Agent",
  poolingAddress: "3891 Ranchview Dr. Richardson",
  id: "BB4578EED2",
  email: "Asadujjaman101@bd.com",
  contactNumber: "073 155 4568",
  agentAddress: "284 Daffodil Dr, Mount Frere, Eastern Cape -5088 South Africa",
  avatar: "/assets/user3.png?height=252&width=251",
  role: "Manager",
};

export default function AgentProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [status, setStatus] = useState("active");
  const handleUpdateStatus = (status: string) => {
    setStatus(status === "active" ? "inactive" : "active");
    toast.success(`Status updated to ${status === "active" ? "inactive" : "active"}!`);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          margin: "0 auto",
          height: "80vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/agents-list")}
            style={{ fontSize: "16px" }}
          />
          <Space>
            <Button
              icon={<SettingOutlined />}
              onClick={() =>
                router.push(
                  `/agents-list/edit-agent-details/${params.id}?mode=settings`
                )
              }
              style={{ borderRadius: "6px" }}
            />
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.push(
                  `/agents-list/edit-agent-details/${params.id}?mode=edit`
                )
              }
              style={{ borderRadius: "6px" }}
            />
          </Space>
        </div>

        <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
          <div style={{ textAlign: "center" }}>
            <Avatar
              src={mockAgentData.avatar}
              size={251}
              style={{ marginBottom: "16px", borderRadius: 16 }}
            />
            <div className="flex justify-between items-start">
              <div></div>
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  {mockAgentData.name}
                </div>
                <div
                  style={{
                    color: "#ff7a00",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {mockAgentData.role}
                </div>
              </div>
              <Tooltip title={status === "active" ? "Deactivate" : "Activate"}>
                <Button
                  type="text"
                  onClick={() => handleUpdateStatus(status)}
                  icon={
                    status === "active" ? <LockOutlined /> : <UnlockOutlined />
                  }
                  size="small"
                  style={{
                    color: status === "active" ? "#ff4d4f" : "#52c41a",
                    fontSize: "20px",
                  }}
                />
              </Tooltip>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
              >
                Name
              </div>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                : {mockAgentData.name}
              </div>

              <div
                style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
              >
                Position
              </div>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                : {mockAgentData.position}
              </div>

              <div
                style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
              >
                Polling Address
              </div>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                : {mockAgentData.poolingAddress}
              </div>

              <div
                style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
              >
                Id. no.
              </div>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                : {mockAgentData.id}
              </div>

              <div
                style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
              >
                Email
              </div>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                : {mockAgentData.email}
              </div>

              <div
                style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
              >
                Contact Number
              </div>
              <div style={{ fontSize: "16px", marginBottom: "16px" }}>
                : {mockAgentData.contactNumber}
              </div>

              <div
                style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
              >
                Agent Address
              </div>
              <div style={{ fontSize: "16px" }}>
                : {mockAgentData.agentAddress}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
