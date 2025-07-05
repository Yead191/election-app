"use client";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button, Badge, Typography, Space } from "antd";
import {
  PieChartOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  PlusSquareOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  InfoCircleOutlined,
  LockOutlined,
  FileProtectOutlined,
  QuestionCircleOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import Image from "next/image";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;

interface DashboardSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export default function DashboardSidebar({
  collapsed = false,
  onCollapse,
}: DashboardSidebarProps) {
  const [selectedKey, setSelectedKey] = useState("analytics");
  const router = useRouter();
  const pathname = usePathname();
  const [hasNewPollingData, setHasNewPollingData] = useState(false);
  // console.log(pathname);
  useEffect(() => {
    setSelectedKey(pathname.split("/")[1] || "analytics");
  }, [pathname]);

  // useEffect(() => {
  //   // Example: Check for new data every 5 seconds
  //   const interval = setInterval(() => {
  //     // Simulate new data (e.g., random condition)
  //     setHasNewPollingData(Math.random() > 0.5);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const menuItems = [
    {
      key: "analytics",
      icon: <PieChartOutlined />,
      label: "Analytics",
    },
    {
      key: "polling-data",
      icon: <FileTextOutlined />,
      label: (
        <Badge count={4} offset={[15, 0]} size="small" >
          Polling Data
        </Badge>
      ),
    },
    {
      key: "agents-list",
      icon: <TeamOutlined />,
      label: "Agents list",
    },
    {
      key: "manage-admin",
      icon: <UserSwitchOutlined />,
      label: "Manage Admin",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          key: "vote-information",
          icon: <PlusSquareOutlined />,
          label: "Vote Information",
        },
        {
          key: "nominated-team",
          icon: <UsergroupAddOutlined />,
          label: "Nominated Team",
        },
        {
          key: "election-area",
          icon: <ApartmentOutlined />,
          label: "Election Area",
        },
        {
          key: "about-us",
          icon: <InfoCircleOutlined />,
          label: "About us",
        },
        {
          key: "privacy-policy",
          icon: <LockOutlined />,
          label: "Privacy Policy",
        },
        {
          key: "terms-conditions",
          icon: <FileProtectOutlined />,
          label: "Terms & Conditions",
        },
        {
          key: "faq",
          icon: <QuestionCircleOutlined />,
          label: "FAQ",
        },
      ],
    },
  ];

  const notificationMenuItem = [
    {
      key: "notification-box",
      icon: <NotificationOutlined />,
      label: "Notification box",
    },
  ];

  const bottomMenuItem = {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Log Out",
  };

  const handleLogOut = () => {
    toast.warning("Are you sure you want to log out?", {
      duration: 5000,
      description: "You will be logged out and redirected to the login page.",
      action: {
        label: "Logout",
        onClick: async () => {
          toast.success("Logged out successfully");
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", position: "sticky", top:"0px", zIndex: 10 }}>
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={260}
        style={{
          background: "#fff",
          paddingRight: 8,
          //   borderRight: "1px solid #f0f0f0",
        }}
      >
        {/* Logo Section */}
        <Link
          href={"/analytics"}
          style={{
            padding: "14px 25px 0px 25px",
            // borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* <div
            style={{
              width: 32,
              height: 32,
              background: "#52c41a",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            W
          </div> */}

          <div className="flex items-center gap-2">
            <Image
              className="w-[57px] h-[60px] object-cover overflow-visible"
              src="/logo.jpg"
              alt="Westfert Logo"
              width={57}
              height={60}
            />
            <h4 className="text-[#18953D] font-semibold leading-5">
              Cameroon Renaissance Movement
            </h4>
          </div>
        </Link>

        {/* Main Menu */}
        <div
          style={{
            // height: "calc(100vh - 120px)",
            height: "calc(100vh - 85px)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuItems}
              style={{
                border: "none",
                flex: 1,
                marginTop: 30,
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
              }}
              onClick={({ key }) => {
                router.push(`/${key}`);
              }}
            />

            <Divider
              style={{
                margin: "16px 0",
                height: "2px",
                backgroundColor: "#1BA0D9",
                border: "none",
              }}
            />

            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={notificationMenuItem}
              style={{
                border: "none",
                fontSize: 16,
              }}
              onClick={({ key }) => {
                router.push(`/${key}`);
              }}
            />
          </div>

          {/* Bottom Menu Item */}
          {/* <Menu mode="inline" items={[bottomMenuItem]} /> */}
          <Button
            type="primary"
            style={{
              //   backgroundColor: "none",
              border: "none",
              borderTop: "1px solid #f0f0f0",
              marginTop: "auto",
              padding: "0px 32px",
              backgroundColor: "transparent",
              color: "black",
              fontWeight: "400",
              fontSize: "16px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            onClick={handleLogOut}
          >
            <LogoutOutlined />
            Logout
          </Button>
        </div>
      </Sider>
    </Layout>
  );
}
