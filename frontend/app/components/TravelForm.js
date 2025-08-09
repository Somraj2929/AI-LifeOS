"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CgArrowLongRightC } from "react-icons/cg";

const formatDateISO = (date) => date.toISOString().split("T")[0];
const today = formatDateISO(new Date());
const maxDate = formatDateISO(
  new Date(new Date().setDate(new Date().getDate() + 300))
);

export default function TravelForm() {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [stops, setStops] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [additionalReq, setAdditional] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastItinerary, setLastItinerary] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tempEndDate, setTempEndDate] = useState("");

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const stopRefs = useRef([]);

  const travelOptions = ["Flight", "Train", "Bus", "Cab"];

  useEffect(() => {
    const stored = localStorage.getItem("itinerary");
    if (stored) {
      try {
        setLastItinerary(JSON.parse(stored));
      } catch {
        setLastItinerary(null);
      }
    }
  }, []);

  useEffect(() => {
    if (window.google) {
      const autoFrom = new google.maps.places.Autocomplete(fromRef.current);
      autoFrom.addListener("place_changed", () => {
        const place = autoFrom.getPlace();
        setFromLocation(place?.formatted_address || fromRef.current.value);
      });

      const autoTo = new google.maps.places.Autocomplete(toRef.current);
      autoTo.addListener("place_changed", () => {
        const place = autoTo.getPlace();
        setToLocation(place?.formatted_address || toRef.current.value);
      });

      stopRefs.current.forEach((ref, index) => {
        if (ref) {
          const auto = new google.maps.places.Autocomplete(ref);
          auto.addListener("place_changed", () => {
            const place = auto.getPlace();
            handleStopChange(index, place?.formatted_address || ref.value);
          });
        }
      });
    }
  }, [stops]);

  const handleStopChange = (index, value) => {
    const updated = [...stops];
    updated[index] = value;
    setStops(updated);
  };

  const togglePreference = (value) => {
    if (preferences.includes(value)) {
      setPreferences(preferences.filter((pref) => pref !== value));
    } else {
      setPreferences([...preferences, value]);
    }
  };

  const addStop = () => {
    setStops((prev) => [...prev, ""]);
  };

  const removeStop = (index) => {
    setStops((prev) => prev.filter((_, i) => i !== index));
    stopRefs.current[index] = null;
  };

  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);

    // If endDate is before startDate, reset it
    if (!endDate || endDate < newStart) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    const newEnd = e.target.value;
    setEndDate(newEnd);

    if (startDate && newEnd === startDate) {
      setTempEndDate(newEnd);
      setShowModal(true);
    } else {
      setEndDate(newEnd);
    }
  };

  const proceedSameDay = () => {
    setEndDate(tempEndDate);
    setShowModal(false);
  };

  const cancelSameDay = () => {
    setEndDate("");
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromLocation || !toLocation || !startDate || !endDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      from: fromLocation,
      to: toLocation,
      stops: stops.filter((s) => s.trim() !== ""),
      dates: { from: startDate, to: endDate },
      preferences,
      additionalReq,
    };
    setLoading(true);
    try {
      const res = await fetch(
        "https://ai-lifeos-production.up.railway.app/generate-itinerary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      // ✅ Store to localStorage
      localStorage.setItem("itinerary", JSON.stringify(data));
      setLoading(false);
      router.push("/tabs/travel-planner/itinerary");
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setLoading(false);
      alert("Failed to generate itinerary. Please try again.");
    }
  };

  const formatShort = (str) => {
    return str?.split(",")[0] || str;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-5">
      <form
        onSubmit={handleSubmit}
        className="p-5 space-y-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl text-white md:w-1/2"
      >
        <h2 className="text-2xl font-bold text-center">
          From Dream to Done. <br /> Let's Design Your Journey!
        </h2>

        {/* From Location */}
        <input
          ref={fromRef}
          placeholder="From Location"
          className="w-full h-[50px] px-5 bg-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          ref={toRef}
          placeholder="To Location"
          className="w-full h-[50px] px-5 bg-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Stops */}
        {stops.map((stop, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              ref={(el) => (stopRefs.current[index] = el)}
              placeholder={`Stop ${index + 1}`}
              value={stop}
              onChange={(e) => handleStopChange(index, e.target.value)}
              className="w-full h-[50px] px-5 bg-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeStop(index)}
              className="text-sm text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addStop}
            className="text-sm text-blue-400 hover:underline "
          >
            + Add Stop
          </button>
        </div>

        {/* Date Range */}
        <div className="flex flex-row gap-3 sm:flex-row sm:justify-between">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">From</label>
            <input
              type="date"
              value={startDate}
              min={today}
              style={{ colorScheme: "dark" }}
              max={maxDate}
              onChange={handleStartDateChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-1">To</label>
            <input
              type="date"
              value={endDate}
              style={{ colorScheme: "dark" }}
              min={startDate || today}
              max={maxDate}
              onChange={handleEndDateChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-sm font-bold mb-2">
            Travel Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {travelOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => togglePreference(opt)}
                className={`px-4 py-2 rounded-full border transition ${
                  preferences.includes(opt)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-transparent border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Note */}
        <textarea
          placeholder="Any additional details..."
          value={additionalReq}
          onChange={(e) => setAdditional(e.target.value)}
          className="w-full h-24 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold py-3 rounded transition"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Planning Itinerary...
            </div>
          ) : (
            "Generate Travel Plan"
          )}
        </button>
      </form>
      {lastItinerary && (
        <div className="mt-8 md:w-1/2 w-full bg-white/5 border border-white/10 rounded-xl p-4 shadow-md text-white">
          <h3 className="text-lg font-bold mb-2">Last Planned Itinerary</h3>
          <div className="flex flex-row justify-between items-center mb-2">
            <p className="bg-white/10 border border-white/20 px-3 py-2 rounded-full text-md">
              {formatShort(lastItinerary.tripSummary?.from)}
            </p>
            <img
              width="64"
              height="64"
              src="/icons/arrow-right.png"
              alt="arrow"
            />
            <p className="bg-white/10 border border-white/20 px-3 py-2 rounded-full text-md">
              {formatShort(lastItinerary.tripSummary?.to)}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center mb-2">
            <p>{formatDate(lastItinerary.tripSummary?.dates?.start)}</p>
            <CgArrowLongRightC className="text-2xl text-blue-400" />
            <p>{formatDate(lastItinerary.tripSummary?.dates?.end)}</p>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => router.push("/tabs/travel-planner/itinerary")}
              className="mt-4 bg-blue-600 hover:bg-green-600 text-white px-4 py-2 rounded-full transition font-semibold"
            >
              View Itinerary
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-60 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg text-black font-bold mb-4">
              1-Day Itinerary Warning
            </h2>
            <p className="mb-6 text-gray-700">
              You requested only a 1-day itinerary. Are you sure you want to
              proceed with the same start and end date?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelSameDay}
                className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={proceedSameDay}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
