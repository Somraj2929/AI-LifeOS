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
    const options = { day: "2-digit", month: "short", year: "numeric" };
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
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md w-full md:w-1/2 p-8 rounded-2xl shadow-xl border border-white/10 text-white mb-4">
          <h1 className="text-3xl font-extrabold mb-6 flex items-center gap-2">
            🧭 Trip Summary
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <p>
                <strong>From:</strong>{" "}
                <span className="bg-white/10 border border-white/20 px-2 py-1 rounded-full text-sm">
                  {" "}
                  {tripSummary.from?.split(",")[0]}{" "}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span>🎯</span>
              <p>
                <strong>To:</strong>{" "}
                <span className="bg-white/10 border border-white/20 px-2 py-1 rounded-full text-sm">
                  {tripSummary.to?.split(",")[0]}
                </span>
              </p>
            </div>

            {tripSummary.stops && tripSummary.stops.length > 0 && (
              <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                <span>🛑</span>
                <p className="flex flex-wrap gap-2">
                  <strong>Stops:</strong>{" "}
                  {tripSummary.stops.map((stop, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 border border-white/20 px-2 py-1 rounded-full text-sm"
                    >
                      {stop.split(",")[0]}
                    </span>
                  ))}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span>🗓️</span>
              <p>
                <strong>Travel Date:</strong>{" "}
                {changeDateFormat(tripSummary.dates?.start)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span>🔁</span>
              <p>
                <strong>Return Date:</strong>{" "}
                {changeDateFormat(tripSummary.dates?.end)}
              </p>
            </div>

            <div className="flex items-start gap-2 col-span-1 sm:col-span-2">
              <span>🚗</span>
              <p className="flex flex-wrap gap-2">
                <strong>Preferences:</strong>{" "}
                {tripSummary.preferences?.map((pref, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-600/20 border border-blue-400/30 px-2 py-1 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-full text-sm font-semibold shadow-md"
            >
              ⬅ Back
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
