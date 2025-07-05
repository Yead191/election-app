"use client";

import { use, useState } from "react";
import { Table, Button, Space, Typography, ConfigProvider } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StationInfoModal from "./StationInfoModal";

const { Text } = Typography;

import type { TablePaginationConfig } from "antd/es/table";
import { usePathname } from "next/navigation";

interface PollingStationTableProps {
  dataSource: any[];
  pagination?: false | TablePaginationConfig;
  scroll?: object;
}

export default function PollingStationTable({
  dataSource,
  pagination = false,
  scroll = { x: 1200, y: 1100 },
}: PollingStationTableProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const pathname = usePathname();
  // console.log(pathname);
  const showModal = (station: any) => {
    setSelectedStation(station);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStation(null);
  };

  const columns = [
    {
      title: "Postal Code",
      dataIndex: "postCode",
      key: "postCode",
      width: 80,
      sorter: (a: any, b: any) => a.postCode.localeCompare(b.postCode),
    },
    {
      title: "Area Name",
      dataIndex: "name",
      key: "name",
      width: 80,
      filters: [
        { text: "Tiki", value: "Tiki" },
        { text: "Sendo", value: "Sendo" },
        { text: "Lazada", value: "Lazada" },
        { text: "Shopee", value: "Shopee" },
      ],
      onFilter: (value: any, record: any) => record.name === value,
    },
    {
      title: "Pooling Address",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 80,
    },
    {
      title: "CRM",
      dataIndex: "CRM",
      key: "CRM",
      align: "center" as const,
      sorter: (a: any, b: any) => a.CRM - b.CRM,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value.toLocaleString()}
        </Text>
      ),
      width: 70,
    },
    {
      title: "CPDM",
      dataIndex: "CPDM",
      key: "CPDM",
      align: "center" as const,
      sorter: (a: any, b: any) => a.CPDM - b.CPDM,
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
      width: 80,
    },
    {
      title: "APC",
      dataIndex: "APC",
      key: "APC",
      align: "center" as const,
      sorter: (a: any, b: any) => a.APC - b.APC,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value.toLocaleString()}
        </Text>
      ),
      width: 60,
    },
    {
      title: "APT/ATP",
      dataIndex: "APT/ATP",
      key: "APT/ATP",
      align: "center" as const,
      sorter: (a: any, b: any) => a["APT/ATP"] - b["APT/ATP"],
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
      width: 70,
    },
    {
      title: "SDF",
      dataIndex: "SDF",
      key: "SDF",
      align: "center" as const,
      sorter: (a: any, b: any) => a.SDF - b.SDF,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value.toLocaleString()}
        </Text>
      ),
      width: 60,
    },
    {
      title: "UDC",
      dataIndex: "UDC",
      key: "UDC",
      align: "center" as const,
      sorter: (a: any, b: any) => a.UDC - b.UDC,
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
      width: 65,
    },

    {
      title: "PMSC",
      dataIndex: "PMSC",
      key: "PMSC",
      align: "center" as const,
      sorter: (a: any, b: any) => a.PMSC - b.PMSC,
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
      width: 70,
    },
    {
      title: "Action",
      key: "action",
      align: "right" as const,
      width: 70,
      render: (_: any, record: any) => (
        <Space>
          <Button
            style={{
              fontSize: 20,
            }}
            type="text"
            icon={<InfoCircleOutlined style={{ color: "#1677ff" }} />}
            onClick={() => showModal(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="max-w-[99%] ">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={pathname === "/pooling-station-status" ? undefined : scroll}
          pagination={pagination}
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
