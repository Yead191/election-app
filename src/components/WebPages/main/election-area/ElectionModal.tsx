import {
  useCreateElectionAreaMutation,
  useUpdateElectionAreaMutation,
} from "@/redux/feature/election-area api/election-area-api";
import { Button, Input, Modal, Form, message } from "antd";
import { toast } from "sonner";

interface ElectionModalProps {
  isAddMode: boolean;
  editModalVisible: boolean;
  setEditModalVisible: (visible: boolean) => void;
  setCurrentArea: (area: any) => void;
  form: any;
  currentArea: any;
  refetch: () => void;
}

export default function ElectionModal({
  isAddMode,
  editModalVisible,
  setEditModalVisible,
  setCurrentArea,
  form,
  currentArea,
  refetch,
}: ElectionModalProps) {
  const [updateElectionArea] = useUpdateElectionAreaMutation();
  const [createElectionArea] = useCreateElectionAreaMutation();

  const handleFormSubmit = async (values: any) => {
    try {
      const formData = {
        stationCode: values.stationCode || "",
        country: values.country || "",
        region: values.region || "",
        department: values.department || "",
        commune: values.commune || "",
        city: values.city || "",
        name: values.name || "",
      };

      if (isAddMode) {
        toast.promise(createElectionArea(formData).unwrap(), {
          loading: "Adding election area...",
          success: (res) => {
            refetch();
            setEditModalVisible(false);
            setCurrentArea(null);
            form.resetFields();
            return <b>{res.message || "Election area created successfully"}</b>;
          },
          error: (err) =>
            `Error: ${err?.data?.message || "Failed to create election area"}`,
        });
      } else {
        toast.promise(
          updateElectionArea({ id: currentArea._id, data: formData }).unwrap(),
          {
            loading: "Updating election area...",
            success: (res) => {
              refetch();
              setEditModalVisible(false);
              setCurrentArea(null);
              form.resetFields();
              return (
                <b>{res.message || "Election area updated successfully"}</b>
              );
            },
            error: (err) =>
              `Error: ${
                err?.data?.message || "Failed to update election area"
              }`,
          }
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      message.error("Failed to save election area");
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-semibold">
          {isAddMode ? "Add Area" : "Edit Area"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Station Code"
            name="stationCode"
            rules={[{ required: true, message: "Please input station code!" }]}
          >
            <Input
              placeholder="CM100504011020000"
              readOnly={!isAddMode}
              disabled={!isAddMode}
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input country!" }]}
          >
            <Input
              placeholder="CAMEROUN"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: "Please input region!" }]}
          >
            <Input
              placeholder="SUD-OUEST"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please input department!" }]}
          >
            <Input
              placeholder="MEME"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Commune"
            name="commune"
            rules={[{ required: true, message: "Please input commune!" }]}
          >
            <Input
              placeholder="KUMBA III"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input city!" }]}
          >
            <Input
              placeholder="DNPS"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input
              placeholder="DNPS /C"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>
        </div>

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
