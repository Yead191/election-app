"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  DatePicker,
  Modal,
  Form,
  Select,
  Space,
  message,
} from "antd";
import {
  SearchOutlined,
  FilePdfOutlined,
  UnlockOutlined,
  LockOutlined,
  CalendarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";

const { Option } = Select;

const mockAdmins = [
  {
    key: "1",
    sNo: "2472",
    adminName: "Admin Asadujjaman",
    email: "kenzi.lawson@example.com",
    adminType: "Admin",
    status: "active",
  },
  {
    key: "2",
    sNo: "2450",
    adminName: "Admin Asadujjaman",
    email: "sara.cruz@example.com",
    adminType: "Admin",
    status: "active",
  },
  {
    key: "3",
    sNo: "2450",
    adminName: "Admin Asadujjaman",
    email: "nathan.roberts@example.com",
    adminType: "Admin",
    status: "inactive",
  },
  {
    key: "4",
    sNo: "2450",
    adminName: "Dr. Anna KOWALSKA",
    email: "alma.lawson@example.com",
    adminType: "Admin",
    status: "active",
  },
  {
    key: "5",
    sNo: "2450",
    adminName: "Dr. Michael O'CONNOR",
    email: "tim.jennings@example.com",
    adminType: "Admin",
    status: "active",
  },
  {
    key: "6",
    sNo: "2465",
    adminName: "Dr. Yasmin AL-FARSI",
    email: "willie.jennings@example.com",
    adminType: "Admin",
    status: "active",
  },
  {
    key: "7",
    sNo: "2472",
    adminName: "Dr. Leila BEN AMAR",
    email: "bill.sanders@example.com",
    adminType: "Admin",
    status: "active",
  },
  {
    key: "8",
    sNo: "2465",
    adminName: "Dr. Elena PETROVA",
    email: "debra.holt@example.com",
    adminType: "Admin",
    status: "active",
  },
];

export default function ManageAdminPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [admins, setAdmins] = useState(mockAdmins);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.adminName.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.adminType.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(filteredAdmins.map((admin) => admin.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleSelectRow = (key: string, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, key]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter((k) => k !== key));
    }
  };

  const handleEdit = (record: any) => {
    setCurrentAdmin(record);
    form.setFieldsValue({
      adminName: record.adminName,
      email: record.email,
      password: "",
      userType: record.adminType,
    });
    setEditModalVisible(true);
  };

  const handleStatusToggle = (record: any) => {
    const newStatus = record.status === "active" ? "inactive" : "active";
    setAdmins(
      admins.map((admin) =>
        admin.key === record.key ? { ...admin, status: newStatus } : admin
      )
    );
    message.success(`Admin status updated to ${newStatus}`);
  };

  const handleDelete = (record: any) => {
    setCurrentAdmin(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setAdmins(admins.filter((admin) => admin.key !== currentAdmin.key));
    setDeleteModalVisible(false);
    setCurrentAdmin(null);
    message.success("Admin deleted successfully");
    toast.success("Admin deleted successfully");
  };

  const handleEditSubmit = (values: any) => {
    setAdmins(
      admins.map((admin) =>
        admin.key === currentAdmin.key
          ? {
              ...admin,
              adminName: values.adminName,
              email: values.email,
              adminType: values.userType,
            }
          : admin
      )
    );
    setEditModalVisible(false);
    setCurrentAdmin(null);
    form.resetFields();
    message.success("Admin updated successfully");
    toast.success("Admin updated successfully");
  };

  const handleAddAgent = () => {
    // Add agent functionality
    toast.info("Developer is working on it");
    message.info("Add Agent functionality");
  };

  const isAllSelected =
    filteredAdmins.length > 0 &&
    selectedRowKeys.length === filteredAdmins.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 &&
    selectedRowKeys.length < filteredAdmins.length;

  const columns = [
    {
      title: (
        <input
          type="checkbox"
          checked={isAllSelected}
          ref={(input) => {
            if (input) input.indeterminate = isIndeterminate;
          }}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      dataIndex: "select",
      width: 50,
      render: (_: any, record: any) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => handleSelectRow(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "S. no.",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Admin name",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin Type",
      dataIndex: "adminType",
      key: "adminType",
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      render: (_: any, record: any) => (
        <Space className="flex justify-end ">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: "#1890ff", fontSize: 20 }}
          />
          <Button
            type="text"
            icon={
              record.status === "active" ? <LockOutlined /> : <UnlockOutlined />
            }
            onClick={() => handleStatusToggle(record)}
            style={{
              color: record.status === "inactive" ? "#ff4d4f" : "#52c41a",
              fontSize: 20,
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            style={{ color: "#ff4d4f", fontSize: 20 }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "16px 24px",
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginBottom: "24px",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Button
            icon={<FilePdfOutlined style={{ fontSize: "20px" }} />}
            style={{
              color: "#3A99D9",
              padding: "19px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #E1E3EB, #DDE0EA, #CEE9FF)",
            }}
          />
          <Button
            icon={<UnlockOutlined style={{ fontSize: "20px" }} />}
            style={{
              color: "#A1A1A1",
              padding: "19px",
              border: "none",
            }}
          />
          <Button
            icon={<LockOutlined style={{ fontSize: "20px" }} />}
            style={{
              color: "#A1A1A1",
              padding: "19px",
              border: "none",
            }}
          />
          <Input
            placeholder="Search by name, email, or designation"
            allowClear
            style={{
              width: 350,
              padding: "6px 12px 6px 6px",
              borderRadius: "30px",
            }}
            prefix={
              <SearchOutlined
                style={{
                  fontSize: "16px",
                  borderRadius: "50%",
                  padding: "6px",
                  backgroundColor: "#B7DBC9",
                }}
              />
            }
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <DatePicker
          placeholder="Date"
          suffixIcon={<CalendarOutlined />}
          style={{
            width: 94,
            height: "40px",
            borderRadius: "6px",
          }}
        />
        <Button
          onClick={handleAddAgent}
          type="primary"
          style={{
            backgroundColor: "#18953D",
            borderColor: "#18953D",
            borderRadius: "8px",
            padding: "8px 16px",
            height: "auto",
            display: "flex",
            alignItems: "center",
          }}
          className="leading-5"
        >
          Add Agent
          <PlusOutlined />
        </Button>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredAdmins}
          pagination={false}
          size="middle"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setCurrentAdmin(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
        closeIcon={<span style={{ fontSize: "24px", color: "#999" }}>×</span>}
      >
        <Form
          form={form}
          onFinish={handleEditSubmit}
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
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input
              placeholder="1454"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
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
              <Option value="Admin">Admin</Option>
              <Option value="Super Admin">Super Admin</Option>
              <Option value="Manager">Manager</Option>
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
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setCurrentAdmin(null);
        }}
        footer={null}
        width={400}
        centered
      >
        <div style={{ textAlign: "center", padding: "24px" }}>
          <h3
            style={{
              color: "#F90B0F",
              fontSize: "16px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            Are you sure !
          </h3>
          <p
            className="leading-6"
            style={{ color: "#606060", fontSize: "16px", marginBottom: "8px" }}
          >
            Do you want to delete your admin ?
          </p>
          <p
            style={{ color: "#606060", fontSize: "12px", marginBottom: "32px" }}
          >
            Only Super admin can delete this item.
          </p>
          <Button
            type="primary"
            onClick={confirmDelete}
            style={{
              backgroundColor: "#1BA0D9",
              borderColor: "#1890ff",
              borderRadius: "8px",
              padding: "8px 24px",
              height: "auto",
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}
