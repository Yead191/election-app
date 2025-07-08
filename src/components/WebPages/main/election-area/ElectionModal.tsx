import { Button, Input, Modal, Form } from "antd";

interface ElectionModalProps {
  isAddMode: boolean;
  editModalVisible: boolean;
  setEditModalVisible: (visible: boolean) => void;
  setCurrentArea: (area: any) => void;
  form: any;
  handleFormSubmit: (values: any) => void;
  //   currentArea: any;
}
export default function ElectionModal({
  isAddMode,
  editModalVisible,
  setEditModalVisible,
  setCurrentArea,
  form,
  handleFormSubmit,
}: ElectionModalProps) {
  return (
    <Modal
      title={
        <span className="text-xl font-semibold">
          {!isAddMode ? "Edit Area" : "Add Area"}
        </span>
      }
      open={editModalVisible}
      onCancel={() => {
        setEditModalVisible(false);
        setCurrentArea(null);
        form.resetFields();
      }}
      footer={null}
      width={600}
      closeIcon={<span style={{ fontSize: "24px", color: "#999" }}>×</span>}
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{ marginTop: "24px" }}
      >
        <Form.Item
          label="Post Code"
          name="postCode"
          rules={[{ required: true, message: "Please input post code!" }]}
        >
          <Input
            placeholder="2472"
            style={{ padding: "12px", borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input
            placeholder="Tiki"
            style={{ padding: "12px", borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item
          label="Pooling Address"
          name="poolingAddress"
          rules={[{ required: true, message: "Please input pooling address!" }]}
        >
          <Input
            placeholder="3891 Ranchview Dr. Richardson"
            style={{ padding: "12px", borderRadius: "8px" }}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            backgroundColor: "#1BA0D9",
            borderColor: "#1BA0D9",
            borderRadius: "8px",
            padding: "12px",
            height: "48px",
            fontSize: "16px",
            marginTop: "24px",
          }}
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
}
