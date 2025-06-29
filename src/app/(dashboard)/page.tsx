"use client"
import ElectionAnalytics from "@/components/WebPages/main/analytics-page/analytics-page";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Home() {
  // const { data: user, isLoading } = useGetProfileQuery({});

  // console.log("check ", user);
  const user = null;
  const router = useRouter();
  if (!user) {
    toast.error("Please Login to continue...");
    return router.push("/auth/login");
  }

  return router.push("/analytics");
}
