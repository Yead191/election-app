"use client";
import React from "react";
import {
  FileOutlined,
  ArrowLeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { CSSProperties } from "react";
export default function NotFoundEntry() {
  const cardStyle: CSSProperties = {
    width: "100%",
    maxWidth: 400,
    margin: "0 auto",
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: 32,
  };

  const iconContainerStyle: CSSProperties = {
    width: 64,
    height: 64,
    backgroundColor: "#f5f5f5",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  };

  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#fafafa",
      }}
    >
      <Card style={cardStyle}>
        <div style={contentStyle}>
          <div style={iconContainerStyle}>
            <FileOutlined style={{ fontSize: 32, color: "#8c8c8c" }} />
          </div>

          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#1f1f1f",
              marginBottom: 8,
            }}
          >
            Entry Not Found
          </h2>

          <p style={{ color: "#595959", marginBottom: 24, lineHeight: 1.6 }}>
            The pooling entry you're looking for doesn't exist or may have been
            removed.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <Button
              style={{ display: "flex", alignItems: "center", gap: 8 }}
              onClick={() => window.history.back()}
            >
              <ArrowLeftOutlined />
              Go Back
            </Button>

            <Button
              type="primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#1ba0d9",
              }}
              onClick={() => window.location.reload()}
            >
              <ReloadOutlined />
              Try Again
            </Button>
          </div>

          {/* <div style={{ marginTop: 24, fontSize: 12, color: "#8c8c8c" }}>
            Need help?{" "}
            <a
              href="#"
              style={{ color: "#1677ff", textDecoration: "none" }}
              className="hover:underline"
            >
              Contact support
            </a>
          </div> */}
        </div>
      </Card>
    </div>
  );
}
