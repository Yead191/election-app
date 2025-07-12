"use client";
import Spinner from "@/components/Spinner/Spinner";
import ElectionAnalytics from "@/components/WebPages/main/analytics-page/analytics-page";
import { useGetProfileQuery } from "@/redux/feature/auth/authApi";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Home() {
  const { data: user, isLoading } = useGetProfileQuery(null);
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }
  // console.log(user);
  if (!user?.data) {
    toast.error("Please Login to continue...");
    return router.push("/auth/login");
  }

  return router.push("/analytics");
}
