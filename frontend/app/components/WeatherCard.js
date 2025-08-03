"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WeatherCard({
  location = "Chakrata",
  date = "2025-08-30",
}) {
  const [weatherData, setWeatherData] = useState(null);
  const [apiType, setApiType] = useState("current");
  const key = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;

  useEffect(() => {
    if (!location || !date) return;

    const today = new Date();
    const targetDate = new Date(date);
    const getDaysBetween = (d1, d2) => {
      const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
      const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
      return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    };

    const diffDays = getDaysBetween(today, targetDate);

    let endpoint = "";

    if (today.toDateString() === targetDate.toDateString()) {
      endpoint = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;
      setApiType("current");
    } else if (diffDays >= 1 && diffDays <= 13) {
      endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=${
        diffDays + 1
      }&aqi=no&alerts=no`;
      setApiType("forecast");
    } else if (diffDays >= 14 && diffDays <= 300) {
      endpoint = `https://api.weatherapi.com/v1/future.json?key=${key}&q=${location}&dt=${date}`;
      setApiType("future");
    } else {
      console.warn("Date is out of supported weather range (300 days)");
      return;
    }

    const fetchWeather = async () => {
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    fetchWeather();
  }, [location, date]);

  const getWeatherInfo = () => {
    if (!weatherData) return null;

    if (apiType === "current") {
      const { location, current } = weatherData;
      console.log("Current weather data:", weatherData);
      return {
        city: location.name,
        temp: current.temp_c,
        min_temp: current.mintemp_c,
        max_temp: current.maxtemp_c,
        condition: current.condition.text,
        icon: current.condition.icon,
        date: location.localtime.split(" ")[0],
      };
    }

    if (apiType === "forecast" || apiType === "future") {
      const dayObj = weatherData.forecast.forecastday.find(
        (d) => d.date === date
      );

      if (!dayObj) return null;

      const { day } = dayObj;
      return {
        city: weatherData.location.name,
        temp: day.avgtemp_c,
        min_temp: day.mintemp_c,
        max_temp: day.maxtemp_c,
        condition: day.condition.text,
        icon: day.condition.icon,
        date: dayObj.date,
      };
    }

    return null;
  };

  const info = getWeatherInfo();

  if (!info) return null;

  return (
    <div className="bg-white/5 backdrop-blur-md text-white p-5 rounded-2xl shadow-lg w-full bg-gradient-to-r from-slate-800 to-slate-600">
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
          <p className="text-sm text-gray-400">High:{info.max_temp}°C</p>
          <p className="text-sm text-gray-400">Low:{info.min_temp}°C</p>
        </div>
      </div>
    </div>
  );
}
