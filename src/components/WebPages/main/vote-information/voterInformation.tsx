"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { toast } from "sonner";

const VoterPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // console.log("Form values:", values);
    // Handle form submission here
    const voterAmount = parseInt(values.voterAmount);
    // console.log(voterAmount);
    if (voterAmount > 0) {
      // console.log("Voter amount is valid.");
      toast.success("Voter amount added!");
    } else {
      // console.log("Voter amount is invalid.");
    }
  };

  return (
    <div
      style={{ padding: 24, height: "85vh", maxWidth: 581, color: "#636363" }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 600,
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
          <Input style={{ height: 48 }} inputMode="numeric" type="number" placeholder="Enter voter amount" />
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
