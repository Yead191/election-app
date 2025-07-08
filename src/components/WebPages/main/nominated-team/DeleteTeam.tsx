import React from "react";
import { Button, Modal } from "antd";
export default function DeleteTeam({
  deleteModalVisible,
  setDeleteModalVisible,
  setCurrentTeam,
  confirmDelete,
}: {
  deleteModalVisible: boolean;
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTeam: React.Dispatch<React.SetStateAction<any>>;
  confirmDelete: () => void;
}) {
  return (
    <Modal
      open={deleteModalVisible}
      onCancel={() => {
        setDeleteModalVisible(false);
        setCurrentTeam(null);
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
          Do you want to delete this team ?
        </p>
        <p style={{ color: "#606060", fontSize: "12px", marginBottom: "32px" }}>
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
