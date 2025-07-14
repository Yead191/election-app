"use client";
import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  useGetAgentProfileQuery,
  useUpdateAgentProfileMutation,
} from "@/redux/feature/agent-list-apis/agentApi";

export default function AgentProfileForm({ agentId }: { agentId: any }) {
  const [form] = Form.useForm();
  const { data: agentData, refetch } = useGetAgentProfileQuery(agentId);
  const [updateAgentProfile] = useUpdateAgentProfileMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (agentData?.data) {
      setImageUrl(agentData?.data?.image);
      form.setFieldsValue({
        name: agentData?.data.name || "",
        contact: agentData?.data.contact || "",
        address: agentData?.data.address || "",
      });
    }
  }, [agentData?.data, form]);

  const handleChange = (file: File) => {
    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
  };

  const onFinish = (values: any) => {
    const updateData = new FormData();
    updateData.append("name", values.name);
    updateData.append("contact", values.contact);
    updateData.append("address", values.address);
    if (imageFile) {
      updateData.append("image", imageFile);
    } else if (imageUrl) {
      updateData.append("imageUrl", imageUrl);
    }

    toast.promise(
      updateAgentProfile({ id: agentId, data: updateData }).unwrap(),
      {
        loading: "Updating profile...",
        success: (res) => {
          refetch();
          return <b>Profile Updated Successfully!</b>;
        },
        error: (err) =>
          `Error: ${err?.data?.message || "Something went wrong"}`,
      }
    );
  };

  return (
    <Form
      style={{ width: "100%", maxWidth: "500px" }}
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        name: "",
        contact: "",
        address: "",
      }}
    >
      <Form.Item label="Profile Picture" name="profilePicture">
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={(file) => {
            handleChange(file);
            return false;
          }}
        >
          {imageUrl ? (
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <img
                src={
                  imageUrl?.startsWith("blob:")
                    ? imageUrl
                    : imageUrl
                    ? `${process.env.NEXT_PUBLIC_IMG_URL}${imageUrl}`
                    : "/default-image.png"
                }
                alt="Profile Preview"
                style={{
                  width: "100%",
                  height: "200px",
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
                padding: "40px",
                textAlign: "center",
                backgroundColor: "#fafafa",
                marginBottom: "6px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  color: "#999",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={"/assets/Frame.png"}
                  alt="Upload"
                  height={40}
                  width={40}
                />
              </div>
              <div style={{ color: "#666" }}>Upload image</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input
          placeholder="Enter name"
          style={{ padding: "12px", borderRadius: "8px" }}
        />
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="contact"
        rules={[
          { required: true, message: "Please input the contact number!" },
        ]}
      >
        <Input
          placeholder="Enter contact number"
          style={{ padding: "12px", borderRadius: "8px" }}
        />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input the address!" }]}
      >
        <Input
          placeholder="Enter address"
          style={{ padding: "12px", borderRadius: "8px" }}
        />
      </Form.Item>

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
          marginTop: "4px",
        }}
      >
        Save & Change
      </Button>
    </Form>
  );
}
