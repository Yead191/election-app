"use client";

import { useState } from "react";
import { Table, Button, Space, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StationInfoModal from "./StationInfoModal";
import { usePathname } from "next/navigation";
import path from "path";

const { Text } = Typography;

interface PollingStationTableProps {
  dataSource: any[];
  page: number;
  setPage: (page: number) => void;
  paginationData: any;
}

export default function PollingStationTable({
  dataSource,
  page,
  setPage,
  paginationData,
}: PollingStationTableProps) {
  const pathname = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  // Build all unique poll names dynamically
  const allPollNames = Array.from(
    new Set(
      dataSource.flatMap((item) => item.polls.map((poll: any) => poll.name))
    )
  );

  // Transform data and store the max vote for each row
  const transformedData = dataSource.map((item, index) => {
    const voteMap: Record<string, number> = {};
    item.polls.forEach((poll: any) => {
      voteMap[poll.name] = poll.votes;
    });

    const votesArray = Object.values(voteMap);
    const highestVote = Math.max(...votesArray);

    return {
      key: item._id || index,
      postalCode: item.agent?.postalCode || "N/A",
      name: item.station?.name || "N/A",
      city: item.station?.city || "N/A",
      pollingAddress: item.station?.name || "N/A",
      sendingTime: new Date(item.createdAt).toLocaleTimeString(),
      ...voteMap,
      highestVote,
      fullData: item,
    };
  });

  //  Build poll columns dynamically with per-row highlight logic
  const pollColumns = allPollNames?.map((name) => ({
    title: name,
    dataIndex: name,
    key: name,
    align: "center" as const,
    sorter: (a: any, b: any) => (a[name] ?? 0) - (b[name] ?? 0),
    render: (_: any, record: any) => {
      const value = record[name] || 0;
      const isMax = value === record.highestVote;
      return (
        <Text
          style={{
            color: isMax ? "#22c55e" : "black",
            fontWeight: isMax ? "bold" : "normal",
          }}
        >
          {Number(value).toLocaleString()}
        </Text>
      );
    },
    width: 40,
  }));

  //  Build full columns
  const columns = [
    // {
    //   title: "Postal Code",
    //   dataIndex: "postalCode",
    //   key: "postalCode",
    //   width: 40,
    // },
    {
      title: "Pooling Center",
      dataIndex: "city",
      key: "city",
      width: 60,
      render: (_: any, record: any) => <p>{record?.city || "N/A"}</p>,
    },
    {
      title: "Pooling Station",
      dataIndex: "pollingAddress",
      key: "pollingAddress",
      render: (_: any, record: any) => <p>{record?.pollingAddress || "N/A"}</p>,
      width: 60,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 40,
    },
    ...pollColumns,
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      width: 40,
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="text"
            icon={
              <InfoCircleOutlined style={{ color: "#1677ff", fontSize: 20 }} />
            }
            onClick={() => showModal(record.fullData)}
          />
        </Space>
      ),
    },
  ];

  //  Modal functions
  const showModal = (station: any) => {
    setSelectedStation(station);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStation(null);
  };
  // console.log(pathname);

  return (
    <>
      <div className="max-w-[99%]">
        <Table
          columns={columns}
          dataSource={transformedData}
          scroll={
            pathname === "/analytics/pooling-station-status"
              ? undefined
              : { x: 900, y: 200 }
          }
          pagination={
            pathname === "/analytics/pooling-station-status"
              ? {
                  pageSize: paginationData?.limit,
                  total: paginationData?.total,
                  current: paginationData?.page,
                  onChange: (page) => setPage(page),
                }
              : false
          }
          size="middle"
        />
      </div>
      <StationInfoModal
        visible={isModalVisible}
        station={selectedStation}
        onClose={handleModalClose}
      />
    </>
  );
}
