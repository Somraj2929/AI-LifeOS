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
    <aside className="w-auto bg-white p-2">
      {/* Profile */}
      <div className="flex items-center gap-4 h-[90px] pl-1">
        <div className="bg-yellow-300 w-[66px] h-[66px] rounded-xl flex items-center justify-center">
          <Image
            src="/icons/hb-user-profile.svg"
            alt="User"
            width={45}
            height={45}
          />
        </div>
        <div>
          <p className="font-semibold text-xl text-black">Somraj Bishnoi</p>
          <p className="text-[15px] font-extralight text-gray-600 leading-relaxed tracking-wide">
            +91 8058828957
          </p>
        </div>
      </div>
      <hr className="my-2 border-gray-400" />

      {/* Dynamic menu items */}
      <nav className="flex flex-col  ">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.route}
            className="flex items-center gap-4 text-black text-xl font-semibold hover:bg-amber-100 h-[45px] pl-5 rounded-xl transition-colors"
          >
            <Image
              src={`/icons/${tab.icon}`}
              alt={tab.title}
              width={26}
              height={26}
            />
            <span>{tab.title}</span>
          </Link>
        ))}
      </nav>

      <hr className="my-2 border-gray-400" />

      {/* Static items */}
      <nav className="flex flex-col ">
        <Link
          href="/support"
          className="flex items-center gap-4 text-black text-xl font-semibold hover:bg-amber-100 h-[45px] pl-5 rounded-xl transition-colors "
        >
          <Image
            src="/icons/support.svg"
            alt="Support"
            width={26}
            height={26}
          />
          <span>Support</span>
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-4 text-black text-xl font-semibold hover:bg-amber-100 h-[45px] pl-5 rounded-xl transition-colors "
        >
          <Image src="/icons/logout.svg" alt="Log out" width={26} height={26} />
          <span>Log out</span>
        </Link>
      </nav>
    </aside>
  );
}
