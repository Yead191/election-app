"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Avatar,
  Input,
  Table,
  Image,
  Descriptions,
  Divider,
} from "antd";
import { poolingData } from "@/data/pooling-data";
import { allPollingStations } from "@/data/polling-stations";
import { toast } from "sonner";
import PollingProfile from "@/components/WebPages/main/pooling-data/PollingProfile";
import PollingReport from "@/components/WebPages/main/pooling-data/PollingReport";
import ScanResult from "@/components/WebPages/main/pooling-data/ScanResult";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function PoolingDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // Find the specific pooling data entry
  const poolingEntry = poolingData.find((entry) => entry.key === params.id);

  if (!poolingEntry) {
    return <div>Entry not found</div>;
  }

  // Table columns for scan results
  const scanResultColumns = [
    {
      title: "Postal Code",
      dataIndex: "postCode",
      key: "postCode",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Pooling Address",
      dataIndex: "address",
      key: "address",
      width: 150,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 120,
    },
    {
      title: "CRM",
      dataIndex: "CRM",
      key: "CRM",
      align: "center" as const,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value?.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "CPDM",
      dataIndex: "CPDM",
      key: "CPDM",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    {
      title: "APC",
      dataIndex: "APC",
      key: "APC",
      align: "center" as const,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value?.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "APT/ATP",
      dataIndex: "APT/ATP",
      key: "APT/ATP",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    {
      title: "SDF",
      dataIndex: "SDF",
      key: "SDF",
      align: "center" as const,
      render: (value: any) => (
        <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
          {value?.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "UDC",
      dataIndex: "UDC",
      key: "UDC",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    {
      title: "PMSC",
      dataIndex: "PMSC",
      key: "PMSC",
      align: "center" as const,
      render: (value: any) => <Text strong>{value?.toLocaleString()}</Text>,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   align: "center" as const,
    //   width: 80,
    //   render: () => (
    //     <Button type="link" size="small">
    //       Info
    //     </Button>
    //   ),
    // },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Left Column */}

        <PollingProfile poolingEntry={poolingEntry} />
        {/* right column */}
        <PollingReport poolingEntry={poolingEntry} />
      </div>

      {/* Scan Result Section */}
      <ScanResult
        scanResultColumns={scanResultColumns}
        allPollingStations={allPollingStations}
      />
    </div>
  );
}
