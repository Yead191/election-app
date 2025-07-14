"use client";

import { useRef, useState } from "react";
import { Button, Typography, Card, ConfigProvider } from "antd";
import dynamic from "next/dynamic";
// import JoditEditor from "jodit-react";

import { toast } from "sonner";
import { PlusOutlined } from "@ant-design/icons";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const { Title } = Typography;
interface StaffMember {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  status: "active" | "inactive";
}

export default function privacyPolicy() {
  const [content, setContent] = useState("");
  //   console.log(content);
  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    style: {
      height: "58vh",
      background: "white",
    },
  };

  // save content
  const handleSave = () => {
    // Handle saving the content to the database or API
    // console.log("Content saved:", content);
    toast.success("Content saved successfully");
  };
  return (
    <div>
      <div style={{}}>
        <Card
          style={{
            borderRadius: "8px",
            // padding: "16px 24px",
          }}
        >
          <div className="jodit-container">
            <div>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)}
                onChange={() => {}}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              marginBottom: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleSave}
              style={{
                height: 48,
                width: "543px",
                backgroundColor: "#1BA0D9",
                borderRadius: 16,
              }}
              type="primary"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
