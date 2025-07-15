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
import NominatedTeamModal from "./NominatedTeamModal";
import DeleteTeam from "./DeleteTeam";
import {
  useDeleteNominatedTeamMutation,
  useGetNominatedTeamQuery,
} from "@/redux/feature/nominated-team-api/nominated-team-api";
import { imgUrl } from "@/app/(dashboard)/layout";

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

  // api calls

  // get teams
  const { data: teamsData, refetch } = useGetNominatedTeamQuery({
    searchTerm: searchText,
  });
  // delete team
  const [deleteNominatedTeam] = useDeleteNominatedTeamMutation();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(teamsData?.data?.map((team: any) => team._id));
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
    setImageUrl(record.image);
    form.setFieldsValue({
      name: record.name,
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
    toast.promise(deleteNominatedTeam({ id: currentTeam._id }).unwrap(), {
      loading: "Deleting team...",
      success: (res) => {
        refetch();
        setDeleteModalVisible(false);
        setCurrentTeam(null);
        return <b>{res.message}</b>;
      },
      error: (err) => `Error: ${err?.data?.message || "Something went wrong"}`,
    });
  };

  const isAllSelected =
    teamsData?.data?.length > 0 &&
    selectedRowKeys.length === teamsData?.data?.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 &&
    selectedRowKeys.length < teamsData?.data?.length;

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
          checked={selectedRowKeys.includes(record._id)}
          onChange={(e) => handleSelectRow(record._id, e.target.checked)}
        />
      ),
    },
    {
      title: "Id no.",
      dataIndex: "_id",
      key: "_id",
      width: 100,
    },
    {
      title: "Team Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Team Simple",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (logo: string) => (
        <img
          src={imgUrl + logo || "/placeholder.svg?height=60&width=60"}
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
          justifyContent: "end",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        {/* <div></div> */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* <Input
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
          /> */}

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
          dataSource={teamsData?.data}
          pagination={false}
          size="middle"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* Edit/Add Modal */}
      <NominatedTeamModal
        editModalVisible={editModalVisible}
        form={form}
        isAddMode={isAddMode}
        setImageUrl={setImageUrl}
        setImageFile={setImageFile}
        setEditModalVisible={setEditModalVisible}
        setCurrentTeam={setCurrentTeam}
        imageFile={imageFile}
        imageUrl={imageUrl}
        refetch={refetch}
        currentTeam={currentTeam}
      />

      {/* Delete Confirmation Modal */}
      <DeleteTeam
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        setCurrentTeam={setCurrentTeam}
        confirmDelete={confirmDelete}
      />
    </div>
  );
}
