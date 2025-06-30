"use client";

import type React from "react";
import { useState } from "react";
import { Modal, Input, Button, Select, DatePicker, Upload } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import dayjs from "dayjs";

const { Option } = Select;

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    userName?: string;
    contactNumber?: string;
    squareNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  onSave,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    userName: initialData.userName || "",
    contactNumber: initialData.contactNumber || "",
    squareNumber: initialData.squareNumber || "",
    dateOfBirth: initialData.dateOfBirth || "",
    gender: initialData.gender || "Male",
    address: initialData.address || "",
    profilePicture: null,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    const dateStr = Array.isArray(dateString)
      ? dateString[0] || ""
      : dateString || "";
    setFormData((prev) => ({ ...prev, dateOfBirth: dateStr }));
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      setFormData((prev) => ({
        ...prev,
        profilePicture: info.file.originFileObj,
      }));
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: handleUpload,
    showUploadList: false,
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const dateValue = formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      closeIcon={
        <CloseOutlined style={{ fontSize: "16px", color: "#8c8c8c" }} />
      }
      title={"Edit Profile"}
    >
      <div
        style={{ padding: "20px", backgroundColor: "white", borderRadius: 12 }}
      >
        {/* Profile Picture Upload */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "14px",
              color: "#262626",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            Profile Picture
          </div>
          <div
            style={{
              border: "2px dashed #d9d9d9",
              borderRadius: "8px",
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Upload {...uploadProps}>
              <div style={{ cursor: "pointer" }}>
                <UploadOutlined
                  style={{
                    fontSize: "24px",
                    color: "#8c8c8c",
                    marginBottom: "8px",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    color: "#8c8c8c",
                    fontSize: "14px",
                  }}
                >
                  Upload Image
                </div>
              </div>
            </Upload>
          </div>
        </div>

        {/* Form Fields */}
        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Name */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#262626",
                fontWeight: 500,
              }}
            >
              Name
            </label>
            <Input
              value={formData.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              placeholder="Cevat"
              style={{
                height: "40px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#262626",
                fontWeight: 500,
              }}
            >
              Date of birth
            </label>
            <DatePicker
              value={dateValue}
              onChange={handleDateChange}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "6px",
              }}
              placeholder="250 mg"
              format="DD/MM/YYYY"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#262626",
                fontWeight: 500,
              }}
            >
              Contact number
            </label>
            <Input
              value={formData.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              placeholder="Square"
              style={{
                height: "40px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Gender */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#262626",
                fontWeight: 500,
              }}
            >
              Gender
            </label>
            <Select
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              style={{
                width: "100%",
                height: "40px",
              }}
              placeholder="Male"
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </div>

          {/* Contact Number (Second) */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#262626",
                fontWeight: 500,
              }}
            >
              Contact number
            </label>
            <Input
              value={formData.squareNumber}
              onChange={(e) => handleChange("squareNumber", e.target.value)}
              placeholder="Square"
              style={{
                height: "40px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Address */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#262626",
                fontWeight: 500,
              }}
            >
              Address
            </label>
            <Input
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Netherlands"
              style={{
                height: "40px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        {/* Save Button */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
          }}
        >
          <Button
            type="primary"
            onClick={handleSave}
            style={{
              background: "#1BA0D9",
              borderColor: "#1BA0D9",
              height: "40px",
              paddingLeft: "32px",
              paddingRight: "32px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Save & Change
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
