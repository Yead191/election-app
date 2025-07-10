import React, { useState } from "react";
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
import { toast } from "sonner";
const { Title, Text } = Typography;
const { TextArea } = Input;
export default function PollingReport({ poolingEntry }: { poolingEntry: any }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [shortNote, setShortNote] = useState("");
  return (
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
      <Descriptions column={1} size="small" style={{ marginBottom: "24px" }}>
        <Descriptions.Item label="Post Code" labelStyle={{ color: "#929292" }}>
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
          <Text style={{ color: "#188A50" }}>{poolingEntry.sendingTime}</Text>
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
            src={poolingEntry.images[selectedImageIndex] || "/placeholder.svg"}
            alt="Vote document"
            width="100%"
            height={400}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        </div>

        {/* Image Thumbnails */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {poolingEntry.images.map((img: any, index: any) => (
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
      </Col>
    </Card>
  );
}
