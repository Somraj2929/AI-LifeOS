"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import PongLoader from "./components/PongLoader";

// const isProd = process.env.NODE_ENV === "production";
// const HOMEPAGE_CARDS_URL = isProd
//   ? "https://your-remote-source.com/homepage-cards.json"
//   : "/config/homepage-cards.json";

const HOMEPAGE_CARDS_URL = "/config/homepage-cards.json";

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
    <div className="min-h-screen bg-black text-white pb-4 py-4 space-y-2">
      <HeroSection />
      <div className="px-2 bg-white/5 rounded-xl shadow-lg">
        {loading ? (
          <PongLoader className="mt-4" />
        ) : (
          tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.route}
              className="flex items-center md:justify-center justify-between"
            >
              <div className="relative md:w-1/2 flex items-center justify-between p-4 mb-1 md:p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-lg transition-all group hover:ring-1 hover:ring-blue-500/50">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg group-hover:bg-white/20 transition">
                  <img
                    src={`/icons/${tab.icon}`}
                    alt={tab.title}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <h3 className="text-white text-base font-medium leading-tight">
                    {tab.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 leading-snug line-clamp-2">
                    {tab.description}
                  </p>
                </div>

                <div className="ml-3 text-blue-400 text-sm font-medium group-hover:text-blue-500 transition">
                  View all →
                </div>
              </div>
            </Link>
          ))
        )}
        {tabs.length === 0 && !loading && (
          <p className="text-center text-gray-600 mt-4 md:w-1/2">
            No tabs available. Please check your configuration.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
