"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="bg-gray-300 px-4 py-4 flex items-center justify-between w-full h-[90px] relative z-20">
        <button aria-label="Menu" onClick={() => setIsMenuOpen(true)}>
          <Bars4Icon className="h-6 w-6 text-black" />
        </button>
        <Link href="/">
          <h1 className="text-[28px] font-bold text-black">AI LifeOS</h1>
        </Link>
        <Image
          src="/icons/user-profile.svg"
          alt="User Icon"
          width={36}
          height={36}
          className="rounded-full hover:opacity-80 transition-opacity"
        />
      </nav>

      {/* overlay with pointer-events toggled */}
      <div
        className={`fixed inset-0 z-30 transition duration-500 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isMenuOpen ? "opacity-70" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* drawer */}
        <div
          className={`fixed top-0 left-0 h-screen p-2 pt-4 pr-4 bg-white shadow-xl overflow-y-auto transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-3 right-3"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6 text-white bg-gray-500 rounded-lg" />
          </button>
          <HamburgerMenu />
        </div>
      </div>
    </>
  );
}
