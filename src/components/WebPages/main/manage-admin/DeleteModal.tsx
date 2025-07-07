import React from "react";
import { Button, Modal } from "antd";

export default function DeleteModal({
  deleteModalVisible,
  setDeleteModalVisible,
  setCurrentAdmin,
  confirmDelete,
}: {
  deleteModalVisible: boolean;
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentAdmin: React.Dispatch<React.SetStateAction<any>>;
  confirmDelete: any;
}) {
  return (
    <Modal
      open={deleteModalVisible}
      onCancel={() => {
        setDeleteModalVisible(false);
        setCurrentAdmin(null);
      }}
      footer={null}
      width={400}
      centered
    >
      <div style={{ textAlign: "center", padding: "24px" }}>
        <h3
          style={{
            color: "#F90B0F",
            fontSize: "16px",
            marginBottom: "16px",
            fontWeight: "600",
          }}
        >
          Are you sure !
        </h3>
        <p
          className="leading-6"
          style={{ color: "#606060", fontSize: "16px", marginBottom: "8px" }}
        >
          Do you want to delete your admin ?
        </p>
        <p style={{ color: "#606060", fontSize: "12px", marginBottom: "32px" }}>
          Only Super admin can delete this item.
        </p>
        <Button
          type="primary"
          onClick={confirmDelete}
          style={{
            backgroundColor: "#1BA0D9",
            borderColor: "#1890ff",
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
