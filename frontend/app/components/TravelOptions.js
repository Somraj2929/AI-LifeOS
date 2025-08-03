"use client";
import React, { useState } from "react";

export default function TravelOptions({ options }) {
  const [arrangement, showArrangement] = useState(false);
  const changeDateTimeFormat = (dateString) => {
    const opts = {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", opts).replace(/\//g, ",");
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white p-5 w-full rounded-2xl shadow-lg my-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">
          Travel Arrangements
        </h2>
        <button
          onClick={() => showArrangement(!arrangement)}
          className="text-sm text-blue-400 bg-white/10 px-3 py-2 rounded-full transition mb-4 pb-2"
        >
          {arrangement ? "Hide" : "Show"}
        </button>
      </div>

      {arrangement === true && (
        <div className="flex flex-col gap-6">
          {Array.isArray(options) &&
            options.map((arrangement, index) => {
              if (arrangement.mode === "Bus") {
                return (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-4 border border-white/10"
                  >
                    <p className="text-lg font-semibold mb-1">
                      🚌 {arrangement.provider}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Departure:
                      </span>{" "}
                      {arrangement.departureLocation} at{" "}
                      {changeDateTimeFormat(arrangement.departure)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Arrival:
                      </span>{" "}
                      {arrangement.arrivalLocation} at{" "}
                      {changeDateTimeFormat(arrangement.arrival)}
                    </p>

                    <div className="flex justify-between mt-2 text-sm text-gray-300">
                      <span>
                        ⏱ <strong>Duration:</strong> {arrangement.duration}
                      </span>
                      <span>
                        💰 <strong>Price:</strong> {arrangement.price}
                      </span>
                    </div>

                    <div className="mt-4 text-right">
                      <a
                        href={arrangement.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition">
                          Book Now
                        </button>
                      </a>
                    </div>
                  </div>
                );
              } else if (arrangement.mode === "Cab") {
                return (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-4 border border-white/10"
                  >
                    <p className="text-lg font-semibold mb-1">
                      🚖 {arrangement.purpose}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Booking Option:
                      </span>{" "}
                      {arrangement.bookingOption}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Approx Cost:
                      </span>{" "}
                      {arrangement.approxCost}
                    </p>
                    {arrangement.contact && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-300">
                          Contact:
                        </span>{" "}
                        {arrangement.contact}
                      </p>
                    )}
                  </div>
                );
              } else if (arrangement.mode === "Flight") {
                return (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-4 border border-white/10"
                  >
                    <p className="text-lg font-semibold mb-1">
                      ✈️ {arrangement.airline}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Departure:
                      </span>{" "}
                      {arrangement.departureLocation} at{" "}
                      {changeDateTimeFormat(arrangement.departure)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Arrival:
                      </span>{" "}
                      {arrangement.arrivalLocation} at{" "}
                      {changeDateTimeFormat(arrangement.arrival)}
                    </p>

                    <div className="flex justify-between mt-2 text-sm text-gray-300">
                      <span>
                        ⏱ <strong>Duration:</strong> {arrangement.duration}
                      </span>
                      <span>
                        💰 <strong>Price:</strong> {arrangement.price}
                      </span>
                    </div>

                    <div className="mt-4 text-right">
                      <a
                        href={arrangement.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition">
                          Book Now
                        </button>
                      </a>
                    </div>
                  </div>
                );
              } else if (arrangement.mode === "Train") {
                return (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-4 border border-white/10"
                  >
                    <p className="text-lg font-semibold mb-1">
                      🚆 {arrangement.trainName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Departure:
                      </span>{" "}
                      {arrangement.departureLocation} at{" "}
                      {changeDateTimeFormat(arrangement.departure)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">
                        Arrival:
                      </span>{" "}
                      {arrangement.arrivalLocation} at{" "}
                      {changeDateTimeFormat(arrangement.arrival)}
                    </p>

                    <div className="flex justify-between mt-2 text-sm text-gray-300">
                      <span>
                        ⏱ <strong>Duration:</strong> {arrangement.duration}
                      </span>
                      <span>
                        💰 <strong>Price:</strong> {arrangement.price}
                      </span>
                    </div>

                    <div className="mt-4 text-right">
                      <a
                        href={arrangement.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition">
                          Book Now
                        </button>
                      </a>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      )}
    </div>
  );
}
