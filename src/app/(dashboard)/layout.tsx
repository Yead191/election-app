"use client";

import React, { ReactNode, useState } from "react";
import { Typography } from "antd";

import DashboardSidebar from "@/components/dashboard-sidebar/DashboardSidebar";
import { usePathname } from "next/navigation";
import DashboardHeader from "@/components/dashboard-header/DashboardHeader";

const layout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex bg-[#F1F1F9] min-h-screen">
      {/* Sidebar */}
      <div className="">
        <DashboardSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      </div>

      {/* Right Content Area */}
      <div className="flex-1 relative">
        {/* Header inside content area */}
        <DashboardHeader />
        {/* Page content below fixed header */}
        <div className=" p-6 w-full ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
