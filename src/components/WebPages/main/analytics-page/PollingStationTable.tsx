"use client";

import { useState } from "react";
import { Table, Button, Space, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StationInfoModal from "./StationInfoModal";

const { Text } = Typography;

import type { TablePaginationConfig } from "antd/es/table";

interface PollingStationTableProps {
  dataSource: any[];
  pagination?: false | TablePaginationConfig;
  scroll?: object;
}

export default function PollingStationTable({
  dataSource,
  pagination = false,
  scroll = { x: 1200, y: 200 },
}: PollingStationTableProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

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
      width: 110,
      sorter: (a: any, b: any) => a.postCode.localeCompare(b.postCode),
    },
    {
      title: "Area Name",
      dataIndex: "name",
      key: "name",
      width: 110,
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
      width: 250,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 150,
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
    },
    {
      title: "CPDM",
      dataIndex: "CPDM",
      key: "CPDM",
      align: "center" as const,
      sorter: (a: any, b: any) => a.CPDM - b.CPDM,
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
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
    },
    {
      title: "APT/ATP",
      dataIndex: "APT/ATP",
      key: "APT/ATP",
      align: "center" as const,
      sorter: (a: any, b: any) => a["APT/ATP"] - b["APT/ATP"],
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
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
    },
    {
      title: "UDC",
      dataIndex: "UDC",
      key: "UDC",
      align: "center" as const,
      sorter: (a: any, b: any) => a.UDC - b.UDC,
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
    },
    {
      title: "PMSC",
      dataIndex: "PMSC",
      key: "PMSC",
      align: "center" as const,
      sorter: (a: any, b: any) => a.PMSC - b.PMSC,
      render: (value: any) => <Text strong>{value.toLocaleString()}</Text>,
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      width: 120,
      render: (_: any, record: any) => (
        <Space>
          <Button
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
      <div className="custom-table">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={scroll}
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
