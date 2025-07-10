import React from "react";
import { Input, DatePicker, Button, Space, Select } from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  CalendarOutlined,
  DownOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { toast } from "sonner";
const { Option } = Select;
interface PollingDataHeaderProps {
  searchText: string;
  setSearchText: (value: string) => void;
  selectedArea: string;
  areas: string[];
  handleAreaChange: (value: string) => void;
}

export default function PollingDataHeader({
  searchText,
  setSearchText,
  selectedArea,
  areas,
  handleAreaChange,
}: PollingDataHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px",
      }}
    >
      {/* Left side - Back button */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button
            onClick={() => toast.warning("Coming Soon")}
            icon={<FilePdfOutlined style={{ fontSize: "20px" }} />}
            style={{
              color: "#3A99D9",
              padding: "19px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #E1E3EB, #DDE0EA, #CEE9FF)",
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
  );
}
