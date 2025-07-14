"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import { useForgotPasswordMutation } from "@/redux/feature/auth/authApi";
import Cookies from "js-cookie";
const ForgetPassword = () => {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onFinish = async (values: any) => {
    try {
      toast.promise(forgotPassword(values).unwrap(), {
        loading: "Sending code...",
        success: (res) => {
          Cookies.set("resetEmail", values.email || "", {
            expires: 1,
            path: "/",
          });
          router.push("/auth/verify-otp");
          return <b>{res.message}</b>;
        },
        error: (res) => `Error: ${res.data?.message || "Something went wrong"}`,
      });
    } catch (error) {
      toast.error("Failed to send code");
    }
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
              Forgot your password?
            </h1>
            <p className="text-gray-500 text-[14px] mt-4">
              Please enter your email for verification!
            </p>
          </div>
          <Form
            name="signin"
            onFinish={onFinish}
            style={{
              width: "486px",
              margin: "auto",
              marginTop: 24,
            }}
            // style={{ maxWidth: 600, margin: "auto", padding: 20 }}
          >
            {/* <label htmlFor="email">Email</label> */}
            <Form.Item
              name="email"
              style={{ marginTop: 4, marginBottom: 24 }}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                // style={{ padding: "12px 16px" }}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-primary"
                style={{
                  width: "100%",
                  fontWeight: "500",
                  padding: "20px 0px",
                  backgroundColor: "#1BA0D9",
                  // borderColor: "#52c41a",
                }}
              >
                Send Code
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
