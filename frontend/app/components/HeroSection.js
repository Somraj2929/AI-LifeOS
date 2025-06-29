import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <section className="h-[250px] w-auto bg-gray-300 relative">
      <div className="absolute top-4 right-4">
        <Image
          src="/icons/user-profile.svg"
          alt="User Icon"
          width={45}
          height={45}
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <header>
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            AI LifeOS
          </h1>
        </header>
        <p className="text-gray-700 my-2 text-center max-w-xl">
          Your personal operating system for autonomous decision-making,
          learning, habit tracking, and more...
        </p>
        <button
          type="button"
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
