"use client";

import { useState } from "react";
import Link from "next/link";
import { Typography, Input, DatePicker, Button, Space, Select } from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  CalendarOutlined,
  DownOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import PollingStationTable from "@/components/WebPages/main/analytics-page/PollingStationTable";
import { allPollingStations } from "@/data/polling-stations";
import { toast } from "sonner";

const { Title } = Typography;
const { Option } = Select;

export default function PoolingStationStatusPage() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(allPollingStations);
  const [selectedArea, setSelectedArea] = useState("All Area");

  // Extract unique areas from polling station data
  const areas = [
    "All Area",
    ...Array.from(
      new Set(
        allPollingStations.map((station) => {
          // Extract area from address (assuming last part after comma is area)
          const addressParts = station.address.split(",");
          return addressParts[addressParts.length - 1]?.trim() || "Unknown";
        })
      )
    ),
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
    let filtered = allPollingStations;
  };

  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
  };

  const handleSearchSelect = (value: string) => {
    setSearchText(value);
    handleSearch(value);
  };

  return (
    <div
      style={{
        marginBottom: "24px",
        padding: "16px 24px",
        backgroundColor: "#fff",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          paddingRight: 20,
        }}
      >
        {/* Left side - Back button and Export */}
        <Space size="large">
          <Link href="/analytics">
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              size="large"
              style={{ padding: "4px 8px" }}
            />
          </Link>
        </Space>

        {/* Right side - Search, Date, Area */}
        <Space size="large">
          {/* Date Picker */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Button
              onClick={() => toast.info("Feature coming soon...")}
              className="bg-blue-500"
              icon={<FilePdfOutlined style={{ fontSize: "20px" }} />}
              style={{
                color: "#3A99D9",
                padding: "19px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, #E1E3EB, #DDE0EA, #CEE9FF)",
                marginRight: 16,
              }}
            />
            <Input
              placeholder="Search by name, email, or designation"
              allowClear
              style={{
                width: 350,
                padding: "6px 12px 6px 6px",
                borderRadius: "30px",
                marginRight: 16,
              }}
              prefix={
                <SearchOutlined
                  style={{
                    fontSize: "16px",
                    borderRadius: "50%",
                    padding: "6px",
                    backgroundColor: "#B7DBC9",
                  }}
                />
              }
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <DatePicker
              placeholder="Date"
              suffixIcon={<CalendarOutlined />}
              style={{
                width: 120,
                height: "40px",
                borderRadius: "6px",
              }}
            />
          </div>

          {/* Area Dropdown */}
          <Select
            value={selectedArea}
            onChange={handleAreaChange}
            style={{
              width: 140,
              height: "40px",
            }}
            suffixIcon={<DownOutlined />}
          >
            {areas.map((area) => (
              <Option key={area} value={area}>
                {area}
              </Option>
            ))}
          </Select>
        </Space>
      </div>

      {/* Full Table */}
      <PollingStationTable
        dataSource={filteredData}
        pagination={{
          pageSize: 20,
        }}
        scroll={{ x: 700, y: 510 }}
      />
    </div>
  );
}
