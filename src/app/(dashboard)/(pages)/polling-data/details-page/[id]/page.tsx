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
} from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { poolingData } from "@/data/pooling-data";
import { allPollingStations } from "@/data/polling-stations";

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
      <Row style={{ marginBottom: "24px" }}>
        <Col span={24}>
          <Card>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <Link href="/polling-data">
                <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
              </Link>
              <Button color="danger" variant="text" style={{ fontWeight: 500 }}>
                Scan
              </Button>
            </div>

            {/* User Profile Section */}
            <Row gutter={[24, 24]}>
              {/* Left - User Details */}
              <Col xs={24} lg={8}>
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
                    <Text className="text-[12px] font-medium leading-5" type="secondary">{poolingEntry.agentEmail}</Text>
                  </div>
                </div>

                <Descriptions
                  column={1}
                  size="small"
                  style={{ marginBottom: "24px" }}
                >
                  <Descriptions.Item
                    label="Post Code"
                    labelStyle={{ color: "#52c41a" }}
                  >
                    <Text strong>{poolingEntry.postCode}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Name">
                    <Text strong>{poolingEntry.arlaName}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Pooling Address">
                    {poolingEntry.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sending Time">
                    <Text style={{ color: "#52c41a" }}>
                      {poolingEntry.sendingTime}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="">
                    <Text style={{ color: "#52c41a" }}>
                      {poolingEntry.reportStatus}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>

                {/* Additional Details */}
                <div
                  style={{ fontSize: "12px", color: "#666", lineHeight: 1.8 }}
                >
                  <div>
                    <strong>Name:</strong> {poolingEntry.agent}
                  </div>
                  <div>
                    <strong>ID:</strong> 234545
                  </div>
                  <div>
                    <strong>Email:</strong> {poolingEntry.agentEmail}
                  </div>
                  <div>
                    <strong>Phone number:</strong> {poolingEntry.agentPhone}
                  </div>
                  <div>
                    <strong>NID No.:</strong> 1018246951240002
                  </div>
                  <div>
                    <strong>Date of birth:</strong> 17 dec, 2024
                  </div>
                  <div>
                    <strong>Gender:</strong> Male
                  </div>
                  <div>
                    <strong>Religion:</strong> Islam
                  </div>
                  <div>
                    <strong>Address:</strong>
                  </div>
                  <div style={{ paddingLeft: "16px" }}>
                    2907 Station Road, Lokyatihamonil-hotel
                    <br />
                    -3374 South Africa
                  </div>
                </div>
              </Col>

              {/* Right - Images */}
              <Col xs={24} lg={16}>
                {/* Main Image */}
                <div style={{ marginBottom: "16px" }}>
                  <Image
                    src={
                      poolingEntry.images[selectedImageIndex] ||
                      "/placeholder.svg"
                    }
                    alt="Vote document"
                    width="100%"
                    height={400}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>

                {/* Image Thumbnails */}
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
                >
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
            </Row>
          </Card>
        </Col>
      </Row>

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
                type="primary"
                style={{ backgroundColor: "#18953D", borderColor: "#52c41a" }}
              >
                Publish
              </Button>
            </div>

            <Table
              columns={scanResultColumns}
              dataSource={allPollingStations.slice(0, 5)}
              scroll={{ x: 700, y: 510 }}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
