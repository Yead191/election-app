import React, { useState } from "react";
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
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useAddAgentMutation,
  useGetAgentListQuery,
} from "@/redux/feature/agent-list-apis/agentApi";
import { toast } from "sonner";

interface AgentModalProps {
  isAddMode: boolean;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  setEditingAgent: (agent: any) => void;
  form: any;
  refetch: () => void;
}

export default function AgentModal({
  isAddMode,
  isModalVisible,
  setIsModalVisible,
  setEditingAgent,
  form,
  refetch,
}: AgentModalProps) {
  const { Option } = Select;
  const [addAgent] = useAddAgentMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  // const { data: agentList, refetch } = useGetAgentListQuery(null);

  console.log(file);
  const handleFormSubmit = async (values: any) => {
    const hide = message.loading("Processing...", 0);
    try {
      if (isAddMode) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("contact", values.contact);
        formData.append("postalCode", values.postalCode);
        formData.append("department", values.department);
        formData.append("pollingStation", values.pollingStation);
        formData.append("status", "active");
        formData.append("role", "AGENT");
        if (values.image?.file) {
          formData.append("image", values.image.file);
        }

        // console.log(formData);
        toast.promise(addAgent(formData).unwrap(), {
          loading: "Adding agent...",
          success: (res) => {
            // console.log(res);
            refetch();
            form.resetFields();
            setEditingAgent(null);
            setImagePreview(null);
            setIsModalVisible(false);

            return <b>{res.message}</b>;
          },
          error: "Failed to add agent.",
        });
      }
    } catch (error) {
      message.error("Failed to process agent. Please try again.");
    } finally {
      hide();
    }
  };

  const handleImageChange = (info: any) => {
    if (info.file) {
      setFile(info.file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(info.file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    onChange: handleImageChange,
    accept: "image/*",
    showUploadList: false,
  };

  return (
    <Modal
      title={isAddMode ? "Add New Agent" : "Edit Agent"}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
        setEditingAgent(null);
        form.resetFields();
        setImagePreview(null);
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
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 ">
          <Form.Item
            label="Agent Image"
            name="image"
            rules={
              isAddMode
                ? [{ required: true, message: "Please upload an image!" }]
                : []
            }
          >
            <Upload {...uploadProps}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  border: "2px dashed #d9d9d9",
                  borderRadius: "8px",
                  padding: "16px",
                  cursor: "pointer",
                  height: "150px",
                  width: "100%",
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <UploadOutlined
                      style={{ fontSize: "32px", color: "#1BA0D9" }}
                    />
                    <div style={{ marginTop: "8px" }}>Upload Image</div>
                  </>
                )}
              </div>
            </Upload>
          </Form.Item>
          <div
            style={{
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
            name="contact"
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
            label="Postal Code"
            name="postalCode"
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
          <Form.Item
            label="Polling Station Address"
            name="pollingStation"
            rules={[
              {
                required: true,
                message: "Please input polling station address!",
              },
            ]}
          >
            <Input
              placeholder="Enter polling station address"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>
        </div>

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
