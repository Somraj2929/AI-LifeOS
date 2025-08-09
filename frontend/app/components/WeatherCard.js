"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WeatherCard({ location, date }) {
  const [info, setInfo] = useState(null);

  const formatDateISO = (date) => date.toISOString().split("T")[0];
  const today = formatDateISO(new Date());

  useEffect(() => {
    if (!location || !date) return;

    if (date < today) return;
    console.log("Weather History is not available currently");

    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location, date }),
        });

        const data = await res.json();
        if (data.weather) {
          setInfo(data.weather);
        } else {
          console.error("Weather error:", data.error);
        }
      } catch (err) {
        console.error("Client error fetching weather:", err);
      }
    };

    fetchWeather();
  }, [location, date]);

  if (!info) return null;

  return (
    <div className="bg-white/5 backdrop-blur-md text-white p-4 rounded-2xl shadow-lg w-full bg-gradient-to-r from-slate-800 to-slate-600">
      <div className="flex items-center gap-4">
        <Image
          src={`https:${info.icon}`}
          alt="Weather Icon"
          width={64}
          height={64}
          className="rounded-md"
        />
        <div>
          <p className="text-lg font-semibold">{info.city}</p>
          <p className="text-sm text-gray-300">{info.condition}</p>
          <p className="text-2xl font-bold">{info.temp}°C</p>
        </div>
        <div className="ml-auto text-left">
          <p className="text-sm text-gray-400">High: {info.max_temp}°C</p>
          <p className="text-sm text-gray-400">Low: {info.min_temp}°C</p>
        </div>
      </div>
    </div>
  );
}
