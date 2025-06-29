"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Avatar,
  Input,
  Table,
  Image,
  Descriptions,
  Divider,
} from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { poolingData } from "@/data/pooling-data";
import { allPollingStations } from "@/data/polling-stations";
import { toast } from "sonner";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function PoolingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [shortNote, setShortNote] = useState("");

  // Find the specific pooling data entry
  const poolingEntry = poolingData.find((entry) => entry.key === params.id);

  if (!poolingEntry) {
    return <div>Entry not found</div>;
  }

  // Table columns for scan results
  const scanResultColumns = [
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
      title: "Pooling Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 120,
    },
    {
      title: "CRM",
      dataIndex: "CRM",
      key: "CRM",
      align: "center" as const,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value?.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "CPDM",
      dataIndex: "CPDM",
      key: "CPDM",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    {
      title: "APC",
      dataIndex: "APC",
      key: "APC",
      align: "center" as const,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value?.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "APT/ATP",
      dataIndex: "APT/ATP",
      key: "APT/ATP",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    {
      title: "SDF",
      dataIndex: "SDF",
      key: "SDF",
      align: "center" as const,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value?.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "UDC",
      dataIndex: "UDC",
      key: "UDC",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    {
      title: "PMSC",
      dataIndex: "PMSC",
      key: "PMSC",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   align: "center" as const,
    //   width: 80,
    //   render: () => (
    //     <Button type="link" size="small">
    //       Info
    //     </Button>
    //   ),
    // },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 mb-6">
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
            <div style={{ fontSize: "12px", color: "#4E4E4E", lineHeight: 2, fontWeight: 400 }}>
              <div>
                <strong style={{ color: "#999999", fontSize: "14px" }}>
                  Name
                </strong>
                <br />
                Bessie Cooper
              </div>

              <div style={{ marginTop: "12px" }}>
                <strong style={{ color: "#999999", fontSize: "14px" }}>
                  ID
                </strong>
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
        <Card className="col-span-8">
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Button
              onClick={() => toast.info("Feature coming soon...")}
              color="danger"
              variant="text"
              style={{ fontWeight: 500 }}
            >
              Scan
            </Button>
          </div>
          <Descriptions
            column={1}
            size="small"
            style={{ marginBottom: "24px" }}
          >
            <Descriptions.Item
              label="Post Code"
              labelStyle={{ color: "#929292" }}
            >
              <Text style={{ color: "#188A50" }} strong>
                {poolingEntry.postCode}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              <Text style={{ color: "#188A50" }} strong>
                {poolingEntry.arlaName}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Pooling Address">
              <Text style={{ color: "#188A50" }}>{poolingEntry.address}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Sending Time">
              <Text style={{ color: "#188A50" }}>
                {poolingEntry.sendingTime}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Title">
              <Text strong>{poolingEntry.reportStatus}</Text>
            </Descriptions.Item>
          </Descriptions>
          <Divider />

          <Col>
            {/* Main Image */}
            <div style={{ marginBottom: "16px" }}>
              <Image
                src={
                  poolingEntry.images[selectedImageIndex] || "/placeholder.svg"
                }
                alt="Vote document"
                width="100%"
                height={400}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </div>

            {/* Image Thumbnails */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              {poolingEntry.images.map((img, index) => (
                <Image
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`thumbnail-${index}`}
                  width={60}
                  height={60}
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border:
                      selectedImageIndex === index
                        ? "2px solid #1677ff"
                        : "1px solid #d9d9d9",
                  }}
                  preview={false}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>

            {/* Short Note */}
            <TextArea
              placeholder="Short Note"
              value={shortNote}
              onChange={(e) => setShortNote(e.target.value)}
              rows={4}
              style={{ marginBottom: "16px" }}
            />

            {/* Publish Button */}
            {/* <div style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                    }}
                  >
                    Publish
                  </Button>
                </div> */}
          </Col>
        </Card>
      </div>

      {/* Scan Result Section */}
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
              columns={scanResultColumns}
              dataSource={allPollingStations.slice(0, 5)}
              // scroll={{ x: 700, y: 510 }}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
