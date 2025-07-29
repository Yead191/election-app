"use client";

import { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Row,
  Col,
  Divider,
  ConfigProvider,
  Tooltip,
} from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { toast } from "sonner";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { BsPencilFill, BsPencilSquare } from "react-icons/bs";
import { useGetProfileQuery } from "@/redux/feature/auth/authApi";
import Spinner from "@/components/Spinner/Spinner";

const { Title, Text } = Typography;
const { Option } = Select;

interface ProfileData {
  name: string;
  position: string;
  idNo: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Admin Humphrey",
    position: "Admin",
    idNo: "MM4178MRV2",
    email: "Asadujaman101@bd.com",
    contactNumber: "073 135 4568",
    dateOfBirth: "12 nov, 2024",
    gender: "Male",
    address: "284 Daffodil Dr, Mount Frere, Eastern Cape -5088 South Africa",
  });
  const { data, isLoading, refetch } = useGetProfileQuery(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { data: user } = data ?? {};
  // console.log(user);
  const handleEdit = () => {
    form.setFieldsValue({
      ...user?.data,
      dateOfBirth: dayjs(user?.data?.dob, "DD MMM, YYYY"),
    });
    setIsEditModalVisible(true);
  };

  const handleSettings = () => {
    setIsSettingsModalVisible(true);
  };

  const profileFields = [
    { label: "Name", value: user?.name, key: "name" },
    { label: "Role", value: user?.role, key: "role" },
    { label: "Id. no", value: user?._id, key: "_id" },
    { label: "Email", value: user?.email, key: "email" },
    {
      label: "Contact Number",
      value: user?.contact,
      key: "contact",
    },
    {
      label: "Date of birth",
      value: user?.dob ? dayjs(user.dob).format("DD-MM-YYYY") : "",
      key: "dob",
    },
    {
      label: "Gender",
      value:
        user?.gender === "male"
          ? "Male"
          : user?.gender === "female"
          ? "Female"
          : user?.gender === "other"
          ? "other"
          : "Not selected",
      key: "gender",
    },
    { label: "Address", value: user?.address, key: "address" },
  ];

  // console.log(user);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            width: "100%",
            backgroundColor: "white",
            borderRadius: 8,
            gap: 32,
            height: "85vh",
          }}
        >
          {/* Left Column - Profile Photo and Basic Info */}

          <div style={{ textAlign: "center" }}>
            <Avatar
              size={250}
              src={user?.image}
              icon={<UserOutlined />}
              style={{
                marginBottom: 16,
                border: "4px solid #f0f0f0",
                borderRadius: 12,
              }}
            />
            <Title level={4} style={{ margin: "8px 0 4px 0", color: "#333" }}>
              {user?.name}
            </Title>
            <Text style={{ color: "#1890ff", fontSize: 16 }}>{user?.role}</Text>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="w-full">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Title level={3} style={{ margin: 0, color: "#333" }}>
                Profile Information
              </Title>
              <Space size={"large"}>
                <Tooltip title="Change Password">
                  <Button
                    type="text"
                    icon={<SettingOutlined />}
                    onClick={handleSettings}
                    style={{ color: "#58553A", fontSize: 24 }}
                  />
                </Tooltip>
                <Tooltip title="Edit Profile">
                  <Button
                    type="text"
                    icon={<BsPencilSquare />}
                    onClick={handleEdit}
                    style={{ color: "#58553A", fontSize: 24 }}
                  />
                </Tooltip>
              </Space>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {profileFields.map((field, index) => (
                <div key={field.key}>
                  <Row>
                    <Col span={8}>
                      <Text
                        style={{
                          color: "#888",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        {field.label}
                      </Text>
                    </Col>
                    <Col span={16}>
                      <Text
                        style={{
                          color: "#333",
                          fontSize: 14,
                          wordBreak: "break-word",
                        }}
                      >
                        {field.value}
                      </Text>
                    </Col>
                  </Row>
                  {index < profileFields.length - 1 && (
                    <Divider style={{ margin: "12px 0" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* modal */}
          <ConfigProvider
            theme={{
              components: {
                Modal: {
                  contentBg: "rgb(241,241,249)",
                  headerBg: "rgb(241,241,249)",
                },
              },
            }}
          >
            <EditProfileModal
              visible={isEditModalVisible}
              onClose={() => setIsEditModalVisible(false)}
              user={user}
              refetch={refetch}
            />
            <ChangePasswordModal
              visible={isSettingsModalVisible}
              onClose={() => setIsSettingsModalVisible(false)}
            />
          </ConfigProvider>
        </div>
      )}
    </>
  );
}
