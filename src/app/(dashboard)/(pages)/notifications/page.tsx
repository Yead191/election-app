"use client";

import { useEffect, useMemo, useState } from "react";
import { Typography, Button, Badge, Avatar, Pagination } from "antd";
import { BellOutlined } from "@ant-design/icons";
import {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
  useReadOneNotificationMutation,
} from "@/redux/feature/notification/notificationApi";
import dayjs from "dayjs";
import { toast } from "sonner";
import io from "socket.io-client";
import { imgUrl } from "../../layout";
import { useGetProfileQuery } from "@/redux/feature/auth/authApi";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  avatar?: string;
  path: string;
  refernceId: string;
}

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const socket = useMemo(() => io(imgUrl), []);
  const router = useRouter();

  // Get notification API
  const { data: notificationData, refetch } = useGetNotificationQuery({
    page,
    limit,
  });
  // Get profile API
  const { data: user, isLoading } = useGetProfileQuery(null);

  console.log(notificationData);
  // Read all notifications
  const [readAllNotification] = useReadAllNotificationMutation();
  const [readOneNotification] = useReadOneNotificationMutation();

  const totalNotifications = notificationData?.pagination?.total || 0;
  const unreadCount = notificationData?.data?.unread || 0;

  useEffect(() => {
    socket.on(`sendNotification::${user?.data?._id}`, (data) => {
      console.log(data);
      refetch();
    });
  }, [socket, user?.data?._id]);

  const handleReadAll = () => {
    toast.promise(readAllNotification({}).unwrap(), {
      loading: "Reading all notifications...",
      success: (res) => <b>{res.message}</b>,
      error: "Failed to mark all notifications as read.",
    });
  };

  const handleNotificationClick = (id: string, path: string) => {
    if (!path) {
      return;
    }

    if (path === "polling") {
      return router.push(`/polling-data/details-page/${id}`);
    }
    if (path === "agent") {
      return router.push(`/agent-profile/${id}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const renderNotificationItem = (item: Notification) => (
    <div
      key={item._id}
      onClick={() => handleNotificationClick(item.refernceId, item.path)}
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
        {notificationData?.data?.notifications?.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <BellOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>No notifications yet</div>
          </div>
        ) : (
          <div
            style={{
              height: "65vh",
              overflowY: "auto",
            }}
          >
            {notificationData?.data?.notifications?.map(renderNotificationItem)}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalNotifications > 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Pagination
            current={page}
            pageSize={limit}
            total={totalNotifications}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{ marginTop: 16 }}
          />
        </div>
      )}
    </div>
  );
}
