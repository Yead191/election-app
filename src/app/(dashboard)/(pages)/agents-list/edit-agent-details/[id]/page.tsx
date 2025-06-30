"use client";
import { Button, Input, Form, Upload, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { BsPencilSquare } from "react-icons/bs";

export default function EditAgentPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // 'settings' or 'edit'
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  //   console.log(params.id);
  const isSettingsMode = mode === "settings";

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission
    console.log("Selected image file:", imageFile); // 👈 actual file

    if (imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      formData.append("name", values.name);
      // ...append other fields

      // Upload this via fetch/axios as needed
    }
    toast.success("Form submitted successfully!");
  };

  if (isSettingsMode) {
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
              marginBottom: "24px",
            }}
          >
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.back()}
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
                  style={{ borderRadius: "6px", fontSize: 20, padding: 6 }}
                />
              </Tooltip>
            </div>
          </div>

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
              label="Old Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter old password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ padding: "12px", borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
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
              orci turpis tincidunt Lorem non non, faucibus dui. Nunc elit
              lobortis, lacus id nisl. enim. In tincidunt vel Ut ipsum ipsum
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
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
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
                style={{
                  borderRadius: "6px",
                  fontSize: 20,
                  padding: 6,
                  color: !isSettingsMode ? "#1BA0D9" : "#000",
                }}
              />
            </Tooltip>
          </div>
        </div>

        <Form
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item label="Profile Picture" name="profilePicture">
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
                    src={imageUrl}
                    alt="Profile Preview"
                    style={{
                      width: "100%",
                      // maxWidth: "600px",
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
                    width: "500px",
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
            initialValue="Ceevit"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input
              placeholder="Enter name"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNumber1"
            initialValue="Square"
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
            label="Contact Number"
            name="contactNumber2"
            initialValue="Square"
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
            initialValue="Netherlands"
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
      </div>
    </div>
  );
}
