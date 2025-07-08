import React from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Avatar,
  DatePicker,
  Tooltip,
  Modal,
  Form,
  Select,
  message,
} from "antd";

interface AgentModalProps {
  isAddMode: boolean;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  setEditingAgent: (agent: any) => void;
  form: any;
  handleFormSubmit: (values: any) => void;
}
export default function AgentModal({
  isAddMode,
  isModalVisible,
  setIsModalVisible,
  setEditingAgent,
  form,
  handleFormSubmit,
}: AgentModalProps) {
  const { Option } = Select;

  return (
    <Modal
      title={isAddMode ? "Add New Agent" : "Edit Agent"}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
        setEditingAgent(null);
        form.resetFields();
      }}
      footer={null}
      width={700}
      closeIcon={<span style={{ fontSize: "20px", color: "#999" }}>×</span>}
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{ marginTop: "24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input
              placeholder="Enter full name"
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
              placeholder="Enter email address"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <Form.Item
            label="Contact Number"
            name="contactNo"
            rules={[
              { required: true, message: "Please input contact number!" },
            ]}
          >
            <Input
              placeholder="Enter contact number"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Post Code"
            name="postCode"
            rules={[{ required: true, message: "Please input post code!" }]}
          >
            <Input
              placeholder="Enter post code"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please select position!" }]}
          >
            <Select placeholder="Select position" style={{ height: "48px" }}>
              <Option value="Junior Agent">Junior Agent</Option>
              <Option value="Agent">Agent</Option>
              <Option value="Senior Agent">Senior Agent</Option>
              <Option value="Team Lead">Team Lead</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please select department!" }]}
          >
            <Select placeholder="Select department" style={{ height: "48px" }}>
              <Option value="Operations">Operations</Option>
              <Option value="Field Operations">Field Operations</Option>
              <Option value="Support">Support</Option>
              <Option value="Management">Management</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Pooling Address"
          name="poolingAddress"
          rules={[{ required: true, message: "Please input pooling address!" }]}
        >
          <Input
            placeholder="Enter pooling address"
            style={{ padding: "12px", borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select placeholder="Select status" style={{ height: "48px" }}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
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
            padding: "12px",
            height: "48px",
            fontSize: "16px",
            marginTop: "24px",
          }}
        >
          {isAddMode ? "Add Agent" : "Update Agent"}
        </Button>
      </Form>
    </Modal>
  );
}
