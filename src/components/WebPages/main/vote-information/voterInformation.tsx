"use client";
import React from "react";
import { Form, Input, Button } from "antd";

const VoterPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <div
      style={{ padding: 24, height: "85vh", maxWidth: 581, color: "#636363" }}
    >
      <h2
        style={{
          fontSize: 16,
          fontWeight: 500,
          marginBottom: 8,
        }}
        className="leading-5"
      >
        Total Voter
      </h2>
      <p style={{ color: "#8c8c8c" }}>
        nulla, placerat efficitur. libero, In quis elit. placerat luctus ipsum
        quis ex non. ex sollicitudin. sit venenatis tincidunt elementum nisl.
        Praesent Morbi ex
      </p>
      <Form form={form} name="voter_form" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="voterAmount"
          label="Voter Amount"
          rules={[
            { required: true, message: "Please input the voter amount!" },
          ]}
        >
          <Input style={{height:48}} placeholder="Enter voter amount" />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ padding: "20px 217px", backgroundColor: "#1BA0D9" }}
            type="primary"
            htmlType="submit"
            block
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VoterPage;
