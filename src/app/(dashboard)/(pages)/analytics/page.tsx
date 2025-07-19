import ElectionAnalytics from "@/components/WebPages/main/analytics-page/analytics-page";
import React from "react";

export default function page() {
  return (
    <div>
      <ElectionAnalytics />
    </div>
  );
}

export const metadata = {
  title: "Analytics | Election Mobile App",
  description: "Analytics",
};