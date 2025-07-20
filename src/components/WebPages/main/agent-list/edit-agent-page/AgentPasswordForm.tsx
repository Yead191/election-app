"use client";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "sonner";
import {
  useGetAgentProfileQuery,
  useUpdateAgentPasswordMutation,
} from "@/redux/feature/agent-list-apis/agentApi";
import { useEffect } from "react";

export default function AgentPasswordForm({ agentId }: { agentId: any }) {
  const [form] = Form.useForm();
  const [updateAgentPassword] = useUpdateAgentPasswordMutation();
  const { data: agentData, refetch } = useGetAgentProfileQuery(agentId);
  // console.log(agentData);
  const onFinish = (values: any) => {
    toast.promise(updateAgentPassword({ id: agentId, data: values }).unwrap(), {
      loading: "Updating settings...",
      success: (res) => {
        refetch();
        return <b>{res.message}</b>;
      },
      error: (res) => `Error: ${res.message || "Something went wrong"}`,
    });
  };

  useEffect(() => {
    if (agentData?.data) {
      form.setFieldsValue({
        currentPassword: agentData?.data?.passwordShow || "",
      });
    }
  }, [agentData?.data, form]);

  return (
    <Form
      style={{
        width: "100%",
        maxWidth: "500px",
      }}
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Current Password"
        name="currentPassword"
        rules={[
          { required: true, message: "Please input your current password!" },
        ]}
      >
        <Input.Password
          readOnly
          placeholder="Enter current password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ padding: "12px", borderRadius: "8px" }}
        />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password
          placeholder="Enter new password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ padding: "12px", borderRadius: "8px" }}
        />
      </Form.Item>

      <Form.Item
        label="Confirm new Password"
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm new password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          style={{ padding: "12px", borderRadius: "8px" }}
        />
      </Form.Item>

      <div
        style={{
          fontSize: "12px",
          color: "#666",
          marginBottom: "24px",
          lineHeight: "1.4",
        }}
      >
        orci turpis tincidunt Lorem non non, faucibus dui. Nunc elit lobortis,
        lacus id nisl. enim. In tincidunt vel Ut ipsum ipsum
      </div>

      <Button
        type="primary"
        htmlType="submit"
        block
        style={{
          backgroundColor: "#1BA0D9",
          borderColor: "#1BA0D9",
          borderRadius: "8px",
          padding: "12px",
          height: "auto",
          fontSize: "16px",
        }}
      >
        Save & Change
      </Button>
    </Form>
  );
}
