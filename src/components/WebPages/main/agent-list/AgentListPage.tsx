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

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchText.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchText.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchText.toLowerCase()) ||
      agent.position.toLowerCase().includes(searchText.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(filteredAgents.map((agent) => agent.key));
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

  const handleUpdateStatus = (key: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setAgents(
      agents.map((agent) =>
        agent.key === key ? { ...agent, status: newStatus } : agent
      )
    );
    message.success(`Agent status updated to ${newStatus}`);
  };

  const isAllSelected =
    filteredAgents.length > 0 &&
    selectedRowKeys.length === filteredAgents.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 &&
    selectedRowKeys.length < filteredAgents.length;

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
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => handleSelectRow(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Id. no.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space>
          <Avatar src={record.avatar} size={32} />
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
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Post Code",
      dataIndex: "postCode",
      key: "postCode",
    },
    // {
    //   title: "Pooling Address",
    //   dataIndex: "poolingAddress",
    //   key: "poolingAddress",

    // },
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
              router.push(`/agents-list/agent-profile/${record.key}`)
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
              onClick={() => handleUpdateStatus(record.key, record.status)}
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
            Add Agent
            <PlusOutlined />
          </Button>
        </div>
        <div className="">
          <Table
            columns={columns}
            dataSource={filteredAgents}
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
      <Modal
        title={isAddMode ? "Add New Agent" : "Edit Agent"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingAgent(null);
          form.resetFields();
        }}
        footer={null}
        width={700}
        closeIcon={<span style={{ fontSize: "20px", color: "#999" }}>×</span>}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          style={{ marginTop: "24px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input
                placeholder="Enter full name"
                style={{ padding: "12px", borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter email address"
                style={{ padding: "12px", borderRadius: "8px" }}
              />
            </Form.Item>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              label="Contact Number"
              name="contactNo"
              rules={[
                { required: true, message: "Please input contact number!" },
              ]}
            >
              <Input
                placeholder="Enter contact number"
                style={{ padding: "12px", borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label="Post Code"
              name="postCode"
              rules={[{ required: true, message: "Please input post code!" }]}
            >
              <Input
                placeholder="Enter post code"
                style={{ padding: "12px", borderRadius: "8px" }}
              />
            </Form.Item>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              label="Position"
              name="position"
              rules={[{ required: true, message: "Please select position!" }]}
            >
              <Select placeholder="Select position" style={{ height: "48px" }}>
                <Option value="Junior Agent">Junior Agent</Option>
                <Option value="Agent">Agent</Option>
                <Option value="Senior Agent">Senior Agent</Option>
                <Option value="Team Lead">Team Lead</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Please select department!" }]}
            >
              <Select
                placeholder="Select department"
                style={{ height: "48px" }}
              >
                <Option value="Operations">Operations</Option>
                <Option value="Field Operations">Field Operations</Option>
                <Option value="Support">Support</Option>
                <Option value="Management">Management</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Pooling Address"
            name="poolingAddress"
            rules={[
              { required: true, message: "Please input pooling address!" },
            ]}
          >
            <Input
              placeholder="Enter pooling address"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select placeholder="Select status" style={{ height: "48px" }}>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
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
              padding: "12px",
              height: "48px",
              fontSize: "16px",
              marginTop: "24px",
            }}
          >
            {isAddMode ? "Add Agent" : "Update Agent"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
