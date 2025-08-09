import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <section className="relative w-full bg-black text-white flex items-center justify-center px-2 md:px-8">
      <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-lg relative">
        {/* Profile Icon */}
        <div className="absolute top-4 right-4">
          <Image
            src="/icons/user-circle.svg"
            alt="User Profile"
            width={36}
            height={36}
            className="rounded-full opacity-90 hover:opacity-100 transition z-10"
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          AI LifeOS
        </h1>
        <p className="text-gray-300 mt-3 text-sm sm:text-base leading-relaxed">
          Your personal OS for autonomous decision-making, intelligent learning,
          habit tracking, and much more — powered by AI.
        </p>
        <button
          type="button"
          className="mt-5 inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium shadow transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
