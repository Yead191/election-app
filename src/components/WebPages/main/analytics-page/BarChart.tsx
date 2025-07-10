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
}
export default function BarChartComponent({
  
  totalVotes,
  votingData,
  CustomLogoLabel,
}: BarChartComponentProps) {
  const { Title, Text } = Typography;

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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
            <Tooltip formatter={(value) => [value.toLocaleString(), "Votes"]} />
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
  );
}
