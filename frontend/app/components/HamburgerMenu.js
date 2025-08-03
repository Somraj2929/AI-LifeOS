import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HamburgerMenu() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await fetch("/config/hamburger-menu.json");
        const data = await res.json();
        const filteredSorted = data
          .filter((item) => item.visible)
          .sort((a, b) => a.position - b.position);
        setTabs(filteredSorted);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchTabs();
  }, []);

  return (
    <aside className="w-full max-w-xs bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white">
      {/* Profile */}
      <div className="flex items-center gap-4 h-[90px] mb-2">
        <div className="bg-white/90 w-[66px] h-[66px] rounded-xl flex items-center justify-center border border-white/10">
          <Image
            src="/icons/hb-user-profile.svg"
            alt="User"
            width={45}
            height={45}
          />
        </div>
        <div>
          <p className="font-semibold text-xl">Somraj Bishnoi</p>
          <p className="text-sm text-gray-300 tracking-wide leading-tight">
            +91 8058828957
          </p>
        </div>
      </div>

      <hr className="my-3 border-white/20" />

      {/* Dynamic menu items */}
      <nav className="flex flex-col space-y-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.route}
            className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            <Image
              src={`/icons/${tab.icon}`}
              alt={tab.title}
              width={26}
              height={26}
              className="object-contain bg-white rounded-lg p-1"
            />
            <span className="text-white font-medium">{tab.title}</span>
          </Link>
        ))}
      </nav>

      <hr className="my-3 border-white/20" />

      {/* Static items */}
      <nav className="flex flex-col space-y-2">
        <Link
          href="/support"
          className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          <Image
            src="/icons/support.svg"
            alt="Support"
            width={26}
            height={26}
            className="object-contain bg-white rounded-lg p-1"
          />
          <span className="text-white font-medium">Support</span>
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          <Image
            src="/icons/logout.svg"
            alt="Log out"
            width={26}
            height={26}
            className="object-contain bg-white rounded-lg p-1"
          />
          <span className="text-white font-medium">Log out</span>
        </Link>
      </nav>
    </aside>
  );
}
