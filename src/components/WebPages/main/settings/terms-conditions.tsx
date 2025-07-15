"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Typography, Card, ConfigProvider } from "antd";
import dynamic from "next/dynamic";
import {
  useAddSettingsContentMutation,
  useGetSettingsPageQuery,
} from "@/redux/feature/settings-pages/settingsPagesApi";
import { toast } from "sonner";
// import JoditEditor from "jodit-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function termsConditions() {
  const { data: terms, refetch } = useGetSettingsPageQuery({
    type: "terms",
  });
  const [addSettingsContent] = useAddSettingsContentMutation();
  const [content, setContent] = useState(terms?.data?.content || "");
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
    if (terms?.data?.content) {
      setContent(terms.data.content);
    }
  }, [terms?.data]);

  const handleSaveChanges = () => {
    const newContent = {
      content: content,
      type: "terms",
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
