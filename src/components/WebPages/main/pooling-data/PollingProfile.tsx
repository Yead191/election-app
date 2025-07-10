import React from "react";
import { Card, Col, Button, Avatar, Typography } from "antd";
import Link from "next/link";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

export default function PollingProfile({
  poolingEntry,
}: {
  poolingEntry: any;
}) {
  return (
    <Card className="col-span-4">
      <Link href="/polling-data" className="mb-6">
        <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
      </Link>
      <Col>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <Avatar size={114} src={"/images/asad.jpg"} />
          <div>
            <Title
              level={4}
              style={{
                margin: 0,
                color: "#0A3A22",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "20px",
              }}
            >
              {poolingEntry.agent}
            </Title>
            <Text
              className="text-[12px] font-medium leading-5"
              type="secondary"
            >
              {poolingEntry.agentEmail}
            </Text>
          </div>
        </div>

        {/* Additional Details */}
        <div
          style={{
            fontSize: "12px",
            color: "#4E4E4E",
            lineHeight: 2,
            fontWeight: 400,
          }}
        >
          <div>
            <strong style={{ color: "#999999", fontSize: "14px" }}>Name</strong>
            <br />
            Bessie Cooper
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong style={{ color: "#999999", fontSize: "14px" }}>ID</strong>
            <br />
            23456
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong style={{ color: "#999999", fontSize: "14px" }}>
              Email
            </strong>
            <br />
            mahmud@gmail.com
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong style={{ color: "#999999", fontSize: "14px" }}>
              Phone number
            </strong>
            <br />
            084 572 1953
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong style={{ color: "#999999", fontSize: "14px" }}>
              NID No.
            </strong>
            <br />
            1511924651562612
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong style={{ color: "#999999", fontSize: "14px" }}>
              Date of birth
            </strong>
            <br />
            17 dec, 2024
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong style={{ color: "#999999", fontSize: "14px" }}>
              Gender
            </strong>
            <br />
            <span style={{ fontWeight: "bold" }}>Male</span>
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong style={{ color: "#999999", fontSize: "14px" }}>
              Address
            </strong>
            <br />
            2007 Station Road, Ladysmith,KwaZulu-Natal
            <br />
            -3373 South Africa
          </div>
        </div>
      </Col>
    </Card>
  );
}
