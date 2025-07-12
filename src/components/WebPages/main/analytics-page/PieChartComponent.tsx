import React, { useEffect, useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, Col, Typography } from "antd";
// import { votingData } from "@/data/votingData";

interface PieChartComponentProps {
  totalVotes: number;
  votingData: any[];
}

export default function PieChartComponent({
  totalVotes,
  votingData
}: PieChartComponentProps) {
  const pieData = votingData.map((item) => ({
    ...item,
    percentage: Math.round((item.votes / totalVotes) * 100),
  }));

  const chartRef = useRef(null);
  const [imagePos, setImagePos] = useState({ x: 180 - 40, y: 90 - 40 });
  const { Text } = Typography;

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
            <Tooltip formatter={(value) => [value.toLocaleString(), "Votes"]} />
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
  );
}
