import { useState } from "react";

export default function DecisionForm() {
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledOptions = options.filter((opt) => opt.trim() !== "");
    if (filledOptions.length < 2) {
      alert("Please provide at least two options.");
      return;
    }
    console.log("Submitted options:", filledOptions);
    // connect to AI logic here
  };

  return (
    <div className="px-4 pt-4">
      <h2 className="text-center text-[24px] text-black font-bold mb-4">
        What decision are you trying to make?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${String.fromCharCode(65 + index)}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full h-[50px] px-5 py-2 bg-gray-300 rounded-lg text-black font-light text-[16px] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addOption}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            + Add More
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white text-[22px] font-semibold py-2 rounded text-lg  hover:bg-blue-800 transition"
        >
          Submit to AI
        </button>
      </form>
    </div>
  );
}
