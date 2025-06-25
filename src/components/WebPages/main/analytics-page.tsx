"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  Table,
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Space,
  Descriptions,
  Statistic,
} from "antd";
import {
  InfoCircleOutlined,
  MessageOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Demo data for voting results
const votingData = [
  {
    party: "CRM",
    votes: 280000,
    color: "#22c55e",
    fullName: "Cameroon Renaissance Movement",
  },
  {
    party: "CPDM",
    votes: 370000,
    color: "#a855f7",
    fullName: "Cameroon People's Democratic Movement",
  },
  {
    party: "APC",
    votes: 320000,
    color: "#ef4444",
    fullName: "Alliance for Progress and Change",
  },
  {
    party: "APT/ATP",
    votes: 290000,
    color: "#f59e0b",
    fullName: "Alliance for Progress and Transformation",
  },
  {
    party: "SDF",
    votes: 260000,
    color: "#1e40af",
    fullName: "Social Democratic Front",
  },
  {
    party: "UDC",
    votes: 240000,
    color: "#7c3aed",
    fullName: "Union of Democratic Forces",
  },
  {
    party: "PMSC",
    votes: 80000,
    color: "#dc2626",
    fullName: "Progressive Movement for Social Change",
  },
];

// Calculate total votes and percentages
const totalVotes = votingData.reduce((sum, item) => sum + item.votes, 0);
const pieData = votingData.map((item) => ({
  ...item,
  percentage: Math.round((item.votes / totalVotes) * 100),
}));

// Demo data for polling stations
const pollingStations = [
  {
    key: "1",
    postCode: "2472",
    name: "Tiki",
    address: "3891 Ranchview Dr. Richardson",
    sendingTime: "03:30am-2/11/12",
    CRM: 2568,
    CPDM: 5742,
    APC: 2568,
    "APT/ATP": 5742,
    SDF: 2568,
    UDC: 5742,
    PMSC: 5742,
  },
  {
    key: "2",
    postCode: "2450",
    name: "Sendo",
    address: "4517 Washington Ave. Manchester",
    sendingTime: "03:30am-2/11/12",
    CRM: 31651,
    CPDM: 453,
    APC: 31651,
    "APT/ATP": 453,
    SDF: 31651,
    UDC: 453,
    PMSC: 453,
  },
  {
    key: "3",
    postCode: "2450",
    name: "Sendo",
    address: "3517 W. Gray St. Utica",
    sendingTime: "03:30am-2/11/12",
    CRM: 65141,
    CPDM: 4563,
    APC: 65141,
    "APT/ATP": 4563,
    SDF: 65141,
    UDC: 4563,
    PMSC: 4563,
  },
  {
    key: "4",
    postCode: "2450",
    name: "Lazada",
    address: "2118 Thornridge Cir. Syracuse",
    sendingTime: "03:30am-2/11/12",
    CRM: 41561,
    CPDM: 4563,
    APC: 41561,
    "APT/ATP": 4563,
    SDF: 41561,
    UDC: 4563,
    PMSC: 4563,
  },
  {
    key: "5",
    postCode: "2450",
    name: "Sendo",
    address: "2972 Westheimer Rd. Santa Ana",
    sendingTime: "03:30am-2/11/12",
    CRM: 41561,
    CPDM: 53542,
    APC: 41561,
    "APT/ATP": 53542,
    SDF: 41561,
    UDC: 53542,
    PMSC: 53542,
  },
];

export default function ElectionAnalytics() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  type PollingStation = (typeof pollingStations)[number];
  const [selectedStation, setSelectedStation] = useState<PollingStation | null>(
    null
  );

  const showModal = (station: any) => {
    setSelectedStation(station);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStation(null);
  };

  // Table columns configuration
  const columns = [
    {
      title: "Post Code",
      dataIndex: "postCode",
      key: "postCode",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Pooling Address",
      dataIndex: "address",
      key: "address",
      width: 250,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 150,
    },
    {
      title: "CRM",
      dataIndex: "CRM",
      key: "CRM",
      align: "center" as const,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "CPDM",
      dataIndex: "CPDM",
      key: "CPDM",
      align: "center" as "center",
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
    },
    {
      title: "APC",
      dataIndex: "APC",
      key: "APC",
      align: "center" as "center",
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "APT/ATP",
      dataIndex: "APT/ATP",
      key: "APT/ATP",
      align: "center" as "center",
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
    },
    {
      title: "SDF",
      dataIndex: "SDF",
      key: "SDF",
      align: "center" as "center",
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "UDC",
      dataIndex: "UDC",
      key: "UDC",
      align: "center" as "center",
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
    },
    {
      title: "PMSC",
      dataIndex: "PMSC",
      key: "PMSC",
      align: "center" as "center",
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
    },
    {
      title: "Action",
      key: "action",
      align: "center" as "center",
      width: 120,
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="text"
            icon={<InfoCircleOutlined style={{ color: "#1890ff" }} />}
            onClick={() => showModal(record)}
          />
          {/* <Button
            type="text"
            icon={<MessageOutlined style={{ color: "#52c41a" }} />}
          /> */}
        </Space>
      ),
    },
  ];

  const calculateStationTotal = (station: any) => {
    return Object.entries(station)
      .filter(
        ([key]) =>
          !["key", "postCode", "name", "address", "sendingTime"].includes(key)
      )
      .reduce((sum, [, votes]) => sum + (votes as number), 0);
  };

  return (
    <div>
      {/* Voting Results Section */}
      <Row gutter={[24, 24]}>
        {/* Bar Chart */}
        <Col xs={24} lg={16}>
          <Card style={{ height: "400px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                Voting Result
              </Title>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#1890ff",
                    borderRadius: "50%",
                  }}
                ></div>
                <Text style={{ color: "#1890ff" }}>
                  Total Voter {totalVotes.toLocaleString()}
                </Text>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={votingData}>
                <XAxis dataKey="party" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value.toLocaleString(), "Votes"]}
                />
                <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                  {votingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Pie Chart */}
        <Col xs={24} lg={8}>
          <Card style={{ height: "400px" }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="votes"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [value.toLocaleString(), "Votes"]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div
              style={{
                marginTop: "8px",
                maxHeight: "180px",
                overflowY: "auto",
              }}
            >
              {pieData.map((item) => (
                <div
                  key={item.party}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                    fontSize: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: item.color,
                        borderRadius: "50%",
                      }}
                    ></div>
                    <Text style={{ fontSize: "12px" }}>{item.party}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Text type="secondary" style={{ fontSize: "11px" }}>
                      {item.votes.toLocaleString()}
                    </Text>
                    <Text strong style={{ fontSize: "12px" }}>
                      {item.percentage}%
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Polling Station Status */}
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                justifyContent: "space-between",
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                Pooling Station Status
              </Title>
              <ExportOutlined />
            </div>
            <div className="custom-table">
              <Table
                columns={columns}
                dataSource={pollingStations}
                scroll={{ x: 1200, y: 200 }}
                pagination={false}
                size="middle"
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal for Station Details */}
      <Modal
        title="Polling Station Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedStation && (
          <div>
            <Descriptions bordered column={2} style={{ marginBottom: "24px" }}>
              <Descriptions.Item label="Post Code">
                {selectedStation.postCode}
              </Descriptions.Item>
              <Descriptions.Item label="Station Name">
                {selectedStation.name}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>
                {selectedStation.address}
              </Descriptions.Item>
              <Descriptions.Item label="Sending Time" span={2}>
                {selectedStation.sendingTime}
              </Descriptions.Item>
            </Descriptions>

            <Title level={5}>Vote Breakdown</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
              {Object.entries(selectedStation)
                .filter(
                  ([key]) =>
                    ![
                      "key",
                      "postCode",
                      "name",
                      "address",
                      "sendingTime",
                    ].includes(key)
                )
                .map(([party, votes]) => (
                  <Col xs={12} sm={8} md={6} key={party}>
                    <Card size="small">
                      <Statistic
                        title={party}
                        value={votes}
                        formatter={(value) => value.toLocaleString()}
                      />
                    </Card>
                  </Col>
                ))}
            </Row>

            <Card>
              <Statistic
                title="Total Votes at Station"
                value={calculateStationTotal(selectedStation)}
                formatter={(value) => value.toLocaleString()}
                valueStyle={{ color: "#1890ff", fontSize: "24px" }}
              />
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
}
