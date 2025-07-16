"use client";

import { useParams, useRouter } from "next/navigation";
import { Typography, Input } from "antd";
import { poolingData } from "@/data/pooling-data";
import { allPollingStations } from "@/data/polling-stations";
import PollingProfile from "@/components/WebPages/main/pooling-data/PollingProfile";
import PollingReport from "@/components/WebPages/main/pooling-data/PollingReport";
import ScanResult from "@/components/WebPages/main/pooling-data/ScanResult";
import {
  useGetPollingDataByIdQuery,
  useScanResultQuery,
} from "@/redux/feature/polling-data/PollingDataApi";
import { useRef, useState } from "react";

const { Title, Text } = Typography;

export default function PoolingDetailsPage() {
  const resultRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const [isScanned, setIsScanned] = useState(false);
  const [scanId, setScanId] = useState("");
  const { data: poolingEntry } = useGetPollingDataByIdQuery(params.id);
  // console.log(poolingEntry);
  const { data: scanResult } = useScanResultQuery(scanId);

  console.log(scanResult);
  if (!poolingEntry) {
    return <div>Entry not found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Left Column */}
        <PollingProfile poolingEntry={poolingEntry?.data} />
        {/* right column */}
        <PollingReport
          poolingEntry={poolingEntry?.data}
          isScanned={isScanned}
          setIsScanned={setIsScanned}
          setScanId={setScanId}
          resultRef={resultRef}
        />
      </div>

      {/* Scan Result Section */}
      <div
        ref={resultRef}
        className={`${isScanned || scanId ? "block" : "hidden"}`}
      >
        <ScanResult
          isScanned={isScanned}
          scanId={scanId}
          setIsScanned={setIsScanned}
          allPollingStations={scanResult?.data || []}
        />
      </div>
    </div>
  );
}
