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

const mockElectionAreas = [
  {
    key: "1",
    sNo: "16",
    votingStaCode: "CM010101001001139",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "Vina",
    elecCommune: "NGAOUNDAL",
    electionCity: "CENTRE D'INSTRUCTION C",
    stationName: "CENTRE D'INSTRUCTION C",
  },
  {
    key: "2",
    sNo: "15",
    votingStaCode: "CM010101001002132",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "Vina",
    elecCommune: "NGAOUNDAL",
    electionCity: "CENTRE D'INSTRUCTION C",
    stationName: "CENTRE D'INSTRUCTION C",
  },
  {
    key: "3",
    sNo: "14",
    votingStaCode: "CM010101001003165",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "Vina",
    elecCommune: "NGAOUNDAL",
    electionCity: "ECOLE DES PARENTS NGAO",
    stationName: "CENTRE D'INSTRUCTION C",
  },
  {
    key: "4",
    sNo: "13",
    votingStaCode: "CM010101001004113",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "Vina",
    elecCommune: "MAYO-BALEO",
    electionCity: "ECOLE FRANCO-ARABE NG",
    stationName: "CENTRE D'INSTRUCTION C",
  },
  {
    key: "5",
    sNo: "12",
    votingStaCode: "CM010101002005276",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "Vina",
    elecCommune: "MAYO-BALEO",
    electionCity: "CES DANFILI",
    stationName: "CES DANFILI /A",
  },
  {
    key: "6",
    sNo: "11",
    votingStaCode: "CM010101002006275",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "Vina",
    elecCommune: "MAYO-BALEO",
    electionCity: "CES DANFILI",
    stationName: "CES DANFILI /B",
  },
  {
    key: "7",
    sNo: "10",
    votingStaCode: "CM010101003007379",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "GALIM-TIGNERE",
    elecCommune: "TIBATI",
    electionCity: "E PRIVEE MATERNELLE BIL M",
    stationName: "E PRIVEE MATERNELLE BIL",
  },
  {
    key: "8",
    sNo: "9",
    votingStaCode: "CM010101003008329",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "GALIM-TIGNERE",
    elecCommune: "TIBATI",
    electionCity: "E PRIVEE MATERNELLE BIL M",
    stationName: "E PRIVEE MATERNELLE BIL",
  },
  {
    key: "9",
    sNo: "8",
    votingStaCode: "CM010101003009159",
    country: "CAMEROUN",
    region: "ADAMAOUA",
    department: "GALIM-TIGNERE",
    elecCommune: "TIBATI",
    electionCity: "E.P DE MBARNANG CAMPA",
    stationName: "ECOLE DES PARENTS DE K",
  },
  {
    key: "10",
    sNo: "7",
    votingStaCode: "CM020101001001000",
    country: "CAMEROUN",
    region: "CENTRE",
    department: "HAUTE-SANAGA",
    elecCommune: "TIBATI",
    electionCity: "E.P DE MBARNANG CAMPA",
    stationName: "ECOLE DES PARENTS DE M",
  },
];

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
      width: 150,
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
          scroll={{ x: 1200 }}
        />
      </div>

      {/* Edit/Add Modal */}
      <Modal
        title={
          <span className="text-xl font-semibold">
            {!isAddMode ? "Edit Area" : "Add Area"}
          </span>
        }
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setCurrentArea(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
        closeIcon={<span style={{ fontSize: "24px", color: "#999" }}>×</span>}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          style={{ marginTop: "24px" }}
        >
          <Form.Item
            label="Post Code"
            name="postCode"
            rules={[{ required: true, message: "Please input post code!" }]}
          >
            <Input
              placeholder="2472"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input
              placeholder="Tiki"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Pooling Address"
            name="poolingAddress"
            rules={[
              { required: true, message: "Please input pooling address!" },
            ]}
          >
            <Input
              placeholder="3891 Ranchview Dr. Richardson"
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#1BA0D9",
              borderColor: "#1BA0D9",
              borderRadius: "8px",
              padding: "12px",
              height: "48px",
              fontSize: "16px",
              marginTop: "24px",
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setCurrentArea(null);
        }}
        footer={null}
        width={400}
        centered
      >
        <div style={{ textAlign: "center", padding: "24px" }}>
          <h3
            style={{ color: "#ff4d4f", fontSize: "18px", marginBottom: "16px" }}
          >
            Are you sure !
          </h3>
          <p style={{ color: "#666", fontSize: "16px", marginBottom: "8px" }}>
            Do you want to delete this area ?
          </p>
          <p style={{ color: "#999", fontSize: "14px", marginBottom: "32px" }}>
            Only Super admin can delete this item.
          </p>
          <Button
            type="primary"
            onClick={confirmDelete}
            style={{
              backgroundColor: "#1BA0D9",
              borderColor: "#1BA0D9",
              borderRadius: "8px",
              padding: "8px 24px",
              height: "auto",
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}
