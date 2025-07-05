"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  message,
  Upload,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { mockTeams } from "@/data/mockTeams";

export default function NominatedTeamPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [teams, setTeams] = useState(mockTeams);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<any>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form] = Form.useForm();

  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(filteredTeams.map((team) => team.key));
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
    setCurrentTeam(record);
    setIsAddMode(false);
    setImageUrl(record.teamLogo);
    form.setFieldsValue({
      teamName: record.teamName,
    });
    setEditModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentTeam(null);
    setIsAddMode(true);
    setImageUrl(null);
    setImageFile(null);
    form.resetFields();
    setEditModalVisible(true);
  };

  const handleDelete = (record: any) => {
    setCurrentTeam(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setTeams(teams.filter((team) => team.key !== currentTeam.key));
    setDeleteModalVisible(false);
    setCurrentTeam(null);
    toast.success("Team deleted successfully");
  };

  const handleFormSubmit = (values: any) => {
    if (isAddMode) {
      const newTeam = {
        key: Date.now().toString(),
        sNo: (teams.length + 1).toString(),
        teamName: values.teamName,
        teamLogo: imageUrl || "/placeholder.svg?height=60&width=60",
      };
      setTeams([...teams, newTeam]);
      toast.success("Team added successfully");
    } else {
      setTeams(
        teams.map((team) =>
          team.key === currentTeam.key
            ? {
                ...team,
                teamName: values.teamName,
                teamLogo: imageUrl || team.teamLogo,
              }
            : team
        )
      );
      toast.success("Team updated successfully");
    }
    setEditModalVisible(false);
    setCurrentTeam(null);
    setImageUrl(null);
    setImageFile(null);
    form.resetFields();
  };

  const isAllSelected =
    filteredTeams.length > 0 && selectedRowKeys.length === filteredTeams.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 && selectedRowKeys.length < filteredTeams.length;

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
      width: 100,
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
      width: 200,
    },
    {
      title: "Team Simple",
      dataIndex: "teamLogo",
      key: "teamLogo",
      width: 150,
      render: (logo: string) => (
        <img
          src={logo || "/placeholder.svg"}
          alt="Team Logo"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      width: 120,
      render: (_: any, record: any) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<BsPencilSquare />}
              onClick={() => handleEdit(record)}
              style={{ color: "#999999", fontSize: "20px" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<FaRegTrashAlt />}
              onClick={() => handleDelete(record)}
              style={{ color: "#999999", fontSize: "20px" }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "16px 24px",
        borderRadius: "8px",
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
        <div></div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Input
            className="shadow-sm"
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

          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              backgroundColor: "#188A50",
              borderColor: "#18953D",
              borderRadius: "8px",
              padding: "8px 16px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            Add Team
          </Button>
        </div>
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
          dataSource={filteredTeams}
          pagination={false}
          size="middle"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* Edit/Add Modal */}
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

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setCurrentTeam(null);
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
            Do you want to delete this team ?
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
              borderColor: "#1BA0D9",
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
