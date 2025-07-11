"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  Row,
  Col,
  Typography,
  Input,
  DatePicker,
  Button,
  Space,
  AutoComplete,
  Select,
  Table,
  Image,
} from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  CalendarOutlined,
  DownOutlined,
  FilePdfOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { poolingData } from "@/data/pooling-data";
import { toast } from "sonner";
import PollingDataHeader from "./PollingDataHeader";

const { Option } = Select;

export default function PoolingDataPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(poolingData);
  const [selectedArea, setSelectedArea] = useState("All Area");

  // Extract unique areas
  const areas = [
    "All Area",
    ...Array.from(
      new Set(
        poolingData.map((station) => {
          const addressParts = station.address.split(",");
          return addressParts[addressParts.length - 1]?.trim() || "Unknown";
        })
      )
    ),
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, selectedArea]);

  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
  };

  // img count
  const renderImageCount = (totalImages: number, images: string[]) => {
    if (totalImages <= 3) {
      return (
        <div style={{ display: "flex", gap: "4px" }}>
          {images.slice(0, totalImages).map((img, index) => (
            <Image
              key={index}
              src={img || "/placeholder.svg"}
              alt={`vote-${index}`}
              width={24}
              height={24}
              style={{ borderRadius: "4px" }}
              preview={false}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {images.slice(0, 3).map((img, index) => (
            <Image
              key={index}
              src={img || "/placeholder.svg"}
              alt={`vote-${index}`}
              width={24}
              height={24}
              style={{ borderRadius: "4px" }}
              preview={false}
            />
          ))}
          <span
            style={{
              backgroundColor: "#f0f0f0",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            +{totalImages - 3}
          </span>
        </div>
      );
    }
  };

  const columns = [
    {
      title: "Postal Code",
      dataIndex: "postCode",
      key: "postCode",
      width: 120,
    },
    {
      title: "Area Name",
      dataIndex: "arlaName",
      key: "arlaName",
      width: 120,
    },
    {
      title: "Polling Address",
      dataIndex: "address",
      key: "address",
      width: 250,
    },
    {
      title: "Polling Agent",
      dataIndex: "agent",
      key: "agent",
      width: 150,
    },
    {
      title: "Total Image",
      key: "totalImages",
      width: 120,
      render: (_: any, record: any) =>
        renderImageCount(record.totalImages, record.images),
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      width: 100,
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            style={{ color: "#ff4d4f", padding: 0 }}
            onClick={() => {
              // Handle scan action
              console.log("Scan clicked for:", record);
            }}
          >
            Scan
          </Button>
          <Button
            style={{ fontSize: 20 }}
            type="text"
            icon={<InfoCircleOutlined style={{ color: "#1677ff" }} />}
            onClick={() => {
              router.push(`/polling-data/details-page/${record.key}`);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="px-6 py-4 bg-white rounded-lg ">
      {/* Header Section */}
      <PollingDataHeader
        searchText={searchText}
        setSearchText={setSearchText}
        selectedArea={selectedArea}
        areas={areas}
        handleAreaChange={handleAreaChange}
      />
      {/* Data Table */}
      <div className="overflow-hidden max-w-[99%]">
        <Table
          columns={columns}
          dataSource={filteredData}
          // scroll={{ y: 510 }}
          pagination={{
            pageSize: 10,
            // showSizeChanger: true,
            // showQuickJumper: true,
            // showTotal: (total, range) =>
            //   `${range[0]}-${range[1]} of ${total} submissions`,
          }}
          size="middle"
        />
      </div>
    </div>
  );
}
