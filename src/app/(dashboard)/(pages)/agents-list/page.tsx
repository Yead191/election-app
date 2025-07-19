import AgentsListPage from "@/components/WebPages/main/agent-list/AgentListPage";
import React from "react";

export default function page() {
  return (
    <div>
      <AgentsListPage />
    </div>
  );
}

export const metadata = {
  title: "Agents List | Election Mobile App",
  description: "Agents List",
};
