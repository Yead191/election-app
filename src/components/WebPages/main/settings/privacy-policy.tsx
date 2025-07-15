"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Typography, Card, ConfigProvider } from "antd";
import dynamic from "next/dynamic";
// import JoditEditor from "jodit-react";

import { toast } from "sonner";
import { PlusOutlined } from "@ant-design/icons";
import {
  useAddSettingsContentMutation,
  useGetSettingsPageQuery,
} from "@/redux/feature/settings-pages/settingsPagesApi";
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
  const { data: privacyPolicy, refetch } = useGetSettingsPageQuery({
    type: "privacy",
  });
  const [addSettingsContent] = useAddSettingsContentMutation();
  const [content, setContent] = useState(privacyPolicy?.data?.content || "");
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
  useEffect(() => {
    if (privacyPolicy?.data?.content) {
      setContent(privacyPolicy.data.content);
    }
  }, [privacyPolicy?.data]);

  const handleSaveChanges = () => {
    const newContent = {
      content: content,
      type: "privacy",
    };
    toast.promise(addSettingsContent({ data: newContent }).unwrap(), {
      loading: "Saving changes...",
      success: (res) => {
        refetch();
        return <b>{res.message}</b>;
      },
      error: (err: any) => `Error: ${err.message || "Something went wrong"}`,
    });
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
              onClick={handleSaveChanges}
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
