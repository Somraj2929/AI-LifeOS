import { useState } from "react";

export default function DecisionForm({ status, onSubmit }) {
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
    onSubmit({ options: filledOptions });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 pt-4 space-y-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10"
    >
      <h2 className="text-center text-[24px] text-white font-bold mb-4">
        What decision are you trying to make?
      </h2>

      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${String.fromCharCode(65 + index)}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="w-full h-[50px] px-5 py-2 bg-white/10 rounded-lg text-white font-light text-[16px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addOption}
          className="text-blue-400 text-sm font-semibold hover:underline"
        >
          + Add More
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-700 text-white text-[22px] font-semibold py-2 rounded text-lg hover:bg-blue-800 transition"
      >
        {status === "loading" ? "Generating Decision..." : "Submit to AI"}
      </button>
    </form>
  );
}
