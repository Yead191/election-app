import React from "react";
import { Input, Avatar, Checkbox, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { imgUrl } from "@/app/(dashboard)/layout";

interface Contact {
  selectedContacts: string[];
  handleContactSelect: (contactId: number, checked: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  isIndeterminate: boolean;
  filteredContacts: any[];
  handleSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
}

export default function ContactList({
  selectedContacts,
  handleContactSelect,
  searchText,
  setSearchText,
  isIndeterminate,
  filteredContacts,
  handleSelectAll,
  isAllSelected,
}: Contact) {
  return (
    <div
      className="col-span-3 h-full"
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #A1A1A1",
          padding: "8px 15px 18px 15px",
        }}
        className="flex items-center justify-between gap-2 pb-4"
      >
        {/* Search Input */}
        <Input
          placeholder="Search People"
          prefix={<SearchOutlined style={{ color: "#188A50", fontSize: 20 }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            height: "44px",
            borderRadius: "16px",
            boxShadow: "0px 1px 3px #00000026",
            border: "none",
          }}
        />

        {/* Select All Checkbox */}
        <ConfigProvider
          theme={{
            components: {
              Checkbox: {
                controlInteractiveSize: 20,
              },
            },
          }}
        >
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isAllSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            style={{ fontWeight: 500, color: "#5C5C5C", width: 20 }}
          ></Checkbox>
        </ConfigProvider>
      </div>

      {/* Contacts List */}
      <div
        style={{
          height: 460,
          overflowY: "scroll",
          padding: "8px 7px 18px 15px",
        }}
      >
        {filteredContacts?.map((contact) => (
          <div
            key={contact._id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f5f5f5",
            }}
            className="notification-contact-row "
          >
            <Avatar
              src={imgUrl + contact.image}
              size={40}
              style={{ marginRight: "12px" }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#262626",
                  marginBottom: "2px",
                }}
              >
                {contact.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: contact.status === "active" ? "#66BFE6" : "#FF0000",
                  fontWeight: 500,
                }}
              >
                {contact.status === "active" ? "Active" : "Locked"}
              </div>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Checkbox: {
                    controlInteractiveSize: 20,
                  },
                },
              }}
            >
              <Checkbox
                checked={selectedContacts.includes(contact._id)}
                onChange={(e) =>
                  handleContactSelect(contact._id, e.target.checked)
                }
                style={{ width: 20, height: 20 }}
              />
            </ConfigProvider>
          </div>
        ))}
      </div>
    </div>
  );
}
