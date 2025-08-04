"use client";
import DayWisePlan from "@/app/components/DayWisePlan";
import TravelOptions from "@/app/components/TravelOptions";
import PhotosCards from "@/app/components/PhotosCards";
import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import InfoCard from "@/app/components/InfoCard";
import { useEffect, useState, Link } from "react";

export default function Itinerary() {
  const [data, setData] = useState([]);
  const [tripSummary, setTripSummary] = useState({});

  const changeDateFormat = (dateString) => {
    const options = { month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(/\//g, ",");
  };

  useEffect(() => {
    const stored = localStorage.getItem("itinerary");
    if (stored) {
      const data = JSON.parse(stored);
      setData(data);
      setTripSummary(data.tripSummary || {});
    } else {
      console.error("No itinerary data found in localStorage.");
    }
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/config/travel-plan.json");
    //     const data = await response.json();
    //     setData(data);
    //     setTripSummary(data.tripSummary || {});
    //   } catch (error) {
    //     console.error("Error fetching travel plan:", error);
    //   }
    // };
    // fetchData();
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-5">
        <h1 className="text-2xl font-bold mb-4">
          No itinerary data available.
        </h1>
        <p className="text-gray-400">Please generate a travel plan first.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-5">
        <div className="bg-white/10 w-full p-8 rounded-lg shadow-lg mb-4">
          <h1 className="text-2xl font-bold mb-4">Trip Summary</h1>
          <div className="text-gray-300">
            <p className="mb-2">
              <strong>From:</strong> {tripSummary.from}
            </p>
            {tripSummary.stops && tripSummary.stops.length > 0 && (
              <p className="mb-2">
                <strong>Stops:</strong> {tripSummary.stops.join(", ")}
              </p>
            )}
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
          <div className="flex justify-end">
            <button
              onClick={() => window.history.back()}
              className="text-md text-blue-400 hover:underline mt-4 justify-end bg-white/10 px-3 py-1 rounded-full transition"
            >
              Back
            </button>
          </div>
        </div>
        <DayWisePlan plan={data.itinerary} />
        <InfoCard info={data.additionalInfo} />
        <TravelOptions options={data.travelArrangements} />
        <PhotosCards placeNames={data.suggestedPlaces} />
      </div>
      <Footer />
    </>
  );
}
