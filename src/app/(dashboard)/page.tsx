"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = null;
  if (!user) {
    return router.push("/auth/login");
  }
  return router.push("/analytics");
}
