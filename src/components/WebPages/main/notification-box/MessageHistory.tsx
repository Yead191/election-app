import React from "react";
import {
  Input,
  Button,
  Table,
  Space,
  DatePicker,
  Layout,
  Typography,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
const { Content } = Layout;
const { Text, Title } = Typography;

interface MessageHistoryProps {
  columns: any[];
  messageData: any[];
  handleMessageClick: (message: any) => void;
}

export default function MessageHistory({
  columns,
  messageData,
  handleMessageClick,
}: MessageHistoryProps) {
  return (
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
          {/* <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              borderRadius: "6px",
              background: "#18953D",
              borderColor: "#18953D",
              height: 40,
            }}
            onClick={() => toast.info("Asad Vai add korenai kichu")}
          >
            Add Agent
          </Button> */}
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={messageData}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} items`,
        }}
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
  );
}
