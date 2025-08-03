"use client";
import DayWisePlan from "@/app/components/DayWisePlan";
import TravelOptions from "@/app/components/TravelOptions";
import PhotosCards from "@/app/components/PhotosCards";
import { useEffect, useState, Link } from "react";

export default function Test() {
  const [data, setData] = useState([]);
  const [tripSummary, setTripSummary] = useState({});

  const changeDateFormat = (dateString) => {
    const options = { month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(/\//g, ",");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/config/travel-plan.json");
        const data = await response.json();
        setData(data);
        setTripSummary(data.tripSummary || {});
      } catch (error) {
        console.error("Error fetching travel plan:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-5">
      <div className="bg-white/10 w-full p-8 rounded-lg shadow-lg mb-4">
        <h1 className="text-2xl font-bold mb-4">Trip Summary</h1>
        <div className="text-gray-300">
          <p className="mb-2">
            <strong>From:</strong> {tripSummary.from}
          </p>
          <p className="mb-2">
            <strong>To:</strong> {tripSummary.to}
          </p>
          <p className="mb-2">
            <strong>Travel Date:</strong>{" "}
            {changeDateFormat(tripSummary.dates?.start)}
          </p>
          <p className="mb-2">
            <strong>Return Date:</strong>{" "}
            {changeDateFormat(tripSummary.dates?.end)}
          </p>
          <p className="mb-2">
            <strong>Travel Preferences:</strong>{" "}
            {tripSummary.preferences?.join(", ")}
          </p>
        </div>
      </div>
      <DayWisePlan plan={data.itinerary} />
      <TravelOptions options={data.travelArrangements} />
      <PhotosCards placeNames={data.suggestedPlaces} />
    </div>
  );
}
