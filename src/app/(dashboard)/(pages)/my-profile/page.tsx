import ProfilePage from "@/components/WebPages/main/my-profile/MyProfilePage";
import React from "react";

export default function page() {
  return (
    <div>
      <ProfilePage />
    </div>
  );
}

export const metadata = {
  title: "My Profile | Election Mobile App",
  description: "My Profile",
};