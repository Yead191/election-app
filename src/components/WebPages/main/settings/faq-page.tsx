"use client";

import { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Checkbox,
  Space,
  Modal,
  Form,
  Input,
  message,
  Divider,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "sonner";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface FAQItem {
  id: string;
  title: string;
  content: string;
  selected: boolean;
}

export default function FAQDashboard() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: "1",
      title: "Our Story",
      content:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. In In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at",
      selected: false,
    },
    {
      id: "2",
      title: "When to use Doctor For You",
      content:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. In In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at",
      selected: false,
    },
    {
      id: "3",
      title: "Our Mission",
      content:
        "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. In In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at",
      selected: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<FAQItem | null>(null);
  const [form] = Form.useForm();

  const handleAddContent = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (item: FAQItem) => {
    setEditingItem(item);
    form.setFieldsValue({
      title: item.title,
      content: item.content,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (item: FAQItem) => {
    setDeletingItem(item);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (deletingItem) {
      setFaqItems(faqItems.filter((item) => item.id !== deletingItem.id));
      toast.success("FAQ item deleted successfully");
      setIsDeleteModalVisible(false);
      setDeletingItem(null);
    }
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        // Edit existing item
        setFaqItems(
          faqItems.map((item) =>
            item.id === editingItem.id
              ? { ...item, title: values.title, content: values.content }
              : item
          )
        );
        toast.success("FAQ item updated successfully");
      } else {
        // Add new item
        const newItem: FAQItem = {
          id: Date.now().toString(),
          title: values.title,
          content: values.content,
          selected: false,
        };
        setFaqItems([...faqItems, newItem]);
        toast.success("FAQ item added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFaqItems(
      faqItems.map((item) =>
        item.id === id ? { ...item, selected: checked } : item
      )
    );
  };

  const renderFAQItem = (item: FAQItem) => (
    <div key={item.id} style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          border: "1px solid #e9ecef",
          borderRadius: 8,
          padding: 16,
        }}
      >
        <Checkbox
          checked={item.selected}
          onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
          style={{ marginRight: 12, marginTop: 15 }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: 12,
              gap: 20,
            }}
          >
            <div className="w-full">
              <Title
                className="w-full shadow-md rounded-xl py-2 px-4"
                level={5}
                style={{
                  margin: 0,
                  color: "#666",
                  marginBottom: 9,
                  backgroundColor: "#F9F9F9",
                }}
              >
                {item.title}
              </Title>
              <Paragraph
                className="w-full shadow-md rounded-xl py-2 px-4"
                style={{
                  margin: 0,
                  color: "#888",
                  fontSize: 14,
                  lineHeight: 1.6,
                  backgroundColor: "#F9F9F9",
                }}
              >
                {item.content}
              </Paragraph>
            </div>
            <Space direction="vertical" size={4}>
              <Tooltip title="Edit">
                <Button
                  type="text"
                  icon={<BsPencilSquare size={20} />}
                  size="large"
                  onClick={() => handleEdit(item)}
                  style={{ color: "#58553A" }}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="text"
                  icon={<FaRegTrashAlt size={20} />}
                  size="large"
                  onClick={() => handleDelete(item)}
                  style={{ color: "#58553A" }}
                />
              </Tooltip>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Content style={{ padding: "16px", paddingBottom: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleAddContent}
            type="primary"
            icon={<PlusOutlined />}
            style={{
              background: "#188A50",
              borderColor: "#188A50",
              borderRadius: "10px",
              padding: "20px 20px",
              fontWeight: "400",
              fontSize: "16px",
            }}
          >
            Add FAQ
          </Button>
        </div>
        <div
          style={{
            height: "70vh",
            overflowY: "auto",
            paddingBottom: "24px",
            marginTop: 10,
          }}
        >
          {faqItems.map(renderFAQItem)}
        </div>

        {/* Custom Add/Edit Modal */}
        <Modal
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={537}
          closeIcon={<span style={{ fontSize: "20px", color: "#999" }}>×</span>}
          styles={{
            header: { borderBottom: "none", paddingBottom: 0 },
            body: { paddingTop: 0 },
          }}
        >
          <div style={{ padding: "0 8px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "24px",
                color: "#333",
                // borderBottom: "1px solid #e8e8e8",
              }}
            >
              Add/Edit FAQ
            </h3>
            <Divider
              style={{
                height: "1.5px",
                backgroundColor: "#e8e8e8",
              }}
            />

            <Form form={form} layout="vertical">
              <Form.Item
                name="title"
                label={
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    Question
                  </span>
                }
                rules={[{ required: true, message: "Please enter a title" }]}
                style={{ marginBottom: "20px" }}
              >
                <Input
                  placeholder="Our Story"
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #d9d9d9",
                    fontSize: "14px",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="content"
                label={
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    Answer
                  </span>
                }
                rules={[{ required: true, message: "Please enter content" }]}
                style={{ marginBottom: "32px" }}
              >
                <TextArea
                  rows={10}
                  placeholder="Where your health is concerned, we believe you have the right to decide what to do with your body. That is why we offer you the opportunity to consult a licensed and registered EU"
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #d9d9d9",
                    fontSize: "14px",
                    resize: "none",
                  }}
                />
              </Form.Item>
            </Form>

            <Button
              type="primary"
              onClick={handleModalOk}
              block
              style={{
                backgroundColor: "#1BA0D9",
                borderColor: "#1BA0D9",
                borderRadius: "16px",
                padding: "12px",
                height: "48px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Save & Change
            </Button>
          </div>
        </Modal>

        {/* Custom Delete Confirmation Modal */}
        <Modal
          open={isDeleteModalVisible}
          onCancel={() => {
            setIsDeleteModalVisible(false);
            setDeletingItem(null);
          }}
          footer={null}
          width={350}
          centered
          closeIcon={<span style={{ fontSize: "20px", color: "#999" }}>×</span>}
        >
          <div style={{ textAlign: "center", padding: "20px 16px" }}>
            <h3
              style={{
                color: "#ff4d4f",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Are you sure !
            </h3>
            <p
              style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}
            >
              Do you want to Delete a FAQ item
            </p>
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <Button
                onClick={() => {
                  setIsDeleteModalVisible(false);
                  setDeletingItem(null);
                }}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#52c41a",
                  color: "#52c41a",
                  borderRadius: "6px",
                  padding: "6px 20px",
                  height: "auto",
                  fontSize: "14px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                style={{
                  backgroundColor: "#ff4d4f",
                  borderColor: "#ff4d4f",
                  color: "#fff",
                  borderRadius: "6px",
                  padding: "6px 20px",
                  height: "auto",
                  fontSize: "14px",
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
}
