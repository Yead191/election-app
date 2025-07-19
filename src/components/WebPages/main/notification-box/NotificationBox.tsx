"use client";

import { useState } from "react";
import { Layout, Input, Button, Typography, Tooltip } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { CiShare1 } from "react-icons/ci";
import { contacts, Message } from "@/data/NotificationBox";
import ContactList from "./ContactList";
import MessageHistory from "./MessageHistory";
import NotificationDetailsModal from "./NotificationDetailsModal";
import { useGetAgentListQuery } from "@/redux/feature/agent-list-apis/agentApi";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/feature/Notification-box/NotificationBoxApi";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function NotificationBox() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [messageText, setMessageText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  // send msg api
  const { data: agentList, refetch } = useGetAgentListQuery({
    searchTerm: searchText,
  });

  // get message api
  const { data: messageData, refetch: refetchMessage } = useGetMessagesQuery({
    searchTerm: searchText,
  });

  // const send notification
  const [sendMessage] = useSendMessageMutation();

  const handleContactSelect = (contactId: any, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, contactId]);
    } else {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(
        agentList?.data?.map((agent: any) => agent._id) || []
      );
    } else {
      setSelectedContacts([]);
    }
  };

  const handleMessageClick = (record: Message) => {
    setSelectedMessage(record);
    setIsModalVisible(true);
  };

  const handleMessageSend = () => {
    const newMessage = {
      message: messageText,
      recievers: selectedContacts,
    };
    console.log(newMessage);

    toast.promise(
      sendMessage({
        data: newMessage,
      }).unwrap(),
      {
        loading: "Sending notification...",
        success: (res) => {
          console.log(res);
          setSelectedContacts([]);
          setMessageText("");
          setIsModalVisible(false);
          refetch();
          refetchMessage();
          return <b>{res.message}</b>;
        },
        error: "Failed to send notification.",
      }
    );
  };
  console.log(selectedContacts);

  const isAllSelected = agentList?.data?.length
    ? selectedContacts.length === agentList.data.length
    : false;
  const isIndeterminate = agentList?.data?.length
    ? selectedContacts.length > 0 &&
      selectedContacts.length < agentList.data.length
    : false;

  const columns = [
    {
      title: "m. id.",
      dataIndex: "_id",
      key: "_id",
      width: 120,
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="text-sm">{text.slice(0, 10)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (_: any, record: any) => (
        <span style={{ color: "#666" }}>{record.reciver?.name || "N/A"}</span>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      render: (text: string) => <span style={{ color: "#666" }}>{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text: string) => (
        <span style={{ color: "#666" }}>
          {dayjs(text).format("hh:mma-DD/MM/YY")}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      width: 50,
      render: (_: any, record: Message) => (
        <Button
          type="text"
          icon={<CiShare1 style={{ color: "#5C5C5C", fontSize: "20px" }} />}
          onClick={() => handleMessageClick(record)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 w-full h-full">
        {/* contact list */}
        <ContactList
          selectedContacts={selectedContacts}
          handleContactSelect={handleContactSelect}
          searchText={searchText}
          setSearchText={setSearchText}
          isIndeterminate={isIndeterminate}
          filteredContacts={agentList?.data || []}
          handleSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
        />

        {/* Message Textarea */}
        <div
          className="col-span-9 w-full h-full"
          style={{
            marginBottom: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "16px 18px",
          }}
        >
          <TextArea
            placeholder="Message"
            rows={18}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={{
              marginBottom: "12px",
              borderRadius: "24px",
              resize: "none",
              height: "auto",
              backgroundColor: "#F1F1F9",
              padding: 24,
            }}
          />
          <div style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={handleMessageSend}
              icon={<SendOutlined />}
              style={{
                borderRadius: "6px",
                background: "#1BA0D9",
                borderColor: "#1BA0D9",
                padding: "14px 20px",
                height: "48px",
                width: 105,
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Message history */}
      <MessageHistory
        columns={columns}
        messageData={messageData?.data || []}
        handleMessageClick={handleMessageClick}
      />
      {/* Notification Detail Modal */}
      <NotificationDetailsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedMessage={selectedMessage}
      />
    </div>
  );
}
