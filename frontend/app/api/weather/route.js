import { NextResponse } from "next/server";

export async function POST(req) {
  const { location, date } = await req.json();
  const key = process.env.WEATHERAPI_KEY;

  if (!location || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const today = new Date();
  const targetDate = new Date(date);
  const daysDiff = Math.floor(
    (targetDate - new Date(today.toDateString())) / (1000 * 60 * 60 * 24)
  );

  let endpoint = "";
  let apiType = "";

  if (today.toDateString() === targetDate.toDateString()) {
    // Today
    endpoint = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;
    apiType = "current";
  } else if (daysDiff >= 1 && daysDiff <= 13) {
    // Up to 13 days ahead
    endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=${
      daysDiff + 1
    }&aqi=no&alerts=no`;
    apiType = "forecast";
  } else if (daysDiff >= 14 && daysDiff <= 300) {
    // Far future
    endpoint = `https://api.weatherapi.com/v1/future.json?key=${key}&q=${location}&dt=${date}`;
    apiType = "future";
  } else {
    return NextResponse.json(
      { error: "Date out of range (max 300 days)" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    let result = null;

    if (apiType === "current") {
      const { location, current } = data;
      result = {
        city: location.name,
        date: location.localtime.split(" ")[0],
        temp: current.temp_c,
        min_temp: current.temp_c, // no min/max for current
        max_temp: current.temp_c,
        condition: current.condition.text,
        icon: current.condition.icon,
      };
    } else {
      const dayObj = data.forecast.forecastday.find((d) => d.date === date);
      if (!dayObj) throw new Error("No weather data for date");
      result = {
        city: data.location.name,
        date: dayObj.date,
        temp: dayObj.day.avgtemp_c,
        min_temp: dayObj.day.mintemp_c,
        max_temp: dayObj.day.maxtemp_c,
        condition: dayObj.day.condition.text,
        icon: dayObj.day.condition.icon,
      };
    }

    return NextResponse.json({ weather: result });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
