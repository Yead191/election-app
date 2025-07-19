import React, { useRef } from "react";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { toast } from "sonner";


const FileUploadButton = ({
  refetch,
  uploadExcel,
}: {
  refetch: () => void;
  uploadExcel: any;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = async () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create FormData object
    const formData = new FormData();
    formData.append("doc", file);

    try {
      toast.promise(uploadExcel({ data: formData }).unwrap(), {
        loading: "Uploading...",
        success: (res) => {
          refetch();
          const message =
            (res as { message?: string }).message ?? "Upload successful.";
          return <b>{message}</b>;
        },
        error: (err) => err.message || "Error uploading file.",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
      />
      {/* Your styled button */}
      <Button
        onClick={handleFileUpload}
        icon={<FilePdfOutlined style={{ fontSize: "20px" }} />}
        style={{
          color: "#3A99D9",
          padding: "19px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #E1E3EB, #DDE0EA, #CEE9FF)",
        }}
      ></Button>
    </div>
  );
};

export default FileUploadButton;
