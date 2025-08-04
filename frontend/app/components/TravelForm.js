"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const stopRefs = useRef([]);

  const travelOptions = ["Flight", "Train", "Bus", "Cab"];

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
      const res = await fetch("http://localhost:8081/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 space-y-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl text-white"
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
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold mb-1">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
  );
}
