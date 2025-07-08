import React from "react";
import { Button, Input, Modal, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface NominatedTeamModalProps {
  editModalVisible: boolean;
  form: any;
  isAddMode: boolean;
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  setImageFile: (file: File | null) => void;
  setEditModalVisible: (value: boolean) => void;
  setCurrentTeam: (team: any) => void;
  handleFormSubmit: (values: any) => void;
}
export default function NominatedTeamModal({
  editModalVisible,
  form,
  isAddMode,
  setImageUrl,
  setImageFile,
  setEditModalVisible,
  setCurrentTeam,
  handleFormSubmit,
  imageUrl,
}: NominatedTeamModalProps) {
  return (
    <Modal
      title={<span>{isAddMode ? "Add Team" : "Edit Team"}</span>}
      open={editModalVisible}
      onCancel={() => {
        setEditModalVisible(false);
        setCurrentTeam(null);
        setImageUrl(null);
        setImageFile(null);
        form.resetFields();
      }}
      footer={null}
      width={600}
      closeIcon={<span style={{ fontSize: "20px", color: "#999" }}>×</span>}
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{ marginTop: "24px" }}
      >
        <Form.Item
          label="Team Name"
          name="teamName"
          rules={[{ required: true, message: "Please input team name!" }]}
        >
          <Input
            placeholder="Title name 1"
            style={{ padding: "12px", borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item label="Team Simple">
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              const reader = new FileReader();
              reader.onload = () => {
                setImageUrl(reader.result as string);
                setImageFile(file);
              };
              reader.readAsDataURL(file);
              return false;
            }}
          >
            {imageUrl ? (
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Team Logo Preview"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #d9d9d9",
                    marginBottom: "12px",
                  }}
                />
                <Button
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageUrl(null);
                    setImageFile(null);
                  }}
                >
                  Remove Photo
                </Button>
              </div>
            ) : (
              <div
                style={{
                  border: "2px dashed #d9d9d9",
                  borderRadius: "8px",
                  padding: "60px 40px",
                  textAlign: "center",
                  backgroundColor: "#fafafa",
                  cursor: "pointer",
                  width: "294px",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    color: "#999",
                    marginBottom: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UploadOutlined />
                </div>
                <div style={{ color: "#666", fontSize: "16px" }}>
                  Upload Image
                </div>
              </div>
            )}
          </Upload>
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
          Submit
        </Button>
      </Form>
    </Modal>
  );
}
