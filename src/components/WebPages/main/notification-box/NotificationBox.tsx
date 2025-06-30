"use client";

import { useState } from "react";
import {
  Layout,
  Input,
  Avatar,
  Checkbox,
  Button,
  Table,
  Modal,
  Typography,
  Space,
  DatePicker,
  ConfigProvider,
} from "antd";
import {
  SearchOutlined,
  SendOutlined,
  PlusOutlined,
  CloseOutlined,
  FileTextOutlined,
  LockOutlined,
  UnlockOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { CiShare1 } from "react-icons/ci";

const { Sider, Content } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
  statusColor: string;
}

interface Message {
  key: string;
  sno: number;
  name: string;
  message: string;
  time: string;
  fullMessage?: string;
  title?: string;
  messageId?: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Mr. Nadir",
    status: "Tiki",
    avatar: "/assets/user1.jpg?height=40&width=40",
    statusColor: "#1890ff",
  },
  {
    id: 2,
    name: "Siphokazi Selebe",
    status: "Senda",
    avatar: "/assets/user2.png?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 3,
    name: "Alison Moloi",
    status: "Senda",
    avatar: "/assets/user4.png?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 4,
    name: "Mr. Nadir",
    status: "Tazada",
    avatar: "/assets/user5.svg?height=40&width=40",
    statusColor: "#faad14",
  },
  {
    id: 5,
    name: "Babalwa Moloi",
    status: "Senda",
    avatar: "/assets/user6.svg?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 6,
    name: "Rashied Naaido",
    status: "Tazada",
    avatar: "/assets/user7.svg?height=40&width=40",
    statusColor: "#faad14",
  },
  {
    id: 7,
    name: "Candice Ryan",
    status: "Senda",
    avatar: "/assets/user8.png?height=40&width=40",
    statusColor: "#52c41a",
  },
  {
    id: 8,
    name: "Asadur Yead",
    status: "Senda",
    avatar: "/assets/yead_dp.jpg?height=40&width=40",
    statusColor: "#52c41a",
  },
];

const messageData: Message[] = [
  {
    key: "100",
    sno: 100,
    name: "Mr. Nadir",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
    title: "Tiki",
    messageId: "2472",
    fullMessage:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet. Donec tincidunt efficitur. In In ipsum Cras turpis viverra Donec ullamcorper placerat dignissim diam sed leo. Nulla vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa eget vehicula.",
  },
  {
    key: "99",
    sno: 99,
    name: "Siphokazi Selebe",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
  {
    key: "98",
    sno: 98,
    name: "Alison Moloi",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
  {
    key: "97",
    sno: 97,
    name: "Mr. Nadir",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
  {
    key: "96",
    sno: 96,
    name: "Babalwa Moloi",
    message:
      "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis",
    time: "03:30am-2/11/12",
  },
];

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
        <div
          className="col-span-3 h-full"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #A1A1A1",
              padding: "8px 15px 18px 15px",
            }}
            className="flex items-center justify-between gap-2 pb-4"
          >
            {/* Search Input */}
            <Input
              placeholder="Search People"
              prefix={
                <SearchOutlined style={{ color: "#188A50", fontSize: 20 }} />
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                height: "44px",
                borderRadius: "16px",
                boxShadow: "0px 1px 3px #00000026",
                border: "none",
              }}
            />

            {/* Select All Checkbox */}
            <ConfigProvider
              theme={{
                components: {
                  Checkbox: {
                    controlInteractiveSize: 20,
                  },
                },
              }}
            >
              <Checkbox
                indeterminate={isIndeterminate}
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                style={{ fontWeight: 500, color: "#5C5C5C", width: 20 }}
              ></Checkbox>
            </ConfigProvider>
          </div>

          {/* Contacts List */}
          <div
            style={{
              height: 460,
              overflowY: "scroll",
              padding: "8px 7px 18px 15px",
            }}
          >
            {filteredContacts?.map((contact) => (
              <div
                key={contact.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid #f5f5f5",
                }}
                className="notification-contact-row "
              >
                <Avatar
                  src={contact.avatar}
                  size={40}
                  style={{ marginRight: "12px" }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#262626",
                      marginBottom: "2px",
                    }}
                  >
                    {contact.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#66BFE6",
                      fontWeight: 500,
                    }}
                  >
                    {contact.status}
                  </div>
                </div>
                <ConfigProvider
                  theme={{
                    components: {
                      Checkbox: {
                        controlInteractiveSize: 20,
                      },
                    },
                  }}
                >
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onChange={(e) =>
                      handleContactSelect(contact.id, e.target.checked)
                    }
                    style={{ width: 20, height: 20 }}
                  />
                </ConfigProvider>
              </div>
            ))}
          </div>
        </div>
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

      <Content
        style={{
          background: "#fff",
          width: "100%",
          marginTop: 30,
          padding: "16px 24px",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Title level={4} style={{ margin: 0, color: "#262626" }}>
            Message History
          </Title>
          <Space size="large">
            <Button
              icon={<FileTextOutlined />}
              style={{ borderRadius: "6px", height: 40, width: 40 }}
            />
            <Button icon={<LockOutlined />} style={{ borderRadius: "6px" }} />
            <Button icon={<UnlockOutlined />} style={{ borderRadius: "6px" }} />
            <Input
              placeholder="Search here"
              prefix={
                <SearchOutlined
                  style={{
                    backgroundColor: "#B7DBC9",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                />
              }
              style={{
                width: 335,
                borderRadius: "20px",
                padding: 4,
                boxShadow: "0px 1px 3px 0px #00000026",
                border: "none",
                height: 44,
              }}
            />
            <DatePicker
              placeholder="Date"
              suffixIcon={<CalendarOutlined />}
              style={{ borderRadius: "6px", width: 94, height: 40 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                borderRadius: "6px",
                background: "#18953D",
                borderColor: "#18953D",
                height: 40,
              }}
              onClick={()=> toast.info("Asad Vai add korenai kichu")}
            >
              Add Agent
            </Button>
          </Space>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={messageData}
          pagination={false}
          size="middle"
          style={{
            background: "#fff",
          }}
          onRow={(record) => ({
            style: { cursor: "pointer" },
            onClick: () => handleMessageClick(record),
          })}
        />
      </Content>

      {/* Notification Detail Modal */}
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={500}
        closeIcon={
          <CloseOutlined style={{ fontSize: "16px", color: "#8c8c8c" }} />
        }
        styles={{
          header: { display: "none" },
          body: { padding: "24px" },
        }}
      >
        {selectedMessage && (
          <div>
            {/* Header with s.no and close button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Text style={{ color: "#8c8c8c", fontSize: "14px" }}>
                s.no {selectedMessage.sno}
              </Text>
            </div>

            {/* Name and Time */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Text strong style={{ fontSize: "16px", color: "#262626" }}>
                {selectedMessage.name}
              </Text>
              <Text style={{ color: "#8c8c8c", fontSize: "14px" }}>
                {selectedMessage.time}
              </Text>
            </div>

            {/* Message ID */}
            {selectedMessage.messageId && (
              <Text
                strong
                style={{
                  display: "block",
                  marginBottom: "12px",
                  fontSize: "16px",
                  color: "#262626",
                }}
              >
                {selectedMessage.messageId}
              </Text>
            )}

            {/* Title */}
            {selectedMessage.title && (
              <Title
                level={5}
                style={{
                  color: "#1890ff",
                  marginBottom: "16px",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {selectedMessage.title}
              </Title>
            )}

            {/* Message Content */}
            <Text
              style={{
                lineHeight: "1.6",
                color: "#595959",
                display: "block",
                fontSize: "14px",
              }}
            >
              {selectedMessage.fullMessage || selectedMessage.message}
            </Text>
          </div>
        )}
      </Modal>
    </div>
  );
}
