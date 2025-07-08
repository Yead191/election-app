import React from "react";
import { Button, Modal } from "antd";

interface DeleteElectionModalProps {
  deleteModalVisible: boolean;
  setDeleteModalVisible: (value: boolean) => void;
  setCurrentArea: (value: any) => void;
  confirmDelete: () => void;
}

export default function DeleteElectionModal({
  deleteModalVisible,
  setDeleteModalVisible,
  setCurrentArea,
  confirmDelete,
}: DeleteElectionModalProps) {
  return (
    <Modal
      open={deleteModalVisible}
      onCancel={() => {
        setDeleteModalVisible(false);
        setCurrentArea(null);
      }}
      footer={null}
      width={400}
      centered
    >
      <div style={{ textAlign: "center", padding: "24px" }}>
        <h3
          style={{ color: "#ff4d4f", fontSize: "18px", marginBottom: "16px" }}
        >
          Are you sure !
        </h3>
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "8px" }}>
          Do you want to delete this area ?
        </p>
        <p style={{ color: "#999", fontSize: "14px", marginBottom: "32px" }}>
          Only Super admin can delete this item.
        </p>
        <Button
          type="primary"
          onClick={confirmDelete}
          style={{
            backgroundColor: "#1BA0D9",
            borderColor: "#1BA0D9",
            borderRadius: "8px",
            padding: "8px 24px",
            height: "auto",
          }}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
