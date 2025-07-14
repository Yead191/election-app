import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Form, Select } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useCreateAdminMutation } from "@/redux/feature/admin-api/adminApi";

interface ManageAdminModalProps {
  isAddMode: boolean;
  editModalVisible: boolean;
  handleCancel: () => void;
  form: any;
  currentAdmin?: any;
  setCurrentAdmin: any;
  setEditModalVisible: (visible: boolean) => void;
  refetch: () => void;
}
export default function ManageAdminModal({
  isAddMode,
  editModalVisible,
  handleCancel,
  setCurrentAdmin,
  form,
  currentAdmin,
  setEditModalVisible,
  refetch,
}: ManageAdminModalProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  // console.log(currentAdmin);
  const [createAdmin] = useCreateAdminMutation();

  useEffect(() => {
    if (currentAdmin) {
      form.setFieldsValue({
        name: currentAdmin.name || "",
        contact: currentAdmin.contact || "",
        pollingStation: currentAdmin.pollingStation || "",
        password: currentAdmin.password || "",
      });
    }
  }, [currentAdmin, form]);

  // handle submit
  const handleFormSubmit = (values: any) => {
    if (isAddMode) {
      const newAdmin = {
        name: values.name,
        email: values.email,
        status: "active",
        password: values.password,
        role: "ADMIN",
      };
      // console.log(newAdmin);
      toast.promise(createAdmin(newAdmin).unwrap(), {
        loading: "Adding admin...",
        success: (res) => {
          // console.log(res);
          refetch();
          form.resetFields();
          setCurrentAdmin(null);
          setEditModalVisible(false);
          return <b>Admin Added Successfully!</b>;
        },
        error: (err) =>
          `Error: ${err?.data?.message || "Something went wrong"}`,
      });
    }
    setEditModalVisible(false);
    setCurrentAdmin(null);
    form.resetFields();
  };
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
          name="name"
          rules={[{ required: true, message: "Please input admin name!" }]}
        >
          <Input
            placeholder="Enter admin name"
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
