import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import { Card, Col, Typography } from "antd";

interface BarChartComponentProps {
  totalVotes: number;
  votingData: any[];
  CustomLogoLabel: any;
  reportedStations: {
    reportedStations: number;
    totalStations: number;
  };
}
export default function BarChartComponent({
  totalVotes,
  votingData,
  CustomLogoLabel,
  reportedStations,
}: BarChartComponentProps) {
  const { Title, Text } = Typography;
  // console.log(reportedStations);

  return (
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
          <div className="flex flex-row gap-6">
            {/* Total Voter */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-blue-500">
                Total Voter {totalVotes?.toLocaleString()}
              </span>
            </div>

            {/* Total Stations */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-500">
                Total Stations{" "}
                {reportedStations?.totalStations?.toLocaleString()}
              </span>
            </div>

            {/* Reported Stations */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-orange-500">
                Reported Stations{" "}
                {reportedStations?.reportedStations?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={votingData}
            margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="party" />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), "Votes"]} />
            <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
              {votingData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList content={CustomLogoLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Col>
  );
}
