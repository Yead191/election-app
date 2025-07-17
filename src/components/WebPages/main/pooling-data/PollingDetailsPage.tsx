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
import { useEffect, useRef, useState } from "react";
import NotFoundEntry from "./not-found-entry";
import Spinner from "@/components/Spinner/Spinner";

const { Title, Text } = Typography;

export default function PoolingDetailsPage() {
  const resultRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const [isScanned, setIsScanned] = useState(false);
  const [scanId, setScanId] = useState(params.id);
  const { data: poolingEntry, isLoading } = useGetPollingDataByIdQuery(
    params.id
  );
  //   console.log(poolingEntry);
  const { data: scanResult, refetch } = useScanResultQuery(scanId);

  console.log("scan", scanResult);
  if (isLoading) {
    return <Spinner />;
  }
  if (!poolingEntry) {
    return <NotFoundEntry />;
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
          refetch={refetch}
        />
      </div>

      {/* Scan Result Section */}
      <div
        ref={resultRef}
        // className={`${scanResult?.data.length ? "block" : "hidden"}`}
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
