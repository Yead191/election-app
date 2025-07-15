import React from "react";
import { useState } from "react";
import { Button, Modal, Form, Input, Divider } from "antd";

const { TextArea } = Input;
interface FaqModalProps {
  isModalVisible: boolean;
  handleModalCancel: () => void;
  handleModalOk: (values: any) => void;
  form: any;
  editingItem: any;
}
export default function FaqModal({
  isModalVisible,
  handleModalCancel,
  handleModalOk,
  form,
  editingItem,
}: FaqModalProps) {
  return (
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
          {editingItem ? "Edit FAQ" : "Add FAQ"}
        </h3>
        <Divider
          style={{
            height: "1.5px",
            backgroundColor: "#e8e8e8",
          }}
        />

        <Form form={form} layout="vertical">
          <Form.Item
            name="question"
            label={
              <span style={{ color: "#666", fontSize: "14px" }}>Question</span>
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
            name="answer"
            label={
              <span style={{ color: "#666", fontSize: "14px" }}>Answer</span>
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
  );
}
