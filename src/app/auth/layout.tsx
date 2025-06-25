import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url(/assets/people.jpg)",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}
