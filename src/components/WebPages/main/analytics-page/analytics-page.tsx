"use client";
import { useRef, useEffect, useState } from "react";

import Link from "next/link";
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
  LabelList,
} from "recharts";
import { Card, Row, Col, Typography } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import PollingStationTable from "./PollingStationTable";
import { limitedPollingStations } from "@/data/polling-stations";
import pieImg from "@/party/pieImg.png";

const { Title, Text } = Typography;

// Demo data for voting results
const votingData = [
  {
    party: "CRM",
    votes: 380000,
    color: "#22c55e",
    fullName: "Cameroon Renaissance Movement",
    partyLogo: "/party/party1.jpg",
  },
  {
    party: "CPDM",
    votes: 290000,
    color: "#a855f7",
    fullName: "Cameroon People's Democratic Movement",
    partyLogo: "/party/party2.png",
  },
  {
    party: "APC",
    votes: 220000,
    color: "#ef4444",
    fullName: "Alliance for Progress and Change",
    partyLogo: "/party/party3.png",
  },
  {
    party: "APT/ATP",
    votes: 200000,
    color: "#f59e0b",
    fullName: "Alliance for Progress and Transformation",
    partyLogo: "/party/party4.png",
  },
  {
    party: "SDF",
    votes: 160000,
    color: "#1e40af",
    fullName: "Social Democratic Front",
    partyLogo: "/party/party5.png",
  },
  {
    party: "UDC",
    votes: 150000,
    color: "#7c3aed",
    fullName: "Union of Democratic Forces",
    partyLogo: "/party/party6.png",
  },
  {
    party: "PMSC",
    votes: 130000,
    color: "#dc2626",
    fullName: "Progressive Movement for Social Change",
    partyLogo: "/party/party7.png",
  },
];

// Calculate total votes and percentages
const totalVotes = votingData.reduce((sum, item) => sum + item.votes, 0);

const pieData = votingData.map((item) => ({
  ...item,
  percentage: Math.round((item.votes / totalVotes) * 100),
}));

// Custom label component for party logos
const CustomLogoLabel = (props: any) => {
  const { x, y, width, height, payload, index } = props;

  // Get the data item from the original votingData array using the index
  const dataItem = votingData[index];

  // If we can't find the data item, don't render anything
  if (!dataItem || !dataItem.partyLogo) {
    return null;
  }

  const logoSize = 48;
  const logoX = x + width / 2 - logoSize / 2;
  const logoY = y - logoSize + 60;

  return (
    <g>
      {/* White circle background for logo */}
      <circle
        cx={x + width / 2}
        cy={y - logoSize / 2 + 60}
        r={logoSize / 2 + 2}
        fill="white"
        stroke="#e5e7eb"
        strokeWidth={1}
      />
      {/* Party logo image */}
      <image
        x={logoX}
        y={logoY}
        width={logoSize}
        height={logoSize}
        href={dataItem.partyLogo}
        style={{
          clipPath: `circle(${logoSize / 2}px at center)`,
        }}
        onError={(e) => {
          // Fallback: Hide the image if it fails to load
          e.currentTarget.style.display = "none";
        }}
      />
      {/* Fallback text if image fails to load */}
      <text
        x={x + width / 2}
        y={y - logoSize / 2 - 10}
        textAnchor="middle"
        fontSize="10"
        fill="#666"
        fontWeight="bold"
      >
        {dataItem.party}
      </text>
    </g>
  );
};

// pie

export default function ElectionAnalytics() {
  const chartRef = useRef(null);
  const [imagePos, setImagePos] = useState({ x: 180 - 40, y: 90 - 40 }); 

  useEffect(() => {
    const updatePosition = () => {
      if (chartRef.current) {
        const { offsetWidth, offsetHeight } = chartRef.current;
        const cx = offsetWidth * 0.5;
        const cy = offsetHeight * 0.5;
        const imageSize = 80; 
        setImagePos({
          x: cx - imageSize / 2,
          y: cy - imageSize / 2,
        });
      }
    };

    updatePosition(); // Initial calculation
    window.addEventListener("resize", updatePosition); 
    window.addEventListener("zoom", updatePosition); 
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("zoom", updatePosition);
    };
  }, []);
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
              <BarChart
                data={votingData}
                margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="party" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value.toLocaleString(), "Votes"]}
                />
                <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                  {votingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList content={CustomLogoLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Pie Chart */}
        <Col xs={24} lg={8}>
          <Card style={{ height: "400px" }}>
            <ResponsiveContainer width="100%" height={180} ref={chartRef}>
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
                {/* Larger single image in the center */}
                <image
                  x={imagePos.x}
                  y={imagePos.y}
                  width={80}
                  height={80}
                  href="/party/party1.jpg"
                  style={{
                    clipPath: `circle(40px at center)`,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
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
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Title
                level={4}
                style={{ margin: 0, fontSize: 20, fontWeight: 500 }}
              >
                Pooling Station Status
              </Title>
              <Link href="/analytics/pooling-station-status">
                <ExportOutlined style={{ fontSize: "18px", color: "black" }} />
              </Link>
            </div>
            <PollingStationTable
              dataSource={limitedPollingStations}
              pagination={false}
              scroll={{ x: 700, y: 200 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
