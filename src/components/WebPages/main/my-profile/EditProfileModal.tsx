"use client";

import { useState } from "react";
import {
  Modal,
  Input,
  Select,
  DatePicker,
  Button,
  Upload,
  Avatar,
  message,
  Row,
  Col,
} from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import dayjs from "dayjs"; // Ensure dayjs is imported
import { useUpdateProfileMutation } from "@/redux/feature/auth/authApi";
import { toast } from "sonner";

const { Option } = Select;

interface FormData {
  name: string;
  dob: dayjs.Dayjs | null;
  contact: string;
  gender: string;
  squareNumber: string;
  address: string;
}

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user?: any;
  refetch: () => void;
}

export default function EditProfileModal({
  visible,
  onClose,
  user,
  refetch,
}: EditProfileModalProps) {
  // Initialize dob as a dayjs object if user.dob exists and is valid
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    dob: user?.dob ? dayjs(user.dob) : null, 
    contact: user?.contact || "",
    gender: user?.gender || "",
    squareNumber: user?.squareNumber || "",
    address: user?.address || "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(user?.image || "");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    handleChange("dob", date); // DatePicker passes dayjs object or null
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }

      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setFileList([
        {
          uid: "-1",
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
        },
      ]);

      return false; // Prevent auto upload
    },
    fileList,
    onRemove: () => {
      setSelectedImage(null);
      setImagePreview(user?.image || "");
      setFileList([]);
    },
    maxCount: 1,
  };

  const handleSave = async () => {
    // Basic validation
    if (!formData.name.trim()) {
      message.error("Please enter your name");
      return;
    }
    if (!formData.contact.trim()) {
      message.error("Please enter your contact number");
      return;
    }

    // Format dob to a string if needed by the API
    const formattedData = {
      ...formData,
      dob: formData.dob ? formData.dob.format("YYYY-MM-DD") : null, // Format date for API
      image: imagePreview,
    };

    try {
      toast.promise(updateProfile(formattedData).unwrap(), {
        loading: "Updating profile...",
        success: (res) => {
          refetch();
          onClose();
          return <b>{res.message}</b>;
        },
        error: "An error occurred while updating your profile",
      });
    } catch (error) {
      message.error("An error occurred while updating your profile");
    }
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    color: "#262626",
  };

  const inputStyle = {
    height: "40px",
    borderRadius: "6px",
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      closeIcon={
        <CloseOutlined style={{ fontSize: "16px", color: "#8c8c8c" }} />
      }
      title="Edit Profile"
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: 12,
        }}
      >
        {/* Profile Image Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "32px",
            gap: "16px",
          }}
        >
          <div style={{ position: "relative" }}>
            <Avatar
              size={96}
              src={imagePreview || "/placeholder.svg?height=96&width=96"}
              icon={<UserOutlined />}
              style={{
                border: "2px solid #f0f0f0",
              }}
            />
          </div>

          <Upload {...uploadProps} showUploadList={false}>
            <Button
              icon={<UploadOutlined />}
              style={{
                borderRadius: "6px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Upload New Image
            </Button>
          </Upload>

          {selectedImage && (
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(user?.image || "");
                setFileList([]);
              }}
              style={{
                fontSize: "12px",
                height: "auto",
                padding: "4px 8px",
              }}
            >
              Remove Image
            </Button>
          )}
        </div>

        {/* Form Fields */}
        <Row gutter={20}>
          <Col span={12}>
            <div>
              <label style={labelStyle}>Name</label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                style={inputStyle}
                placeholder="Enter your name"
              />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label style={labelStyle}>Date of birth</label>
              <DatePicker
                value={formData.dob}
                onChange={handleDateChange}
                style={{ width: "100%", height: "40px", borderRadius: "6px" }}
                format="DD/MM/YYYY"
                placeholder="Select date of birth"
              />
            </div>
          </Col>
        </Row>

        <div style={{ height: "20px" }} />

        <Row gutter={20}>
          <Col span={12}>
            <div>
              <label style={labelStyle}>Contact number</label>
              <Input
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                style={inputStyle}
                placeholder="Enter contact number"
              />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label style={labelStyle}>Gender</label>
              <Select
                value={formData.gender}
                onChange={(value) => handleChange("gender", value)}
                style={{ width: "100%", height: "40px" }}
                placeholder="Select gender"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>
          </Col>
        </Row>

        <div style={{ height: "20px" }} />

        <Row gutter={20}>
          <Col span={12}>
            <div>
              <label style={labelStyle}>Square Number</label>
              <Input
                value={formData.squareNumber}
                onChange={(e) => handleChange("squareNumber", e.target.value)}
                style={inputStyle}
                placeholder="Enter square number"
              />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label style={labelStyle}>Address</label>
              <Input
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                style={inputStyle}
                placeholder="Enter address"
              />
            </div>
          </Col>
        </Row>

        {/* Save Button */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Button
            type="primary"
            onClick={handleSave}
            loading={isLoading}
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
}