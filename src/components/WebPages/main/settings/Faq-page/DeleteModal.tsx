"use client";
import React from "react";

import { Button, Modal } from "antd";

export default function DeleteModal({
  isDeleteModalVisible,
  setIsDeleteModalVisible,
  setDeletingItem,
  title,
  confirmDelete,
}: {
  isDeleteModalVisible: boolean;
  setIsDeleteModalVisible: (value: boolean) => void;
  setDeletingItem: (value: any) => void;
  title: string;
  confirmDelete: () => void;
}) {
  return (
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
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
          Do you want to Delete a {title} item
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
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
  );
}
