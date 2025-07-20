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
  FilePdfOutlined,
} from "@ant-design/icons";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { mockElectionAreas } from "@/data/mockElectionAreas";
import ElectionModal from "./ElectionModal";
import DeleteElectionModal from "./DeleteElectionModal";
import {
  useDeleteElectionAreaMutation,
  useGetElectionAreaQuery,
  useUploadExcelMutation,
} from "@/redux/feature/election-area api/election-area-api";
import { count } from "console";
import FileUploadButton from "./FileUploadComponent";

export default function ElectionAreaPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [electionAreas, setElectionAreas] = useState(mockElectionAreas);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentArea, setCurrentArea] = useState<any>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [uploadExcel] = useUploadExcelMutation();

  // handle Apis
  const { data: areasData, refetch } = useGetElectionAreaQuery({
    searchTerm: searchText, page ,limit:10
  });  
  const paginationData = areasData?.pagination;
  // console.log(areasData?.data , "dsfds");
  const [deleteElectionArea] = useDeleteElectionAreaMutation();

  const handleEdit = (record: any) => {
    setCurrentArea(record);
    setIsAddMode(false);
    form.setFieldsValue({
      postCode: record.postCode,
      name: record.name,
      stationCode: record.stationCode,
      country: record.country,
      region: record.region,
      department: record.department,
      city: record.city,
      commune: record.commune,
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
    setCurrentArea(record._id);
    setDeleteModalVisible(true);
    // toast.success("Election area deleted successfully");
  };

  const confirmDelete = () => {
    toast.promise(deleteElectionArea({ id: currentArea }).unwrap(), {
      loading: "Deleting election area...",
      success: (res) => {
        refetch();
        setDeleteModalVisible(false);
        setCurrentArea(null);
        return <b>{res.message}</b>;
      },
      error: (err) => `Error: ${err?.data?.message || "Something went wrong"}`,
    });
    setDeleteModalVisible(false);
    setCurrentArea(null);
  };

  const columns = [
    {
      title: "Id. no.",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="text-sm">{text.slice(0, 8)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Voting Sta. Code",
      dataIndex: "stationCode",
      key: "stationCode",

      render: (_: any, record: any) => (
        <span style={{}}>{record.stationCode}</span>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Elec. Commune",
      dataIndex: "commune",
      key: "commune",
    },
    {
      title: "Election City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Station Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",

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
          <FileUploadButton uploadExcel={uploadExcel} refetch={refetch} />
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
          dataSource={areasData?.data || []}
          pagination={{
            total:paginationData?.total, 
            pageSize:paginationData?.limit, 
            current:paginationData?.page, 
            onChange:(page)=>setPage(page)
          }}
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
        currentArea={currentArea}
        refetch={refetch}
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
