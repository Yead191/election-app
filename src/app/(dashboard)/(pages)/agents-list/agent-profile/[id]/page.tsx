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
import { BsPencilSquare } from "react-icons/bs";
import {
  useGetAgentListQuery,
  useGetAgentProfileQuery,
  useUpdateAgentStatusMutation,
} from "@/redux/feature/agent-list-apis/agentApi";

export default function AgentProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [updateAgentStatus] = useUpdateAgentStatusMutation();

  const { data: agentData, refetch } = useGetAgentProfileQuery(params.id);
  const { refetch: refetchAgentList } = useGetAgentListQuery(null);
  // console.log(agentData);
  const mockAgentData = agentData?.data || {};
  const handleUpdateStatus = (id: string) => {
    // console.log(id);
    toast.promise(updateAgentStatus({ id }).unwrap(), {
      loading: "Updating status...",
      success: (res) => {
        // console.log(res);
        refetchAgentList();
        refetch();
        return `Status updated to ${
          res.data.status === "active" ? "active" : "delete"
        }!`;
      },
      error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
    });
  };
  return (
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
          <Tooltip title="Change Password">
            <Button
              icon={<SettingOutlined />}
              onClick={() =>
                router.push(
                  `/agents-list/edit-agent-details/${params.id}?mode=settings`
                )
              }
              style={{ borderRadius: "6px", fontSize: 20, padding: 6 }}
            />
          </Tooltip>
          <Tooltip title="Edit Profile">
            <Button
              icon={<BsPencilSquare />}
              onClick={() =>
                router.push(
                  `/agents-list/edit-agent-details/${params.id}?mode=edit`
                )
              }
              style={{ borderRadius: "6px", fontSize: 20, padding: 6 }}
            />
          </Tooltip>
        </Space>
      </div>

      <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
        <div style={{ textAlign: "center" }}>
          <Avatar
            src={mockAgentData?.image || "/default-avatar.png"}
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
            <Tooltip
              title={
                mockAgentData.status === "active" ? "Deactivate" : "Activate"
              }
            >
              <Button
                type="text"
                onClick={() => handleUpdateStatus(mockAgentData._id)}
                icon={
                  mockAgentData.status === "active" ? (
                    <LockOutlined />
                  ) : (
                    <UnlockOutlined />
                  )
                }
                size="small"
                style={{
                  color:
                    mockAgentData.status === "active" ? "#ff4d4f" : "#52c41a",
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
              : {mockAgentData?.role}
            </div>

            <div
              style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
            >
              Polling Address
            </div>
            <div style={{ fontSize: "16px", marginBottom: "16px" }}>
              : {mockAgentData.pollingStation}
            </div>

            <div
              style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
            >
              Id. no.
            </div>
            <div style={{ fontSize: "16px", marginBottom: "16px" }}>
              : {mockAgentData._id}
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
              : {mockAgentData.contact}
            </div>

            <div
              style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}
            >
              Represent Code
            </div>
            <div style={{ fontSize: "16px" }}>
              : {mockAgentData.represent_code}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
