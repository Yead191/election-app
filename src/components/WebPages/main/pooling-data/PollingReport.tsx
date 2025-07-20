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
import { DownloadOutlined } from "@ant-design/icons";
import { QrcodeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { imgUrl } from "@/app/(dashboard)/layout";
import { useScanDocumentMutation } from "@/redux/feature/polling-data/PollingDataApi";
const { Title, Text } = Typography;
const { TextArea } = Input;
export default function PollingReport({
  poolingEntry,
  isScanned,
  setIsScanned,
  setScanId,
  resultRef,
  refetch,
}: {
  poolingEntry: any;
  isScanned: boolean;
  setIsScanned: (value: boolean) => void;
  setScanId: (value: string) => void;
  resultRef: any;
  refetch: () => void;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [shortNote, setShortNote] = useState(poolingEntry?.note || "");
  const [scanDocument] = useScanDocumentMutation();
  const handleSubmitScan = () => {
    const scanData = {
      image: poolingEntry.images[selectedImageIndex],
      document: poolingEntry._id,
    };
    toast.promise(scanDocument({ data: scanData }).unwrap(), {
      loading: "Scanning...",
      success: (res) => {
        console.log(res);
        refetch();
        setIsScanned(true);
        setScanId(res.data.document);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return <b>{res.message}</b>;
      },
      error: (error) => {
        return error.data.message;
      },
    });
  };
  // console.log("polling details", poolingEntry);

  const handleDownload = () => {
    const imageUrl = `${imgUrl}/${poolingEntry.images[selectedImageIndex]}`;
    const fileName = `image-${selectedImageIndex + 1}.jpg`;

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        toast.error("Failed to download the image");
      });
  };

  return (
    <Card className="col-span-8">
      <Descriptions column={1} size="small" style={{ marginBottom: "24px" }}>
        <Descriptions.Item
          label="Postal Code"
          labelStyle={{ color: "#929292" }}
        >
          <Text style={{ color: "#188A50" }} strong>
            {poolingEntry?.agent?.postalCode}
          </Text>
        </Descriptions.Item>
        {/* <Descriptions.Item
          label="Station Code"
          labelStyle={{ color: "#929292" }}
        >
          <Text style={{ color: "#188A50" }} strong>
            {poolingEntry?.station?.stationCode}
          </Text>
        </Descriptions.Item> */}
        <Descriptions.Item label="Name">
          <Text style={{ color: "#188A50" }} strong>
            {poolingEntry?.station?.name}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Polling Address">
          <Text style={{ color: "#188A50" }}>
            {poolingEntry?.station?.pollingStation}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Sending Time">
          <Text style={{ color: "#188A50" }}>
            {dayjs(poolingEntry?.createdAt).format("YYYY-M-D hh:mm A")}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Title">
          <Text strong>{poolingEntry?.title}</Text>
        </Descriptions.Item>
      </Descriptions>
      <Divider />

      <Col>
        <div className="flex justify-end gap-6 items-center mb-3">
          {/* Download button */}
          <Button
            disabled={
              !poolingEntry?.images[selectedImageIndex] ||
              poolingEntry.images[selectedImageIndex].includes(
                "placeholder.svg"
              )
            }
            type="default"
            icon={<DownloadOutlined style={{ fontSize: 20 }} />}
            shape="default"
            onClick={handleDownload}
            style={{
              background: "#f8f8f8",
              border: "none",
              width: 48,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
          />

          {/* Scan button */}
          <Button
            type="primary"
            onClick={handleSubmitScan}
            icon={<QrcodeOutlined style={{ fontSize: 18 }} />}
            style={{
              background: "#18953D",
              border: "none",
              borderRadius: "12px",
              padding: "0 20px",
              height: 40,
              display: "flex",
              alignItems: "center",
            }}
          >
            Scan
          </Button>
        </div>
        {/* Main Image */}
        <div style={{ marginBottom: "8px" }}>
          <Image
            src={
              poolingEntry?.images[selectedImageIndex]
                ? `${imgUrl}/${poolingEntry.images[selectedImageIndex]}`
                : "/placeholder.svg"
            }
            alt="Vote document"
            style={{ objectFit: "cover", height: "60vh", width: "100%" }}
          />
        </div>

        {/* Image Thumbnails */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {poolingEntry?.images.map((img: any, index: any) => (
            <Image
              key={index}
              src={img ? `${imgUrl}/${img}` : "/placeholder.svg"}
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
          readOnly={poolingEntry?.note}
          onChange={(e) => setShortNote(e.target.value)}
          rows={4}
          style={{ marginBottom: "16px" }}
        />
      </Col>
    </Card>
  );
}
