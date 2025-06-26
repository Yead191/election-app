"use client";

import React, { ReactNode, useState } from "react";
import { Card, Row, Col, Typography, Select, Space, Badge, Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard-sidebar/DashboardSidebar";
import { usePathname } from "next/navigation";

const layout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Title, Text } = Typography;
  const pathname = usePathname();

  const formatPathName = (slug: string | undefined) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Check if the string looks like an ID (Mongo _id or numeric)
  const isIdSegment = (str: string) =>
    /^[a-f\d]{24}$/i.test(str) || /^\d+$/.test(str);

  const pathSegments = pathname?.split("/").filter(Boolean) || [];

  let targetSlug = pathSegments[pathSegments.length - 1];

  if (isIdSegment(targetSlug)) {
    targetSlug = pathSegments[pathSegments.length - 2]; // fallback to previous segment
  }

  return (
    <div className="flex   md:p-0 bg-[#F1F1F9] min-h-screen">
      <div className="w-[260px]">
        <DashboardSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      </div>
      <div className="w-full flex-1  ">
        {/* Header */}
        <div className="">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              padding: "22px 24px",
              //   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              //   marginTop: "-2px",
            }}
          >
            <Title
              level={3}
              style={{ margin: 0, fontSize: 24, fontWeight: 500 }}
            >
              {/* {formatPathName(pathname.split("/")[1])} */}
              {formatPathName(targetSlug)}
            </Title>
            <Space
              style={{
                gap: "30px",
              }}
              size="middle"
            >
              <Link href={"/notification"}>
                <Badge dot>
                  <BellOutlined
                    style={{
                      fontSize: "18px",
                      color: "#666",
                      backgroundColor: "#F1F1F9",
                      padding: "8px",
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </Badge>
              </Link>
              <Link href={"/admin-profile"} className="flex items-center gap-2">
                <Avatar src="/assets/user1.jpg?height=40&width=40" size={40} />
                <span className="leading-6 font-semibold text-black">
                  Admin Yead
                </span>
              </Link>
            </Space>
          </div>
        </div>
        <section className="p-6">{children}</section>
      </div>
    </div>
  );
};

export default layout;
