import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center justify-center  mb-6">
      <Image src={"/logo.jpg"} alt="logo" width={117} height={122} />
    </div>
  );
}
