"use client";

import Link from "next/link";
import { Card, Row, Col, Typography } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import PollingStationTable from "./PollingStationTable";
import BarChartComponent from "./BarChart";
import PieChartComponent from "./PieChartComponent";
import {
  usePollingStationStatusQuery,
  usePollingSummaryV2Query,
} from "@/redux/feature/analytics/analyticsApi";
import { useEffect, useState } from "react";
import { imgUrl } from "@/app/(dashboard)/layout";

const { Title, Text } = Typography;

// Calculate total votes and percentages
// Custom label component for party logos
interface CustomLogoLabelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  payload: any;
  index: number;
  votingData: any;
}

// pie

export default function ElectionAnalytics() {
  interface VotingDataItem {
    party: string;
    votes: number;
    color: string;
    partyLogo: string;
    fullName: string;
  }

  const [votingData, setVotingData] = useState<VotingDataItem[]>([]);
  const { data: pollingSummary, isSuccess } = usePollingSummaryV2Query(null);
  // console.log(votingData);

  const CustomLogoLabel = ({
    x,
    y,
    width,
    height,
    payload,
    index,
  }: CustomLogoLabelProps) => {
    // Use votingData passed as a prop instead of static import

    if (!votingData || !Array.isArray(votingData) || !votingData[index]) {
      return null;
    }
    const dataItem = votingData[index];
    // console.log("analytics", dataItem);

    const logoSize = 48;
    const logoX = x + width / 2 - logoSize / 2;
    const logoY = y - logoSize + 60;

    return (
      <g>
        <circle
          cx={x + width / 2}
          cy={y - logoSize / 2 + 60}
          r={logoSize / 2 + 2}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth={1}
        />
        <image
          x={logoX}
          y={logoY}
          width={logoSize}
          height={logoSize}
          href={imgUrl + dataItem.partyLogo}
          style={{
            clipPath: `circle(${logoSize / 2}px at center)`,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
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

  const summary = pollingSummary?.data || [];
  const totalVotes = summary.reduce(
    (sum: number, item: { total: number }) => sum + item.total,
    0
  );
  const transformVotingData = (votingData: any) => {
    // Array of distinct colors for light/dark themes
    const colors = [
      "#22c55e", // Green
      "#a855f7", // Purple
      "#dc2626", // Red
      "#7c3aed", // Violet
      "#1e40af", // Blue
      "#f59e0b", // Orange
      "#ef4444", // Bright red
      "#14b8a6", // Teal
      "#ec4899", // Pink
      "#6b7280", // Gray
    ];

    return votingData.map((item: any, index: any) => ({
      party: item.team.name,
      votes: item.total,
      color: colors[index % colors.length], // Cycle through colors if more teams than colors
      partyLogo: item.team.image,
      fullName: item.team.name, // Use team.name as fallback for fullName
    }));
  };
  useEffect(() => {
    if (isSuccess) {
      setVotingData(transformVotingData(summary));
    }
  }, [summary]);

  // get polling station status
  const { data: pollingStationStatus } = usePollingStationStatusQuery({
    limit: 5,
    searchTerm: "",
  });

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
        <PieChartComponent totalVotes={totalVotes} votingData={votingData} />
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
              dataSource={pollingStationStatus?.data || []}
              paginationData={{}}
              page={1}
              setPage={() => {}}
              // scroll={{ x: 700, y: 200 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
