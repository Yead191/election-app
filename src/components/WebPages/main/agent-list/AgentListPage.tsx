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
  useGetAgentListQuery,
  useUpdateAgentStatusMutation,
} from "@/redux/feature/agent-list-apis/agentApi";

const { Option } = Select;

export default function AgentsListPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [agents, setAgents] = useState(mockAgents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const { data: agentsData, refetch } = useGetAgentListQuery({
    searchTerm: searchText,
  });
  const [updateAgentStatus] = useUpdateAgentStatusMutation();
  // console.log(agentsData);
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(agentsData?.data?.map((agent: any) => agent._id));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleSelectRow = (_id: string, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, _id]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter((k) => k !== _id));
    }
  };

  const handleAdd = () => {
    setEditingAgent(null);
    setIsAddMode(true);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: any) => {
    if (isAddMode) {
      const newAgent = {
        key: Date.now().toString(),
        id: `AG${Date.now().toString().slice(-8)}`,
        ...values,
        avatar: "/images/asad.jpg?height=40&width=40",
      };
      setAgents([...agents, newAgent]);
      message.success("Agent added successfully");
    } else {
      setAgents(
        agents.map((agent) =>
          agent.key === editingAgent.key
            ? {
                ...agent,
                ...values,
              }
            : agent
        )
      );
      message.success("Agent updated successfully");
    }
    setIsModalVisible(false);
    setEditingAgent(null);
    form.resetFields();
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

  const isAllSelected =
    agentsData?.data?.length > 0 &&
    selectedRowKeys.length === agentsData?.data?.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 &&
    selectedRowKeys.length < agentsData?.data?.length;

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
      render: (_: any, record: any) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record._id)}
          onChange={(e) => handleSelectRow(record._id, e.target.checked)}
        />
      ),
    },
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space>
          <Avatar src={record.image} size={32} />
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
          {status}
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
              router.push(`/agents-list/agent-profile/${record._id}`)
            }
            style={{ color: "#1890ff", fontSize: 20 }}
          />
          {/* <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: "#52c41a", fontSize: 20 }}
          /> */}
          <Tooltip
            title={record?.status === "active" ? "Deactivate" : "Activate"}
          >
            <Button
              type="text"
              onClick={() => handleUpdateStatus(record._id)}
              icon={
                record.status === "active" ? (
                  <LockOutlined />
                ) : (
                  <UnlockOutlined />
                )
              }
              size="small"
              style={{
                color: record.status === "active" ? "#ff4d4f" : "#52c41a",
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
            <Button
              onClick={() => toast.info("This feature is under development")}
              icon={<FilePdfOutlined style={{ fontSize: "20px" }} />}
              style={{
                color: "#3A99D9",
                padding: "19px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, #E1E3EB, #DDE0EA, #CEE9FF)",
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
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
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
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
