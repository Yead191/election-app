"use client";
import { Button, Tooltip } from "antd";
import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import AgentPasswordForm from "./AgentPasswordForm";
import AgentProfileForm from "./AgentProfileForm";

export default function EditAgentPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isSettingsMode = mode === "settings";

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          margin: "0 auto",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() =>
              router.push(`/agents-list/agent-profile/${params.id}`)
            }
            style={{ fontSize: "16px" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Change Password">
              <Button
                icon={<SettingOutlined />}
                onClick={() =>
                  router.push(
                    `/agents-list/edit-agent-details/${params.id}?mode=settings`
                  )
                }
                style={{
                  borderRadius: "6px",
                  fontSize: 20,
                  padding: 6,
                  color: isSettingsMode ? "#1BA0D9" : "black",
                }}
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
                style={{
                  borderRadius: "6px",
                  fontSize: 20,
                  padding: 6,
                  color: !isSettingsMode ? "#1BA0D9" : "black",
                }}
              />
            </Tooltip>
          </div>
        </div>

        {isSettingsMode ? (
          <AgentPasswordForm agentId={params.id} />
        ) : (
          <AgentProfileForm agentId={params.id} />
        )}
      </div>
    </div>
  );
}
