"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { use } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";
import { useLoginMutation } from "@/redux/feature/auth/authApi";

const SignInForm = () => {
  const router = useRouter();
  const [login, { isLoading, isSuccess, data }] = useLoginMutation();
  const onFinish = async (values: any) => {
    console.log(values);

    // toast.success("Login Successful");
    // router.push("/analytics");
    const user = {
      email: values.email,
      password: values.password,
    };
    toast.promise(login(values).unwrap(), {
      loading: "Logging in...",
      success: (res) => {
        console.log(res);
        router.push("/analytics");
        return <b>{res.message}</b>;
      },
      error: "Login Failed",
    });
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
              Login to your account!
            </h1>
            <p className="text-gray-500 text-[14px] mt-4">
              Please enter your email and password to continue!
            </p>
          </div>
          <Form
            name="signin"
            onFinish={onFinish}
            style={{
              width: "486px",
              margin: "auto",
              marginTop: 12,
            }}
            // style={{ maxWidth: 600, margin: "auto", padding: 20 }}
          >
            {/* <label htmlFor="email">Email</label> */}
            <Form.Item
              name="email"
              style={{ marginTop: 4, marginBottom: 12 }}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                // style={{ padding: "12px 16px" }}
                size="large"
              />
            </Form.Item>

            {/* <label htmlFor="designationType">Password</label> */}

            <Form.Item
              name="password"
              style={{ marginTop: 25, marginBottom: 0 }}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                style={{
                  width: "100%",
                  padding: "8px 12px",
                }}
                placeholder="Password"
              />
            </Form.Item>

            <div className="flex items-center justify-between py-4">
              <Form.Item
                style={{ marginBottom: 0 }}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link
                className="login-form-forgot text-primary font-semibold"
                href="/auth/forget-password"
              >
                Forgot password
              </Link>
            </div>

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
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
