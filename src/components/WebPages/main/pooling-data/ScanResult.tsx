import React from "react";
import { Card, Row, Col, Button, Table, Typography } from "antd";
import { toast } from "sonner";
const { Title, Text } = Typography;

interface ScanResultProps {
  allPollingStations: any[];
}

// Function to generate dynamic columns based on data
const generateColumns = (data: any) => {
  // Base columns for static fields
  const baseColumns = [
    {
      title: "Postal Code",
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
      title: "Polling Address",
      dataIndex: "address",
      key: "address",
      width: 150,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 120,
    },
  ];

  // Get unique team names from polls
  const teamNames = data[0]?.polls.map((poll: any) => poll.name) || [];

  // Create dynamic columns for each team
  const teamColumns = teamNames.map((team: any) => ({
    title: team,
    dataIndex: team,
    key: team,
    align: "center",
    render: (value: any, record: any) => {
      // Find the highest vote for this row
      const maxVotes = Math.max(...teamNames.map((t: any) => record[t] || 0));
      return (
        <Text
          style={{
            color: value === maxVotes ? "#22c55e" : "inherit",
            fontWeight: value === maxVotes ? "bold" : "normal",
          }}
        >
          {value?.toLocaleString()}
        </Text>
      );
    },
  }));

  return [...baseColumns, ...teamColumns];
};

// Transform data to match table structure
const transformData = (data: any) => {
  return data.map((item: any) => ({
    key: item._id,
    postCode: item.agent.postalCode,
    name: item.agent.name,
    address: item.station.name,
    sendingTime: new Date(item.createdAt).toLocaleString(),
    ...item.polls.reduce(
      (acc: any, poll: any) => ({
        ...acc,
        [poll.name]: poll.votes,
      }),
      {}
    ),
  }));
};

export default function ScanResult({ allPollingStations }: ScanResultProps) {
  // Generate columns dynamically
  const columns = generateColumns(allPollingStations);
  // Transform data for table
  const dataSource = transformData(allPollingStations);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Title
              level={4}
              style={{ margin: 0, fontSize: 24, fontWeight: 500 }}
            >
              Scan Result
            </Title>
            <Button
              onClick={() => toast.info("Feature coming soon...")}
              type="primary"
              style={{ backgroundColor: "#18953D", borderColor: "#52c41a" }}
            >
              Publish
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={dataSource.slice(0, 5)}
            pagination={false}
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );
}
