"use client";

import { useState } from "react";
import { Table, Button, Input, Space, Avatar, DatePicker, Tooltip } from "antd";
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
import { toast } from "sonner";

const mockAgents = [
  {
    key: "1",
    id: "MM4179MRV2",
    name: "Mr. Nadir",
    email: "mr101@gmail.ru",
    contactNo: "(+33)7 00 55 59 27",
    postCode: "2472",
    poolingAddress: "3891 Ranchview Dr. Richardson",
    avatar: "/assets/user2.png?height=40&width=40",
  },
  {
    key: "2",
    id: "AB4578DCD2",
    name: "Siphokazi Selebe",
    email: "mr101@gmail.ru",
    contactNo: "(+33)7 00 55 59 27",
    postCode: "2450",
    poolingAddress: "4517 Washington Ave. Manchester",
    avatar: "/assets/user2.png?height=40&width=40",
  },
  {
    key: "3",
    id: "FF4578EDD4",
    name: "Alison Moloi",
    email: "mr101@gmail.ru",
    contactNo: "(+33)7 00 55 59 27",
    postCode: "2450",
    poolingAddress: "3517 W. Gray St. Utica",
    avatar: "/assets/user2.png?height=40&width=40",
  },
  {
    key: "4",
    id: "BB4579EED2",
    name: "Mr. Nadir",
    email: "xterris@gmail.com",
    contactNo: "(+33)7 00 55 59 27",
    postCode: "2450",
    poolingAddress: "2118 Thornridge Cir. Syracuse",
    avatar: "/assets/user2.png?height=40&width=40",
  },
  {
    key: "5",
    id: "FF4578EDD4",
    name: "Babalwa Moloi",
    email: "irnabela@gmail.com",
    contactNo: "(+33)7 00 55 59 27",
    postCode: "2450",
    poolingAddress: "2972 Westheimer Rd. Santa Ana",
    avatar: "/assets/user2.png?height=40&width=40",
  },
];

export default function AgentsListPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const router = useRouter();

  const filteredAgents = mockAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchText.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchText.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchText.toLowerCase())
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
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Post Code",
      dataIndex: "postCode",
      key: "postCode",
    },
    {
      title: "Pooling Address",
      dataIndex: "poolingAddress",
      key: "poolingAddress",
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

  const handleUpdateStatus = (key: string, status: string) => {
    // Implement your logic to update the status of the agent here
    // You can use the key to identify the agent and update the status accordingly
    // For example:
    // const updatedAgents = mockAgents.map((agent) =>
    //   agent.key === key ? { ...agent, status: status === "active" ? "inactive" : "active" } : agent
    // );
    // setMockAgents(updatedAgents);
    toast.info("Status updated successfully");
  };

  const handleAddAgent = () => {
    // router.push("/agents-list/add-agent");
    toast.info("Add agent feature is coming soon");
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          padding: "16px 24px",
          borderRadius: "8px",
          overflow: "hidden",
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
                // marginRight: 16,
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
                // marginRight: 16,
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
        <Table
          columns={columns}
          dataSource={filteredAgents}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          size="middle"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        
      </div> */}
    </div>
  );
}
