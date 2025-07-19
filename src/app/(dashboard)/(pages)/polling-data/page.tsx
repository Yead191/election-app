import PollingDataPage from "@/components/WebPages/main/pooling-data/PollingDataPage";

import React from "react";

export default function page() {
  return (
    <div>
      <PollingDataPage />
    </div>
  );
}

export const metadata = {
  title: "Polling Data | Election Mobile App",
  description: "Polling Data",
};
