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
import ManageAdminModal from "./ManageAdminModal";
import DeleteAdminModal from "./DeleteModal";
import {
  useDeleteAdminMutation,
  useGetAdminListQuery,
  useUpdateStatusMutation,
} from "@/redux/feature/admin-api/adminApi";
import ViewAdminDetailsModal from "./ViewAdminDetailsModal";

export default function ManageAdminPage() {
  const [searchText, setSearchText] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [form] = Form.useForm();
  const [statusFilter, setStatusFilter] = useState<string>(""); // "all", "active", "delete"
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);

  // getting data from api
  const { data: adminsData, refetch } = useGetAdminListQuery({
    searchTerm: searchText,
    status: statusFilter,
  });

  // console.log(adminsData);

  // update status
  const [updateAdminStatus] = useUpdateStatusMutation();

  const handleViewDetails = (record: any) => {
    setCurrentAdmin(record);
    setViewDetailsVisible(true);
  };

  // delete admin
  const [deleteAdmin] = useDeleteAdminMutation();
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

  const handleStatusToggle = (id: any) => {
    // const newStatus = record.status === "active" ? "delete" : "active";

    toast.promise(updateAdminStatus({ id: id }).unwrap(), {
      loading: "Updating status...",
      success: (res) => {
        refetch();
        return <b>{res.message}</b>;
      },
      error: (err) => `Error: ${err?.data?.message || "Something went wrong"}`,
    });
  };

  const handleDelete = (id: any) => {
    setCurrentAdmin(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    toast.promise(deleteAdmin({ id: currentAdmin }).unwrap(), {
      loading: "Deleting admin...",
      success: (res) => {
        refetch();
        setDeleteModalVisible(false);
        setCurrentAdmin(null);
        return <b>{res.message}</b>;
      },
      error: (err) => `Error: ${err?.data?.message || "Something went wrong"}`,
    });
  };

  const handleCancel = () => {
    setEditModalVisible(false);
    setCurrentAdmin(null);
    form.resetFields();
  };

  const columns = [
    {
      title: "Id. no.",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="text-sm">{text.slice(0, 8)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Admin name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span
          style={{
            color: "#1890ff",
            fontWeight: "500",
          }}
        >
          {role}
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
          {status === "active" ? "Active" : "Locked"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      render: (_: any, record: any) => (
        <Space className="flex justify-end ">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
              style={{ color: "#999999", fontSize: 20 }}
            />
          </Tooltip>
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
              onClick={() => handleStatusToggle(record._id)}
              style={{
                color: record.status === "delete" ? "#ff4d4f" : "#52c41a",
                fontSize: 20,
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<FaRegTrashAlt />}
              onClick={() => handleDelete(record._id)}
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
            onClick={() => toast.info("Coming soon")}
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
              setStatusFilter(statusFilter === "active" ? "" : "active")
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
              setStatusFilter(statusFilter === "delete" ? "" : "delete")
            }
            style={{
              color: statusFilter === "delete" ? "#ff4d4f" : "#A1A1A1",
              padding: "19px",
              border: statusFilter === "delete" ? "2px solid #ff4d4f" : "none",
              backgroundColor:
                statusFilter === "delete" ? "#fff2f0" : "transparent",
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
          {statusFilter !== "" && (
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
              Showing: {statusFilter === "active" ? "Active" : "Inactive"}{" "}
              admins ({adminsData?.data?.length})
            </span>
          )}
        </div>

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
          dataSource={adminsData?.data || []}
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
        setCurrentAdmin={setCurrentAdmin}
        setEditModalVisible={setEditModalVisible}
        form={form}
        currentAdmin={currentAdmin}
        refetch={refetch}
      />

      {/* Delete Confirmation Modal */}
      <DeleteAdminModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        setCurrentAdmin={setCurrentAdmin}
        confirmDelete={confirmDelete}
      />
      {/* View Details Modal */}
      <ViewAdminDetailsModal
        visible={viewDetailsVisible}
        refetch={refetch}
        onClose={() => {
          setViewDetailsVisible(false);
          setCurrentAdmin(null);
        }}
        adminData={currentAdmin}
      />
    </div>
  );
}
