"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";

const ResetPassword = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    console.log(values);
    toast.success("Password reset successfully");
    router.push("/auth/login");
  };

  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div
        className="bg-white shadow-lg rounded-lg flex items-center justify-center"
        style={{ width: "755px", height: "85vh" }}
      >
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="text-center mb-4">
            <Logo />
            <h1 className="text-2xl  font-semibold color-primary  ">
              Reset Password
            </h1>
            <p className="text-gray-500 text-[14px] mt-4">
              Please set a new password to get access of your account!
            </p>
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                },
              ]}
              style={{
                width: "486px",
                margin: "auto",
                marginTop: 24,
                marginBottom: 0,
              }}
            >
              <Input.Password
                type="password"
                placeholder="Enter New password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
                className="mb-6"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: 0 }}
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter Confirm password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
                className="mb-6"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  fontWeight: "500",
                  padding: "20px 0px",
                  //   backgroundColor: "#6DBD44",
                  backgroundColor: "#1BA0D9",
                  borderColor: "#52c41a",
                }}
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
