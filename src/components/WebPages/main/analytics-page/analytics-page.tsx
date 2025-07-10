"use client";

import Link from "next/link";
import { Card, Row, Col, Typography } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import PollingStationTable from "./PollingStationTable";
import { limitedPollingStations } from "@/data/polling-stations";
import { votingData } from "@/data/votingData";
import BarChartComponent from "./BarChart";
import PieChartComponent from "./PieChartComponent";

const { Title, Text } = Typography;

// Calculate total votes and percentages
const totalVotes = votingData.reduce((sum, item) => sum + item.votes, 0);
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
  return (
    <div>
      {/* Voting Results Section */}
      <Row gutter={[24, 24]}>
        {/* Bar Chart */}
        <BarChartComponent
          totalVotes={totalVotes}
          votingData={votingData}
          CustomLogoLabel={CustomLogoLabel}
        />
        {/* Pie Chart */}
        <PieChartComponent totalVotes={totalVotes} />
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
