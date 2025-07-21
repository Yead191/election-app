"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Space, Select, Table, Image, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PollingDataHeader from "./PollingDataHeader";
import { useGetPollingDataQuery } from "@/redux/feature/polling-data/PollingDataApi";
import { imgUrl } from "@/app/(dashboard)/layout";
import dayjs, { Dayjs } from "dayjs";

export default function PollingDataPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [page, setPage] = useState(1);
  const getImageUrl = (path: any) => `${imgUrl}${path}`;
  // get polling data
  const { data: pollingData } = useGetPollingDataQuery({
    searchTerm: searchText,
    date: date ? date.format("YYYY-M-D") : undefined,
    page,
    limit: 10,
  });
  const pagination = pollingData?.pagination;
  // console.log(pollingData, date);
  // Extract unique areas

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
      title: "Id. no.",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="text-sm">{text.slice(0, 8)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Voting S. Code",
      dataIndex: "stationCode",
      key: "stationCode",
      render: (_: any, record: any) => <p>{record?.station?.stationCode}</p>,
    },
    {
      title: "Election City",
      dataIndex: "city",
      key: "city",
      render: (_: any, record: any) => <p>{record?.station?.city}</p>,
    },
    {
      title: "Station Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => <p>{record?.station?.name}</p>,
    },
    {
      title: "Polling Agent",
      dataIndex: "agent",
      key: "agent",
      render: (_: any, record: any) => <p>{record?.agent?.name}</p>,
    },
    {
      title: "Total Image",
      key: "totalImages",

      render: (_: any, record: any) =>
        renderImageCount(
          record?.images?.length,
          Array.isArray(record.images)
            ? record.images.map((img: string) => getImageUrl(img))
            : []
        ),
    },
    {
      title: "Sending Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        const time = dayjs(createdAt).format("hh:mma-DD/MM/YY");
        return <span>{time}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,

      render: (_: any, record: any) => (
        <Space>
          {/* <Button
            type="link"
            style={{ color: "#ff4d4f", padding: 0 }}
            onClick={() => {
              // Handle scan action
              // console.log("Scan clicked for:", record);
            }}
          >
            Scan
          </Button> */}
          <Button
            style={{ fontSize: 20 }}
            type="text"
            icon={<InfoCircleOutlined style={{ color: "#1677ff" }} />}
            onClick={() => {
              router.push(`/polling-data/details-page/${record._id}`);
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
        date={date}
        setDate={setDate}
      />
      {/* Data Table */}
      <div className="overflow-hidden max-w-[99%]">
        <Table
          columns={columns}
          dataSource={pollingData?.data}
          // scroll={{ y: 510 }}
          pagination={{
            pageSize: pagination?.limit,
            current: pagination?.page,
            total: pagination?.total,
            onChange: (page) => setPage(page),
          }}
          size="middle"
        />
      </div>
    </div>
  );
}
