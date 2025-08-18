"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Avatar,
  DatePicker,
  Tooltip,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import {
  SearchOutlined,
  FilePdfOutlined,
  InfoCircleOutlined,
  EditOutlined,
  PlusOutlined,
  CalendarOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { mockAgents } from "@/data/mockAgents";
import AgentModal from "./AgentModal";
import { toast } from "sonner";
import {
  useAddAgentExcelMutation,
  useGetAgentListQuery,
  useUpdateAgentStatusMutation,
} from "@/redux/feature/agent-list-apis/agentApi";
import FileUploadButton from "../election-area/FileUploadComponent";

export default function AgentsListPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>(""); // "all",
  // "active", "delete"
  const [form] = Form.useForm();
  const router = useRouter();
  const [page, setPage] = useState(1);

  // add agent by excel
  const [addAgentExcel] = useAddAgentExcelMutation();

  // get agent list api
  const { data: agentsData, refetch } = useGetAgentListQuery({
    searchTerm: searchText,
    status: statusFilter,
    page,
    limit: 10,
  });
  // update agent status
  const [updateAgentStatus] = useUpdateAgentStatusMutation();
  // console.log(agentsData);
  const paginationData = agentsData?.pagination;

  const handleAdd = () => {
    setEditingAgent(null);
    setIsAddMode(true);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleUpdateStatus = (id: string) => {
    // console.log(id);
    toast.promise(updateAgentStatus({ id }).unwrap(), {
      loading: "Updating status...",
      success: (response) => {
        refetch();
        return `Status updated to ${
          response.data.status === "active" ? "active" : "delete"
        }!`;
      },
      error: (error) => `Failed to update status: ${error.message}`,
    });
  };



  const columns = [
    {
      title: "Represent Code",
      dataIndex: "represent_code",
      key: "represent_code",
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="text-sm">{text.slice(0, 8)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space>
          <Avatar
            src={
              record?.image?.startsWith("http")
                ? record?.image
                : `${process.env.NEXT_PUBLIC_IMG_URL}${record?.image}`
            }
            size={32}
          />
          {text}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Position",
      dataIndex: "role",
      key: "role",
    },
    // {
    //   title: "Department",
    //   dataIndex: "department",
    //   key: "department",
    // },
    {
      title: "Postal Code",
      dataIndex: "postalCode",
      key: "postalCode",
    },
    {
      title: "Pooling Station",
      dataIndex: "pollingStation",
      key: "pollingStation",
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
      render: (text: any, record: any) => (
        <Space>
          <Button
            type="text"
            icon={<InfoCircleOutlined />}
            onClick={() =>
              router.push(`/representative-list/agent-profile/${record._id}`)
            }
            style={{ color: "#1890ff", fontSize: 20 }}
          />
          <Tooltip title={record?.status === "active" ? "Lock" : "Activate"}>
            <Button
              type="text"
              onClick={() => handleUpdateStatus(record._id)}
              icon={
                record.status === "active" ? (
                  <UnlockOutlined />
                ) : (
                  <LockOutlined />
                )
              }
              size="small"
              style={{
                color: record.status === "active" ? "#52c41a" : "#ff4d4f",
                fontSize: 20,
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
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
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <FileUploadButton uploadExcel={addAgentExcel} refetch={refetch} />

            <Button
              icon={<UnlockOutlined style={{ fontSize: "20px" }} />}
              onClick={() =>
                setStatusFilter(statusFilter === "active" ? "" : "active")
              }
              style={{
                color: statusFilter === "active" ? "#52c41a" : "#A1A1A1",
                padding: "19px",
                border:
                  statusFilter === "active" ? "2px solid #52c41a" : "none",
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
                border:
                  statusFilter === "delete" ? "2px solid #ff4d4f" : "none",
                backgroundColor:
                  statusFilter === "delete" ? "#fff2f0" : "transparent",
              }}
            />
            <Input
              placeholder="Search by name, email, position, or department"
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
                Showing: {statusFilter} agents ({agentsData?.data?.length})
              </span>
            )}
          </div>
          {/* <DatePicker
            placeholder="Date"
            suffixIcon={<CalendarOutlined />}
            style={{
              width: 94,
              height: "40px",
              borderRadius: "6px",
            }}
          /> */}
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
            Add Agent
            <PlusOutlined />
          </Button>
        </div>
        <div className="">
          <Table
            columns={columns}
            dataSource={agentsData?.data || []}
            pagination={{
              total: paginationData?.total,
              pageSize: paginationData?.limit,
              current: paginationData?.page,
              onChange: (page) => setPage(page),
            }}
            size="middle"
            style={{
              backgroundColor: "white",
            }}
            scroll={{}}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AgentModal
        isAddMode={isAddMode}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setEditingAgent={setEditingAgent}
        form={form}
        refetch={refetch}
      />
    </div>
  );
}
