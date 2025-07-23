import React from "react";
import { Card, Col, Button, Avatar, Typography } from "antd";
import Link from "next/link";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { imgUrl } from "@/app/(dashboard)/layout";
import dayjs from "dayjs";
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
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          <Avatar size={114} src={`${imgUrl}${poolingEntry?.agent?.image}`} />
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
              {poolingEntry.agent?.name}
            </Title>
            <Text
              className="text-[12px] font-medium leading-5"
              type="secondary"
            >
              {poolingEntry.agent?.email}
            </Text>
          </div>
        </div>

        {/* Additional Details */}
        <div
          style={{
            fontSize: "14px",
            color: "#4E4E4E",
            lineHeight: 2,
            fontWeight: 400,
          }}
        >
          <div>
            <strong style={{ color: "#999999", fontSize: "16px" }}>Name</strong>
            <br />
            {poolingEntry.agent?.name}
          </div>

          <div style={{ marginTop: "14px" }}>
            <strong style={{ color: "#999999", fontSize: "16px" }}>ID</strong>
            <br />
            {poolingEntry.agent?._id}
          </div>

          <div style={{ marginTop: "14px" }}>
            <strong style={{ color: "#999999", fontSize: "16px" }}>
              Email
            </strong>
            <br />
            {poolingEntry.agent?.email}
          </div>

          <div style={{ marginTop: "14px" }}>
            <strong style={{ color: "#999999", fontSize: "16px" }}>
              Phone number
            </strong>
            <br />
            {poolingEntry?.agent?.contact}
          </div>

          <div style={{ marginTop: "14px" }}>
            <strong style={{ color: "#999999", fontSize: "16px" }}>
              Verification Status
            </strong>
            <br />
            {poolingEntry.agent?.verified ? "Verified" : "Not Verified"}
          </div>

          <div style={{ marginTop: "14px" }}>
            <strong style={{ color: "#999999", fontSize: "16px" }}>
              Date of birth
            </strong>
            <br />
            {dayjs(poolingEntry.agent?.dob).format("DD/MM/YYYY")}
          </div>

          <div style={{ marginTop: "14px" }}>
            <strong style={{ color: "#999999", fontSize: "16px" }}>
              Gender
            </strong>
            <br />
            {poolingEntry.agent?.gender}
          </div>

          <div style={{ marginTop: "14px" }}>
            <strong style={{ color: "#999999", fontSize: "16px" }}>
              Polling Station
            </strong>
            <br />
            {poolingEntry?.agent?.pollingStation}
          </div>
        </div>
      </Col>
    </Card>
  );
}
