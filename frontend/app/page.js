"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

const isProd = process.env.NODE_ENV === "production";
const HOMEPAGE_CARDS_URL = isProd
  ? "https://your-remote-source.com/homepage-cards.json"
  : "/config/homepage-cards.json";

export default function Home() {
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTabs = useCallback(async () => {
    try {
      const res = await fetch(HOMEPAGE_CARDS_URL);
      const data = await res.json();
      const sorted = data
        .filter((tab) => tab.visible)
        .sort((a, b) => a.position - b.position);
      setTabs(sorted);
    } catch (error) {
      console.error("Error loading tabs config:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeroSection />
      <div className="px-2">
        {loading ? (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        ) : (
          tabs.map((tab) => (
            <Link key={tab.id} href={tab.route} passHref>
              <div className="flex items-center justify-between h-[100px] hover:bg-gray-50 rounded-md transition">
                <div className="flex items-center gap-[20px]">
                  <div className="ml-4 flex items-center justify-center w-[66px] h-[66px] bg-gray-300 rounded-md">
                    <Image
                      src={`/icons/${tab.icon ?? "default.svg"}`}
                      alt={tab.title ?? "Tab"}
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-black text-[16px]">
                      {tab.title || "Untitled"}
                    </h2>
                    <p className="text-[13px] text-gray-600 max-h-[36px] max-w-[190px] overflow-hidden">
                      {tab.description || ""}
                    </p>
                  </div>
                </div>
                <span className="text-[13px] font-medium mr-4 flex items-center text-gray-700 hover:text-gray-900">
                  Explore
                  <ChevronRightIcon className="h-5 w-5 text-black ml-[-4px]" />
                </span>
              </div>
              <div className="border-t border-gray-400 mx-4" />
            </Link>
          ))
        )}
        {tabs.length === 0 && !loading && (
          <p className="text-center text-gray-600 mt-4">
            No tabs available. Please check your configuration.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
