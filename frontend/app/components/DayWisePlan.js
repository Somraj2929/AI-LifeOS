import React from "react";
import WeatherCard from "./WeatherCard";

export default function DayWisePlan({ plan }) {
  const changeDateFormat = (dateString) => {
    const options = { month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(/\//g, ",");
  };
  return (
    <>
      {plan && plan.length > 0 ? (
        <div className="flex flex-col gap-4 md:w-1/2">
          {plan.map((day, index) => (
            <div key={index} className="bg-white/10 p-4 rounded-lg">
              <WeatherCard location={day.location} date={day.date} />

              <div className="flex flex-row justify-between items-center mt-4">
                <h3 className="text-lg font-bold mb-2">Day {index + 1}</h3>
                <p className="text-gray-200 mb-2">
                  {changeDateFormat(day.date)}
                </p>
                <div className="bg-blue-500 text-white rounded-lg flex justify-center items-center py-1 mb-2 px-2">
                  <p className="text-white font-semibold">{day.title}</p>
                </div>
              </div>

              <ul className="list-disc pl-5">
                {day.activities.map((activity, idx) => (
                  <li key={idx} className="text-gray-200">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center">
          <p>No travel plan available for the selected dates.</p>
        </div>
      )}
    </>
  );
}
