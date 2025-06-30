import { useState } from "react";
import AutoSizeTextarea from "./AutoSizeTextarea";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function DecisionResults({ data }) {
  const [showFactors, setShowFactors] = useState(false);

  return (
    <div>
      <hr className="mb-4 mt-2 border-gray-400" />
      {/* AI Response */}
      <section className="mb-4">
        <h2 className="font-bold text-xl text-black mb-1">AI Response</h2>
        <p className="text-gray-800 text-[16px]">{data.decision}</p>
      </section>

      <hr className="my-1 border-gray-400" />
      {/* Factors Considered */}
      <section className="pt-2 mb-4">
        <button
          onClick={() => setShowFactors(!showFactors)}
          className="flex justify-between items-center w-full font-bold text-xl text-black mb-1"
        >
          Factors Considered
          <span>
            {showFactors ? (
              <ChevronUpIcon className="h-6 w-6 text-black mr-1" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 text-black mr-1" />
            )}
          </span>
        </button>
        {showFactors && (
          <ul className="text-[15px] mt-2 space-y-2 ">
            {Object.entries(data.factors).map(([category, details]) => (
              <li key={category}>
                <strong className="text-black underline">{category}:</strong>
                <ul className="list-disc ml-4 space-y-1">
                  {Object.entries(details).map(([option, desc]) => (
                    <li key={option} className="text-gray-800 leading-4">
                      <strong className="text-black">{option}:</strong> {desc}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
      <hr className="my-1 border-gray-400" />
      {/* Suggestions */}
      <section className="pt-2">
        <h3 className="font-bold text-xl text-black mb-2">Suggestions</h3>
        <AutoSizeTextarea value={data.suggestions} />
      </section>
    </div>
  );
}
