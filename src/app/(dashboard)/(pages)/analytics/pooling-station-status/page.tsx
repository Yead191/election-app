"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  CalendarOutlined,
  DownloadOutlined,
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

  // Create search options from polling station data
  const searchOptions = [
    ...Array.from(
      new Set(allPollingStations.map((station) => station.name))
    ).map((name) => ({
      value: name,
      label: `Station: ${name}`,
      category: "station",
    })),
    ...Array.from(
      new Set(allPollingStations.map((station) => station.postCode))
    ).map((code) => ({
      value: code,
      label: `Postal Code: ${code}`,
      category: "postcode",
    })),
    ...Array.from(
      new Set(
        allPollingStations.map((station) => {
          const addressParts = station.address.split(",");
          return addressParts[addressParts.length - 1]?.trim() || "Unknown";
        })
      )
    ).map((area) => ({
      value: area,
      label: `Area: ${area}`,
      category: "area",
    })),
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
    let filtered = allPollingStations;

    // Filter by search text
    if (value) {
      filtered = filtered.filter(
        (station) =>
          station.name.toLowerCase().includes(value.toLowerCase()) ||
          station.address.toLowerCase().includes(value.toLowerCase()) ||
          station.postCode.includes(value)
      );
    }

    // Filter by selected area
    if (selectedArea !== "All Area") {
      filtered = filtered.filter((station) =>
        station.address.toLowerCase().includes(selectedArea.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
    let filtered = allPollingStations;

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        (station) =>
          station.name.toLowerCase().includes(searchText.toLowerCase()) ||
          station.address.toLowerCase().includes(searchText.toLowerCase()) ||
          station.postCode.includes(searchText)
      );
    }

    // Filter by selected area
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

  return (
    <div>
      <Row style={{ marginBottom: "24px" }}>
        <Col span={24}>
          <Card>
            {/* Header Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
                padding: "12px 0",
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
                {/* <Button
                  icon={<DownloadOutlined />}
                  type="text"
                  size="large"
                  style={{
                    backgroundColor: "#e6f4ff",
                    color: "#1677ff",
                    padding: "4px 8px",
                  }}
                /> */}
              </Space>

              {/* Right side - Search, Date, Area */}
              <Space size="large">
                {/* Search Input with Dropdown */}

                {/* Date Picker */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
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
                      //   backgroundColor:
                      //   "linear-gradient(to right, #E1E3EB, #DDE0EA, #CEE9FF)",
                    //   height: "40px",
                    marginRight: 16
                    }}
                  />
                  <AutoComplete
                    className="shadow-2xl"
                    style={{ width: 350, marginTop: "-12px" }}
                    options={searchOptions}
                    onSelect={handleSearchSelect}
                    onSearch={handleSearch}
                    allowClear
                  >
                    <Input
                      placeholder="Search here"
                      prefix={
                        <SearchOutlined
                          style={{
                            fontSize: "20px",
                            borderRadius: "50%",
                            padding: "6px",
                            backgroundColor: "#B7DBC9",
                          }}
                        />
                      }
                      style={{
                        width: 335,
                        padding: "6px 8px",
                        borderRadius: "30px",
                      }}
                    />
                  </AutoComplete>
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

            {/* <Title level={3} style={{ margin: "16px 0 24px 0" }}>
              Pooling Station Status - Complete View
            </Title> */}

            {/* Results Summary */}
            {/* <div style={{ marginBottom: "16px" }}>
              <Typography.Text type="secondary">
                Showing {filteredData.length} of {allPollingStations.length}{" "}
                polling stations
                {searchText && ` for "${searchText}"`}
                {selectedArea !== "All Area" && ` in ${selectedArea}`}
              </Typography.Text>
            </div> */}

            {/* Full Table */}
            <PollingStationTable
              dataSource={filteredData}
              pagination={{
                pageSize: 20,
                // showSizeChanger: true,
                // showQuickJumper: true,
                // showTotal: (total, range) =>
                //   `${range[0]}-${range[1]} of ${total} stations`,
              }}
              scroll={{ x: 700, y: 510 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
