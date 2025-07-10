"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  message,
  Pagination,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { mockElectionAreas } from "@/data/mockElectionAreas";
import ElectionModal from "./ElectionModal";
import DeleteElectionModal from "./DeleteElectionModal";

export default function ElectionAreaPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [electionAreas, setElectionAreas] = useState(mockElectionAreas);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentArea, setCurrentArea] = useState<any>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [form] = Form.useForm();

  const filteredAreas = electionAreas.filter(
    (area) =>
      area.votingStaCode.toLowerCase().includes(searchText.toLowerCase()) ||
      area.country.toLowerCase().includes(searchText.toLowerCase()) ||
      area.region.toLowerCase().includes(searchText.toLowerCase()) ||
      area.department.toLowerCase().includes(searchText.toLowerCase()) ||
      area.elecCommune.toLowerCase().includes(searchText.toLowerCase()) ||
      area.electionCity.toLowerCase().includes(searchText.toLowerCase()) ||
      area.stationName.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginatedAreas = filteredAreas.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(paginatedAreas.map((area) => area.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleSelectRow = (key: string, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, key]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter((k) => k !== key));
    }
  };

  const handleEdit = (record: any) => {
    setCurrentArea(record);
    setIsAddMode(false);
    form.setFieldsValue({
      postCode: record.votingStaCode,
      name: record.stationName,
      poolingAddress: record.electionCity,
    });
    setEditModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentArea(null);
    setIsAddMode(true);
    form.resetFields();
    setEditModalVisible(true);
  };

  const handleDelete = (record: any) => {
    setCurrentArea(record);
    setDeleteModalVisible(true);
    // toast.success("Election area deleted successfully");
  };

  const confirmDelete = () => {
    setElectionAreas(
      electionAreas.filter((area) => area.key !== currentArea.key)
    );
    setDeleteModalVisible(false);
    setCurrentArea(null);
    toast.success("Election area deleted successfully");
  };

  const handleFormSubmit = (values: any) => {
    if (isAddMode) {
      const newArea = {
        key: Date.now().toString(),
        sNo: (electionAreas.length + 1).toString(),
        votingStaCode: values.postCode,
        country: "CAMEROUN",
        region: "NEW REGION",
        department: "NEW DEPARTMENT",
        elecCommune: "NEW COMMUNE",
        electionCity: values.poolingAddress,
        stationName: values.name,
      };
      setElectionAreas([...electionAreas, newArea]);
      message.success("Election area added successfully");
      toast.success("Election area added successfully");
    } else {
      setElectionAreas(
        electionAreas.map((area) =>
          area.key === currentArea.key
            ? {
                ...area,
                votingStaCode: values.postCode,
                stationName: values.name,
                electionCity: values.poolingAddress,
              }
            : area
        )
      );
      toast.success("Election area updated successfully");
    }
    setEditModalVisible(false);
    setCurrentArea(null);
    form.resetFields();
  };

  const isAllSelected =
    paginatedAreas.length > 0 &&
    selectedRowKeys.length === paginatedAreas.length;
  const isIndeterminate =
    selectedRowKeys.length > 0 &&
    selectedRowKeys.length < paginatedAreas.length;

  const columns = [
    {
      title: (
        <input
          type="checkbox"
          checked={isAllSelected}
          ref={(input) => {
            if (input) input.indeterminate = isIndeterminate;
          }}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      dataIndex: "select",
      width: 50,
      render: (_: any, record: any) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => handleSelectRow(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "S.No",
      dataIndex: "sNo",
      key: "sNo",
      width: 60,
    },
    {
      title: "Voting Sta. Code",
      dataIndex: "votingStaCode",
      key: "votingStaCode",
      width: 70,
      render: (_: any, record: any) => (
        <span style={{ fontSize: "10px" }}>{record.votingStaCode}</span>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 100,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 120,
    },
    {
      title: "Elec. Commune",
      dataIndex: "elecCommune",
      key: "elecCommune",
      width: 120,
    },
    {
      title: "Election City",
      dataIndex: "electionCity",
      key: "electionCity",
      width: 180,
    },
    {
      title: "Station Name",
      dataIndex: "stationName",
      key: "stationName",
      width: 180,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "right" as const,
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px", justifyContent: "end" }}>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<BsPencilSquare />}
              onClick={() => handleEdit(record)}
              style={{ color: "#999999", fontSize: 20 }}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<FaRegTrashAlt />}
              onClick={() => handleDelete(record)}
              style={{ color: "#999999", fontSize: 20 }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "16px 24px",
        borderRadius: "8px",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div></div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Input
            className="shadow-sm"
            placeholder="Search here"
            allowClear
            style={{
              width: 350,
              padding: "6px 12px 6px 6px",
              borderRadius: "30px",
            }}
            prefix={
              <SearchOutlined
                style={{
                  fontSize: "16px",
                  borderRadius: "50%",
                  padding: "6px",
                  backgroundColor: "#B7DBC9",
                }}
              />
            }
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              backgroundColor: "#188A50",
              borderColor: "#18953D",
              borderRadius: "8px",
              padding: "8px 16px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            Add Area
          </Button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Table
          columns={columns}
          dataSource={paginatedAreas}
          pagination={{}}
          size="middle"
          style={{ backgroundColor: "white" }}
          // scroll={{ x: 400 }}
        />
      </div>

      {/* Edit/Add Modal */}
      <ElectionModal
        isAddMode={isAddMode}
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        setCurrentArea={setCurrentArea}
        form={form}
        handleFormSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteElectionModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        setCurrentArea={setCurrentArea}
        confirmDelete={confirmDelete}
      />
    </div>
  );
}
