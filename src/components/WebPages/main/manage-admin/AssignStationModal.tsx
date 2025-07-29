"use client";

import { Modal, Input, Button, List, Checkbox, Tag } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useAssignStationMutation,
  useGetStationForAdminQuery,
} from "@/redux/feature/admin-api/adminApi";

interface Station {
  id: string;
  name: string;
}

interface AdminData {
  _id: string;
  name: string;
  stations: Station[];
}

interface AssignStationModalProps {
  visible: boolean;
  detailsModalClose: () => void;
  onClose: () => void;
  adminData: AdminData;
  refetch: () => void;
}

export default function AssignStationModal({
  visible,
  onClose,
  adminData,
  refetch,
  detailsModalClose,
}: AssignStationModalProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Get stations API
  const {
    data: stations,
    isLoading: stationsLoading,
    refetch: stationRefetch,
  } = useGetStationForAdminQuery({
    searchTerm: searchText,
  });

  // Assign station API
  const [assignStation] = useAssignStationMutation();

  // Load assigned stations when modal opens
  useEffect(() => {
    if (visible && adminData?.stations) {
      setSelectedStations(adminData.stations.map((station) => station.id));
    }
  }, [visible, adminData]);

  const handleStationToggle = (stationId: string) => {
    console.log(stationId);
    setSelectedStations((prev) =>
      prev.includes(stationId)
        ? prev.filter((id) => id !== stationId)
        : [...prev, stationId]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    const assignedStations = {
      stations: selectedStations,
    };
    try {
      await toast.promise(
        async () => {
          await assignStation({
            id: adminData._id,
            data: assignedStations,
          }).unwrap();
          await Promise.all([stationRefetch(), refetch()]);
        },
        {
          loading: "Assigning Stations...",
          success: () => {
            setLoading(false);
            detailsModalClose();
            onClose();
            return `Successfully assigned ${selectedStations.length} stations to ${adminData.name}`;
          },
          error: (err) => {
            setLoading(false);
            return err.message || "Failed to assign stations";
          },
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error("Failed to assign stations");
    }
  };

  const handleCancel = () => {
    // Reset selectedStations to the IDs of currently assigned stations
    setSelectedStations(
      adminData?.stations?.map((station: Station) => station.id) || []
    );
    setSearchText("");
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <EnvironmentOutlined />
          <span>Assign Stations to {adminData?.name}</span>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={loading}
          onClick={handleSave}
          style={{
            backgroundColor: "#18953D",
            borderColor: "#18953D",
          }}
        >
          Save Assignment
        </Button>,
      ]}
    >
      <div className="space-y-4">
        {/* Search Input */}
        <Input
          placeholder="Search stations by name or location..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />

        {/* Selection Controls */}
        <div className="flex justify-end items-center">
          <Tag color="blue">{selectedStations.length} station(s) selected</Tag>
        </div>

        {/* Station List */}
        <div
          className="border rounded-lg"
          style={{ maxHeight: "400px", overflowY: "auto", padding: "0 10px" }}
        >
          <List
            loading={stationsLoading}
            dataSource={stations?.data || []}
            renderItem={(station: { _id: string; name: string }) => (
              <List.Item
                className="hover:bg-gray-50 cursor-pointer px-4"
                onClick={() => handleStationToggle(station._id)}
              >
                <div className="flex items-center justify-between w-full">
                  <label
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={selectedStations.includes(station._id)}
                      onChange={() => handleStationToggle(station._id)}
                    />
                    <div>
                      <div className="font-medium">{station.name}</div>
                    </div>
                  </label>
                  {adminData?.stations?.some(
                    (s: Station) => s.id === station._id
                  ) && <Tag color="green">Currently Assigned</Tag>}
                </div>
              </List.Item>
            )}
            locale={{
              emptyText: searchText
                ? "No stations found matching your search"
                : "No stations available",
            }}
          />
        </div>

        {/* Selected Stations Summary */}
        {selectedStations.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-blue-800 mb-2">
              Selected Stations ({selectedStations.length}):
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedStations.map((stationId) => {
                const station = stations?.data?.find(
                  (s: { _id: string; name: string }) => s._id === stationId
                );
                return station ? (
                  <Tag
                    key={stationId}
                    closable
                    onClose={() => handleStationToggle(stationId)}
                    color="blue"
                  >
                    {station.name}
                  </Tag>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
