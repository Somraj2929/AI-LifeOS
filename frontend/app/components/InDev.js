"use client";
import { useEffect, useState } from "react";

export default function InDev() {
  const targetDate = "2025-08-15T12:00:00+05:30";
  const [isVisible, setIsVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });
  useEffect(() => {
    const countDown = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setIsVisible(false);
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      );
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    };

    countDown(); // initial call
    const interval = setInterval(countDown, 1000);
    return () => clearInterval(interval); // cleanup on unmount
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black overflow-hidden font-specific">
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl floating"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-500/20 blur-xl floating-2"></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 rounded-full bg-pink-500/20 blur-xl floating-3"></div>
      </div>

      <div className="relative z-10 h-[720px]  flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8 glass-card p-6 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glow-text">
          Coming{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Soon
          </span>
        </h1>

        <p className="text-xl text-white/80 max-w-lg mx-auto mb-10">
          We're building something amazing! Stay tuned for our launch.
        </p>
        {isVisible && (
          <div className="grid grid-cols-4 gap-4 mb-12">
            <div className="glass-card p-4 rounded-xl text-center transform hover:-translate-y-2 transition-all">
              <div className="text-3xl font-bold text-white">
                {timeLeft.days}
              </div>
              <div className="text-white/70 text-sm">Days</div>
            </div>
            <div className="glass-card p-4 rounded-xl text-center transform hover:-translate-y-2 transition-all">
              <div className="text-3xl font-bold text-white">
                {timeLeft.hours}
              </div>
              <div className="text-white/70 text-sm">Hours</div>
            </div>
            <div className="glass-card p-4 rounded-xl text-center transform hover:-translate-y-2 transition-all">
              <div className="text-3xl font-bold text-white">
                {timeLeft.minutes}
              </div>
              <div className="text-white/70 text-sm">Minutes</div>
            </div>
            <div className="glass-card p-4 rounded-xl text-center transform hover:-translate-y-2 transition-all">
              <div className="text-3xl font-bold text-white">
                {timeLeft.seconds}
              </div>
              <div className="text-white/70 text-sm">Seconds</div>
            </div>
          </div>
        )}

        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="btn-3d bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg mb-10"
        >
          Notify Me on Launch
        </button>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 dark:bg-gray-800 h-[250px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Notify Me
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  if (/\S+@\S+\.\S+/.test(email)) {
                    alert(`Thanks! We'll notify you at ${email}`);
                    setModalOpen(false);
                  } else {
                    alert("Please enter a valid email address.");
                  }
                }}
              >
                <label
                  htmlFor="email"
                  className="block text-xl font-medium text-gray-700 dark:text-white mb-2"
                >
                  Enter your email to get notified{" :)"}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 mt-2"
                />
                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-semibold mt-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
