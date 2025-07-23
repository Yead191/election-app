import React from "react";
import { useState } from "react";
import { Card, Row, Col, Button, Table, Typography, Input, Space } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;

interface ScanResultProps {
  handleEditToggle: any;
  handleSaveVotes: () => void;
  selectedStation: any;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  isEditing: any;
  handleVoteChange: any;
  editedVotes: any;
}
interface Poll {
  team: string;
  name: string;
  votes: number;
  _id: string;
}

const CustomModal = ({ isOpen, onClose, children, title }: any) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "800px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: "16px",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            {title}
          </Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ border: "none" }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
export default function ScanResultModal({
  handleEditToggle,
  handleSaveVotes,
  selectedStation,
  handleCloseModal,
  isModalOpen,
  isEditing,
  handleVoteChange,
  editedVotes,
}: ScanResultProps) {
  return (
    <>
      {/* Custom Modal for View Details */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Polling Station Details"
      >
        {selectedStation && (
          <div>
            {/* Action Buttons */}
            <div style={{ marginBottom: "20px", textAlign: "right" }}>
              {isEditing ? (
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSaveVotes}
                    style={{ backgroundColor: "#18953D" }}
                  >
                    Save Changes
                  </Button>
                  <Button icon={<CloseOutlined />} onClick={handleEditToggle}>
                    Cancel
                  </Button>
                </Space>
              ) : (
                <Button
                  type="primary"
                  icon={<EditOutlined  />}
                  onClick={handleEditToggle}
                  style={{ backgroundColor: "#1ba0d9" }}
                >
                  Edit Votes
                </Button>
              )}
            </div>

            {/* Station Information */}
            <Card title="Station Information" style={{ marginBottom: "20px" }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Agent Name: </Text>
                  <Text>{selectedStation.agent?.name}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Postal Code: </Text>
                  <Text>{selectedStation.agent?.postalCode}</Text>
                </Col>
                <Col span={12} style={{ marginTop: "10px" }}>
                  <Text strong>Station Address: </Text>
                  <Text>{selectedStation.station?.name}</Text>
                </Col>
                <Col span={12} style={{ marginTop: "10px" }}>
                  <Text strong>Status: </Text>
                  <Text style={{ textTransform: "capitalize" }}>
                    {selectedStation.status}
                  </Text>
                </Col>
              </Row>
            </Card>

            {/* Vote Information */}
            <Card title="Vote Counts">
              <div style={{ marginBottom: "20px" }}>
                {selectedStation?.polls?.map((poll: Poll, index: number) => (
                  <Row
                    key={poll._id}
                    gutter={16}
                    style={{
                      padding: "12px",
                      border: "1px solid #f0f0f0",
                      borderRadius: "6px",
                      marginBottom: "8px",
                      backgroundColor: "#fafafa",
                    }}
                    align="middle"
                  >
                    <Col span={8}>
                      <Text strong>{poll.name}</Text>
                      <br />
                      {/* <Text type="secondary" style={{ fontSize: "12px" }}>
                        Team ID: {poll?._id}
                      </Text> */}
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editedVotes[poll._id]}
                          onChange={(e) =>
                            handleVoteChange(poll._id, e.target.value)
                          }
                          style={{ width: "100px" }}
                          min={0}
                        />
                      ) : (
                        <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                          {poll.votes.toLocaleString()}
                        </Text>
                      )}
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <Text type="secondary">votes</Text>
                    </Col>
                  </Row>
                ))}
              </div>

              {/* Total Votes */}
              <Row
                style={{
                  padding: "16px",
                  backgroundColor: "#e6f7ff",
                  borderRadius: "6px",
                  border: "1px solid #91d5ff",
                }}
              >
                <Col span={12}>
                  <Text strong style={{ fontSize: "16px" }}>
                    Total Votes:
                  </Text>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
                    {isEditing
                      ? (Object.values(editedVotes) as number[])
                          .reduce(
                            (sum: number, votes: number) => sum + votes,
                            0
                          )
                          .toLocaleString()
                      : selectedStation.polls
                          .reduce(
                            (sum: number, poll: any) => sum + poll.votes,
                            0
                          )
                          .toLocaleString()}
                  </Text>
                </Col>
              </Row>
            </Card>

            {/* Timestamps */}
            <Card title="Timestamps" style={{ marginTop: "20px" }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Created: </Text>
                  <Text>
                    {new Date(selectedStation.createdAt).toLocaleString()}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong>Updated: </Text>
                  <Text>
                    {new Date(selectedStation.updatedAt).toLocaleString()}
                  </Text>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </CustomModal>
    </>
  );
}
