import Image from "next/image";
import React from "react";
import { Bars4Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-300 px-4 py-4 flex items-center justify-between w-full h-[90px]">
      {/* Hamburger Menu */}
      <button aria-label="Menu">
        <Bars4Icon className="h-6 w-6 text-black" />
      </button>

      <Link href="/">
        <h1 className="text-[28px] font-bold text-black">AI LifeOS</h1>
      </Link>

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
