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
import FaqModal from "./FaqModal";
import DeleteModal from "./DeleteModal";
import {
  useAddFaqMutation,
  useGetFaqPageQuery,
  useUpdateFaqMutation,
} from "@/redux/feature/settings-pages/settingsPagesApi";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  selected?: boolean;
}

export default function FAQDashboard() {
  // GET FAQ
  const { data: faqData, refetch } = useGetFaqPageQuery(null);
  // add faq
  const [addFaq] = useAddFaqMutation();
  //update faq
  const [updateFaq] = useUpdateFaqMutation();

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
      question: item.question,
      answer: item.answer,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (item: FAQItem) => {
    setDeletingItem(item);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (deletingItem) {
      toast.success("FAQ item deleted successfully");
      setIsDeleteModalVisible(false);
      setDeletingItem(null);
    }
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        // Edit existing item
        console.log(editingItem);
        const updateItem = {
          question: values.question,
          answer: values.answer,
        };
        toast.promise(
          updateFaq({ id: editingItem._id, data: updateItem }).unwrap(),
          {
            loading: "Updating FAQ item...",
            success: (res) => {
              refetch();
              form.resetFields();
              setIsModalVisible(false);
              setEditingItem(null);
              return <b>{res.message}</b>;
            },
            error: (err) =>
              `Error: ${err?.data?.message || "Something went wrong"}`,
          }
        );
      } else {
        // Add new item
        const newItem: FAQItem = {
          question: values.question,
          answer: values.answer,
        };
        toast.promise(addFaq({ data: newItem }).unwrap(), {
          loading: "Adding FAQ item...",
          success: (res) => {
            refetch();
            form.resetFields();
            setIsModalVisible(false);
            return <b>{res.message}</b>;
          },
          error: (err) =>
            `Error: ${err?.data?.message || "Something went wrong"}`,
        });
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    // setFaqItems(
    //   faqItems.map((item) =>
    //     item.id === id ? { ...item, selected: checked } : item
    //   )
    // );
  };

  const renderFAQItem = (item: any) => (
    <div key={item._id} style={{ marginBottom: 16 }}>
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
          onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
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
                {item.question}
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
                {item.answer}
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
          {faqData?.data?.map(renderFAQItem)}
        </div>

        {/* Custom Add/Edit Modal */}
        <FaqModal
          isModalVisible={isModalVisible}
          handleModalCancel={handleModalCancel}
          handleModalOk={handleModalOk}
          form={form}
          editingItem={editingItem}
        />
        {/* Custom Delete Confirmation Modal */}
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          setIsDeleteModalVisible={setIsDeleteModalVisible}
          setDeletingItem={setDeletingItem}
          title={"FAQ"}
          confirmDelete={confirmDelete}
        />
      </Content>
    </Layout>
  );
}
