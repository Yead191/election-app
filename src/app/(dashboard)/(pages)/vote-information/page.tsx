import VoterPage from "@/components/WebPages/main/vote-information/voterInformation";
import React from "react";

export default function page() {
  return (
    <div className="bg-white rounded-[8px]">
      <VoterPage />
    </div>
  );
}

export const metadata = {
  title: "Voter Information | Election Mobile App",
  description: "Voter Information",
};
