import Image from "next/image";
import React from "react";
import { Bars4Icon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="bg-gray-300 px-4 py-4 flex items-center justify-between w-full h-[90px]">
      {/* Hamburger Menu */}
      <button aria-label="Menu">
        <Bars4Icon className="h-6 w-6 text-black" />
      </button>

      {/* Brand */}
      <h1 className="text-[28px] font-bold text-black">AI LifeOS</h1>

      {/* Profile Icon */}
      <Image
        src="/icons/user-profile.svg"
        alt="User Icon"
        width={36}
        height={36}
        className="rounded-full hover:opacity-80 transition-opacity"
      />
    </nav>
  );
}
