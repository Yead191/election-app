"use client";

import { useState } from "react";
import { Typography, Button, Badge, Avatar, Card } from "antd";
import { BellOutlined, ShopOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
} from "@/redux/feature/notification/notificationApi";
import dayjs from "dayjs";
import { toast } from "sonner";

const { Title, Text } = Typography;

interface Notification {
  _id: string;
  // type: "order" | "client_update" | "general";
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  avatar?: string;
}

export default function NotificationsPage() {
  // get notification api
  const { data: notificationData, refetch } =
    useGetNotificationQuery(undefined);
  // read all notification
  const [readAllNotification] = useReadAllNotificationMutation();

  const notifications = notificationData?.data || [];
  console.log(notifications, "notificationData");
  const unreadCount = notifications?.unread || 0;

  const handleReadAll = () => {
    toast.promise(readAllNotification({}).unwrap(), {
      loading: "Reading all notifications...",
      success: (res) => {
        console.log(res);
        refetch();
        return <b>{res.message}</b>;
      },
      error: "Failed to mark all notifications as read.",
    });
  };

  const handleNotificationClick = (id: string) => {};

  const renderNotificationItem = (item: Notification) => (
    <div
      key={item._id}
      onClick={() => handleNotificationClick(item._id)}
      style={{
        padding: "16px 20px",
        backgroundColor: item.isRead ? "#ffffff" : "#E8F6FB",
        borderBottom: "1px solid #f0f0f0",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = item.isRead
          ? "#fafafa"
          : "#E8F6FB";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = item.isRead
          ? "#ffffff"
          : "#E8F6FB";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
          <div style={{ marginRight: 12, marginTop: 2 }}>
            <Avatar
              size={32}
              icon={<BellOutlined style={{ color: "#faad14" }} />}
              style={{ backgroundColor: "#f0f0f0" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <Text
                strong
                style={{
                  color: "#333",
                  fontSize: 14,
                  marginRight: 8,
                }}
              >
                {item.title}
              </Text>
              {!item.isRead && (
                <Badge
                  dot
                  style={{
                    backgroundColor: "#52c41a",
                  }}
                />
              )}
            </div>
            <Text
              style={{
                color: "#888",
                fontSize: 12,
                lineHeight: 1.4,
              }}
            >
              {item?.message}
            </Text>
          </div>
        </div>
        <Text
          style={{
            color: "#bbb",
            fontSize: 12,
            whiteSpace: "nowrap",
            marginLeft: 16,
          }}
        >
          {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}
        </Text>
      </div>
    </div>
  );

  return (
    <div
      style={{
        padding: "16px 24px",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Title level={3} style={{ margin: 0, color: "#333" }}>
            Notifications
          </Title>
          {unreadCount > 0 && (
            <Badge
              count={unreadCount}
              style={{
                backgroundColor: "#E8F6FB",
                marginLeft: 12,
                color: "black",
              }}
            />
          )}
        </div>
        <Button
          type="primary"
          onClick={handleReadAll}
          disabled={unreadCount === 0}
          style={{
            borderRadius: 6,
            height: 36,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: "transparent",
            color: unreadCount !== 0 ? "#1BA0D9" : "gray",
            border: unreadCount !== 0 ? "1px solid #1BA0D9" : "1px solid gray",
            fontWeight: 400,
          }}
        >
          Read all
        </Button>
      </div>

      {/* Notifications List */}
      <div>
        {notifications?.length === 0 ? (
          <div>
            <BellOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>No notifications yet</div>
          </div>
        ) : (
          <div
            style={{
              height: "75vh",
              overflowY: "auto",
            }}
          >
            {notifications?.notifications?.map(renderNotificationItem)}
          </div>
        )}
      </div>
    </div>
  );
}
