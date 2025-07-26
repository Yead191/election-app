"use client";

import { useParams } from "next/navigation";
import PollingProfile from "@/components/WebPages/main/pooling-data/PollingProfile";
import PollingReport from "@/components/WebPages/main/pooling-data/PollingReport";
import ScanResult from "@/components/WebPages/main/pooling-data/ScanResult";
import {
  useGetPollingDataByIdQuery,
  useScanResultQuery,
} from "@/redux/feature/polling-data/PollingDataApi";
import { useRef, useState } from "react";
import NotFoundEntry from "./not-found-entry";
import Spinner from "@/components/Spinner/Spinner";

export default function PoolingDetailsPage() {
  const resultRef = useRef(null);
  const params = useParams();
  const [isScanned, setIsScanned] = useState(false);
  const [scanId, setScanId] = useState(params.id);
  const { data: poolingEntry, isLoading } = useGetPollingDataByIdQuery(
    params.id
  );
  //   console.log(poolingEntry);
  const { data: scanResult, refetch } = useScanResultQuery(scanId);

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
      <div ref={resultRef}>
        <ScanResult
          isScanned={isScanned}
          scanId={scanId}
          refetch={refetch}
          setIsScanned={setIsScanned}
          allPollingStations={scanResult?.data || []}
        />
      </div>
    </div>
  );
}
