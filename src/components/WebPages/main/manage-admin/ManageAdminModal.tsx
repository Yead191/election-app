import React, { useState } from "react";
import { Button, Input, Modal, Form, Select } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { toast } from "sonner";

interface ManageAdminModalProps {
  isAddMode: boolean;
  editModalVisible: boolean;
  handleCancel: () => void;
  handleFormSubmit: (values: any) => void;
  form: any;
}
export default function ManageAdminModal({
  isAddMode,
  editModalVisible,
  handleCancel,
  handleFormSubmit,
  form,
}: ManageAdminModalProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Modal
      title={isAddMode ? "Add Admin" : "Edit"}
      open={editModalVisible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      closeIcon={<span style={{ fontSize: "24px", color: "#999" }}>×</span>}
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{ marginTop: "24px" }}
      >
        <Form.Item
          label="Admin name"
          name="adminName"
          rules={[{ required: true, message: "Please input admin name!" }]}
        >
          <Input
            placeholder="Title name 1"
            style={{ padding: "12px", borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            placeholder="admin@example.com"
            style={{ padding: "12px", borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: isAddMode, message: "Please input password!" }]}
        >
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder="**********"
            style={{ padding: "12px", borderRadius: "8px" }}
            suffix={
              <Button
                type="text"
                icon={
                  passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                }
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </Form.Item>

        <Form.Item
          label="User Type"
          name="userType"
          rules={[{ required: true, message: "Please select user type!" }]}
        >
          <Select placeholder="Admin" style={{ height: "48px" }}>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Super Admin">Super Admin</Select.Option>
            <Select.Option value="Manager">Manager</Select.Option>
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            backgroundColor: "#1BA0D9",
            borderColor: "#1BA0D9",
            borderRadius: "16px",
            padding: "10px",
            height: "auto",
            fontSize: "16px",
            marginTop: "24px",
          }}
        >
          {isAddMode ? "Add Admin" : "Submit"}
        </Button>
      </Form>
    </Modal>
  );
}
