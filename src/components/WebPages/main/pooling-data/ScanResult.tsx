"use client";

import { useState } from "react";
import { Card, Row, Col, Button, Table, Typography, Input, Space } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import {
  usePublishDocumentMutation,
  useUpdatePollingDataMutation,
} from "@/redux/feature/polling-data/PollingDataApi";
import ScanResultModal from "./ScanResultModal";

const { Title, Text } = Typography;

interface ScanResultProps {
  allPollingStations: any;
  isScanned: boolean;
  setIsScanned: (value: boolean) => void;
  scanId: any;
  refetch: () => void;
}

interface Poll {
  team: string;
  name: string;
  votes: number;
  _id: string;
}

interface PollingStation {
  _id: string;
  station: any;
  agent: any;
  document: string;
  image: string;
  status: string;
  polls: Poll[];
  createdAt: string;
  updatedAt: string;
}

// Custom Modal Component

// Function to generate dynamic columns based on data
const generateColumns = (
  data: any,
  handleViewDetails: (record: any) => void
) => {
  // Base columns for static fields
  const baseColumns = [
    {
      title: "Postal Code",
      dataIndex: "postCode",
      key: "postCode",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Polling Address",
      dataIndex: "address",
      key: "address",
      width: 150,
    },
    {
      title: "Sending Time",
      dataIndex: "sendingTime",
      key: "sendingTime",
      width: 120,
    },
  ];

  // Get unique team names from polls
  const teamNames =
    (data && data[0]?.polls?.map((poll: any) => poll.name)) || [];

  // Create dynamic columns for each team
  const teamColumns = teamNames?.map((team: any) => ({
    title: team,
    dataIndex: team,
    key: team,
    align: "center",
    render: (value: any, record: any) => {
      // Find the highest vote for this row
      const maxVotes = Math.max(...teamNames.map((t: any) => record[t] || 0));
      return (
        <Text
          style={{
            color: value === maxVotes ? "#22c55e" : "inherit",
            fontWeight: value === maxVotes ? "bold" : "normal",
          }}
        >
          {value?.toLocaleString()}
        </Text>
      );
    },
  }));

  // Add Actions column
  const actionsColumn = {
    title: "Actions",
    key: "actions",
    width: 100,
    render: (text: any, record: any) => (
      <Button
        type="text"
        size="small"
        icon={<InfoCircleOutlined style={{ color: "#1677ff", fontSize: 20 }} />}
        onClick={() => handleViewDetails(record)}
      />
    ),
  };

  return [...baseColumns, ...teamColumns, actionsColumn];
};

// Transform data to match table structure
const transformData = (data: any) => {
  return data?.map((item: any) => ({
    key: item._id,
    postCode: item.agent.postalCode,
    name: item.agent.name,
    address: item.station.name,
    sendingTime: new Date(item.createdAt).toLocaleString(),
    rawData: item,
    ...item.polls.reduce(
      (acc: any, poll: any) => ({
        ...acc,
        [poll.name]: poll.votes,
      }),
      {}
    ),
  }));
};

export default function ScanResult({
  allPollingStations,
  isScanned,
  setIsScanned,
  scanId,
  refetch,
}: ScanResultProps) {
  const [selectedStation, setSelectedStation] = useState<PollingStation | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedVotes, setEditedVotes] = useState<{ [key: string]: number }>({});

  // console.log("stations", allPollingStations);
  // publish document
  const [publishDocument] = usePublishDocumentMutation();
  // update scan document
  const [updatePollingData] = useUpdatePollingDataMutation();

  const handlePublish = () => {
    // console.log(scanId);
    toast.promise(publishDocument({ id: scanId }).unwrap(), {
      loading: "Publishing...",
      success: (res) => {
        refetch();
        // console.log(res);
        toast.success("Published Successfully");
        return <b>{res.message}</b>;
      },
      error: (error) => {
        return error.data.message;
      },
    });
  };

  const handleViewDetails = (record: any) => {
    setSelectedStation(record.rawData);
    setIsModalOpen(true);
    setIsEditing(false);

    // Initialize edited votes with current values
    const initialVotes: { [key: string]: number } = {};
    record.rawData.polls.forEach((poll: Poll) => {
      initialVotes[poll._id] = poll.votes;
    });
    setEditedVotes(initialVotes);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStation(null);
    setIsEditing(false);
    setEditedVotes({});
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset edited votes when canceling edit
      const initialVotes: { [key: string]: number } = {};
      selectedStation?.polls.forEach((poll: Poll) => {
        initialVotes[poll._id] = poll.votes;
      });
      setEditedVotes(initialVotes);
    }
    setIsEditing(!isEditing);
  };

  const handleVoteChange = (pollId: string, value: string) => {
    const numValue = Number.parseInt(value) || 0;
    setEditedVotes((prev) => ({
      ...prev,
      [pollId]: numValue,
    }));
  };

  const handleSaveVotes = () => {
    // Construct the data in the desired format
    const formattedPolls = selectedStation?.polls?.map((poll: Poll) => ({
      team: poll.team,
      name: poll.name,
      votes: editedVotes[poll._id] || poll.votes, // Use edited votes if available, otherwise fallback to original
      _id: poll._id,
    }));

    // Log the formatted data
    // console.log({ polls: formattedPolls });

    toast.promise(
      updatePollingData({
        id: selectedStation?._id,
        data: { polls: formattedPolls },
      }).unwrap(),
      {
        loading: "Saving votes...",
        success: (res: any) => {
          // console.log(res, "result");
          setIsEditing(false);
          refetch();
          setIsModalOpen(false);
          return res.message;
        },
        error: "Failed to save votes",
      }
    );

    // Simulate API call (replace with actual API call later)
    // toast.promise(
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve({ message: "Votes updated successfully" });
    //     }, 1500);
    //   }),
    //   {
    //     loading: "Saving votes...",
    //     success: (res: any) => {
    //       setIsEditing(false);
    //       refetch();
    //       return res.message;
    //     },
    //     error: "Failed to save votes",
    //   }
    // );
  };

  // Generate columns dynamically with handleViewDetails
  const columns = generateColumns(allPollingStations, handleViewDetails);

  // Transform data for table
  const dataSource = transformData(allPollingStations);

  // console.log(selectedStation, "selectedStation");

  return (
    <>
      <Row>
        <Col span={24}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Title
                level={4}
                style={{ margin: 0, fontSize: 24, fontWeight: 500 }}
              >
                Scan Result
              </Title>
              <Button
                onClick={handlePublish}
                type="primary"
                style={{ backgroundColor: "#18953D", borderColor: "#52c41a" }}
              >
                Publish
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={dataSource?.slice(0, 5)}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
      <ScanResultModal
        handleEditToggle={handleEditToggle}
        handleSaveVotes={handleSaveVotes}
        selectedStation={selectedStation}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
        isEditing={isEditing}
        handleVoteChange={handleVoteChange}
        editedVotes={editedVotes}
      />
    </>
  );
}
