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
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  FilePdfOutlined,
  UnlockOutlined,
  LockOutlined,
  CalendarOutlined,
  PlusOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { mockAdmins } from "@/data/mockAdmins";
import ManageAdminModal from "./ManageAdminModal";
import DeleteModal from "./DeleteModal";
import DeleteAdminModal from "./DeleteModal";

const { Option } = Select;

export default function ManageAdminPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [admins, setAdmins] = useState(mockAdmins);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [form] = Form.useForm();
  const [statusFilter, setStatusFilter] = useState<string>("all"); // "all", "active", "inactive"

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      admin.adminName.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchText.toLowerCase()) ||
      admin.adminType.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && admin.status === "active") ||
      (statusFilter === "inactive" && admin.status === "inactive");

    return matchesSearch && matchesStatus;
  });

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
    setIsAddMode(false);
    form.setFieldsValue({
      adminName: record.adminName,
      email: record.email,
      password: "",
      userType: record.adminType,
    });
    setEditModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentAdmin(null);
    setIsAddMode(true);
    form.resetFields();
    setEditModalVisible(true);
  };

  const handleStatusToggle = (record: any) => {
    const newStatus = record.status === "active" ? "inactive" : "active";
    setAdmins(
      admins.map((admin) =>
        admin.key === record.key ? { ...admin, status: newStatus } : admin
      )
    );
    toast.success(`Admin status updated to ${newStatus}`);
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

  const handleFormSubmit = (values: any) => {
    if (isAddMode) {
      const newAdmin = {
        key: Date.now().toString(),
        sNo: (
          Math.max(...admins.map((a) => Number.parseInt(a.sNo))) + 1
        ).toString(),
        adminName: values.adminName,
        email: values.email,
        adminType: values.userType,
        status: "active",
      };
      setAdmins([...admins, newAdmin]);
      message.success("Admin added successfully");
      toast.success("Admin added successfully");
    } else {
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
      message.success("Admin updated successfully");
      toast.success("Admin updated successfully");
    }
    setEditModalVisible(false);
    setCurrentAdmin(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setEditModalVisible(false);
    setCurrentAdmin(null);
    form.resetFields();
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
      render: (type: string) => (
        <span
          style={{
            color:
              type === "Super Admin"
                ? "#1890ff"
                : type === "Manager"
                ? "#52c41a"
                : "#666",
            fontWeight: "500",
          }}
        >
          {type}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: status === "active" ? "#52c41a" : "#ff4d4f",
            fontWeight: "500",
            textTransform: "capitalize",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      render: (_: any, record: any) => (
        <Space className="flex justify-end ">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<BsPencilSquare />}
              onClick={() => handleEdit(record)}
              style={{ color: "#999999", fontSize: 20 }}
            />
          </Tooltip>
          <Tooltip title={record.status === "active" ? "Lock" : "Unlock"}>
            <Button
              type="text"
              icon={
                record.status === "active" ? (
                  <UnlockOutlined style={{ color: "#999999" }} />
                ) : (
                  <LockOutlined />
                )
              }
              onClick={() => handleStatusToggle(record)}
              style={{
                color: record.status === "inactive" ? "#ff4d4f" : "#52c41a",
                fontSize: 20,
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<FaRegTrashAlt />}
              onClick={() => handleDelete(record)}
              style={{ color: "#999999", fontSize: 20 }}
            />
          </Tooltip>
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
            onClick={() =>
              setStatusFilter(statusFilter === "active" ? "all" : "active")
            }
            style={{
              color: statusFilter === "active" ? "#52c41a" : "#A1A1A1",
              padding: "19px",
              border: statusFilter === "active" ? "2px solid #52c41a" : "none",
              backgroundColor:
                statusFilter === "active" ? "#f6ffed" : "transparent",
            }}
          />
          <Button
            icon={<LockOutlined style={{ fontSize: "20px" }} />}
            onClick={() =>
              setStatusFilter(statusFilter === "inactive" ? "all" : "inactive")
            }
            style={{
              color: statusFilter === "inactive" ? "#ff4d4f" : "#A1A1A1",
              padding: "19px",
              border:
                statusFilter === "inactive" ? "2px solid #ff4d4f" : "none",
              backgroundColor:
                statusFilter === "inactive" ? "#fff2f0" : "transparent",
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
          {statusFilter !== "all" && (
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                backgroundColor: "#f0f0f0",
                padding: "4px 8px",
                borderRadius: "4px",
                marginLeft: "8px",
              }}
            >
              Showing: {statusFilter} admins ({filteredAdmins.length})
            </span>
          )}
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
          onClick={handleAdd}
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
          Add Admin
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
          pagination={{
            pageSize: 10,
            // showSizeChanger: true,
            // pageSizeOptions: ["10", "20", "50", "100"],
          }}
          size="middle"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* Add/Edit Modal */}
      <ManageAdminModal
        isAddMode={isAddMode}
        editModalVisible={editModalVisible}
        handleCancel={handleCancel}
        handleFormSubmit={handleFormSubmit}
        form={form}
      />

      {/* Delete Confirmation Modal */}
      <DeleteAdminModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        setCurrentAdmin={setCurrentAdmin}
        confirmDelete={confirmDelete}
      />
    </div>
  );
}
