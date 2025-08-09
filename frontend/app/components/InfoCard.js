import { FaCircleInfo } from "react-icons/fa6";
import React from "react";

export default function InfoCard({ info }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border md:w-1/2 border-white/10 text-white p-6 rounded-2xl shadow-lg mt-6">
      <div className="flex items-center gap-2 mb-4">
        <FaCircleInfo className="text-blue-500" size={22} />
        <h2 className="text-lg font-semibold">Additional Info</h2>
      </div>
      <p className="text-gray-300 leading-relaxed">{info}</p>
    </div>
  );
}
