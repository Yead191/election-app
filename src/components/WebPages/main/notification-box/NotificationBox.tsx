"use client";

import { useState } from "react";
import { Layout, Input, Button, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { CiShare1 } from "react-icons/ci";
import { contacts, Message, messageData } from "@/data/NotificationBox";
import ContactList from "./ContactList";
import MessageHistory from "./MessageHistory";
import NotificationDetailsModal from "./NotificationDetailsModal";

const { TextArea } = Input;

export default function NotificationBox() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [messageText, setMessageText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleContactSelect = (contactId: number, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, contactId]);
    } else {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(contacts.map((contact) => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleMessageClick = (record: Message) => {
    setSelectedMessage(record);
    setIsModalVisible(true);
  };

  const handleMessageSend = () => {
    // Handle sending the message
    setMessageText("");
    toast.warning("Ekhon Msg pathano jabena!, Backend nai");
  };

  const isAllSelected = selectedContacts.length === contacts.length;
  const isIndeterminate =
    selectedContacts.length > 0 && selectedContacts.length < contacts.length;

  const columns = [
    {
      title: "s. no.",
      dataIndex: "sno",
      key: "sno",
      width: 80,
      render: (text: number) => <span style={{ color: "#666" }}>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
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
      dataIndex: "time",
      key: "time",
      width: 150,
      render: (text: string) => <span style={{ color: "#666" }}>{text}</span>,
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

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
          filteredContacts={filteredContacts}
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
        messageData={messageData}
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
