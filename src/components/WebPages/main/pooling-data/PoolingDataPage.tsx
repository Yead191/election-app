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

const { Title, Text } = Typography;
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

  // Create search options
  const searchOptions = [
    ...Array.from(new Set(poolingData.map((station) => station.arlaName))).map(
      (name) => ({
        value: name,
        label: `Station: ${name}`,
        category: "station",
      })
    ),
    ...Array.from(new Set(poolingData.map((station) => station.agent))).map(
      (agent) => ({
        value: agent,
        label: `Agent: ${agent}`,
        category: "agent",
      })
    ),
    ...Array.from(new Set(poolingData.map((station) => station.postCode))).map(
      (code) => ({
        value: code,
        label: `Post Code: ${code}`,
        category: "postcode",
      })
    ),
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
    let filtered = poolingData;

    if (value) {
      filtered = filtered.filter(
        (station) =>
          station.arlaName.toLowerCase().includes(value.toLowerCase()) ||
          station.agent.toLowerCase().includes(value.toLowerCase()) ||
          station.address.toLowerCase().includes(value.toLowerCase()) ||
          station.postCode.includes(value)
      );
    }

    if (selectedArea !== "All Area") {
      filtered = filtered.filter((station) =>
        station.address.toLowerCase().includes(selectedArea.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, selectedArea]);

  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
    // Apply filtering logic here
    let filtered = poolingData;

    if (searchText) {
      filtered = filtered.filter(
        (station) =>
          station.arlaName.toLowerCase().includes(searchText.toLowerCase()) ||
          station.agent.toLowerCase().includes(searchText.toLowerCase()) ||
          station.address.toLowerCase().includes(searchText.toLowerCase()) ||
          station.postCode.includes(searchText)
      );
    }

    if (value !== "All Area") {
      filtered = filtered.filter((station) =>
        station.address.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleSearchSelect = (value: string) => {
    setSearchText(value);
    handleSearch(value);
  };

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
      title: "Arla Name",
      dataIndex: "arlaName",
      key: "arlaName",
      width: 120,
    },
    {
      title: "Pooling Address",
      dataIndex: "address",
      key: "address",
      width: 250,
    },
    {
      title: "Pooling Agent",
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

      {/* Data Table */}
      <div className="w-full">
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
