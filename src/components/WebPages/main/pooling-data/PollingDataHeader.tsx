import React, { useState } from "react";
import { Input, DatePicker, Button, Space, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
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

  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;
}

export default function PollingDataHeader({
  searchText,
  setSearchText,
  date,
  setDate,
}: PollingDataHeaderProps) {
  // console.log(date);
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
            onChange={(date) => setDate(date)}
            value={date}
            suffixIcon={<CalendarOutlined />}
            style={{
              width: 120,
              height: "40px",
              borderRadius: "6px",
            }}
          />
        </div>
      </Space>
    </div>
  );
}
