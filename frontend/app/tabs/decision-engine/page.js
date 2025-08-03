"use client";
import DecisionForm from "@/app/components/DecisionForm";
import Footer from "@/app/components/Footer";
import HowItWorks from "@/app/components/HowItWorks";
import Navbar from "@/app/components/NavBar";
import React from "react";
import { useState } from "react";
import PongLoader from "@/app/components/PongLoader";
import DecisionResults from "@/app/components/DecisionResults";

function DecisionEnginePage() {
  const [status, setStatus] = useState("idle"); // idle | loading | results
  const [decisionData, setDecisionData] = useState(null);

  const handleFormSubmit = async (options) => {
    setStatus("loading");
    console.log("Submitting options:", options);

    // simulate backend 5s
    //await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await fetch("http://localhost:8081/decision-engine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      const data = await res.json();
      setDecisionData(data);
      setStatus("results");
    } catch (err) {
      console.error("error", err);
      setStatus("idle");
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-black/70 text-white">
      <Navbar />
      <DecisionForm status={status} onSubmit={handleFormSubmit} />
      {status === "idle" && <HowItWorks />}
      {status === "loading" && (
        <section className="p-4 text-left w-full max-w-md">
          <hr className="my-4 border-gray-300" />
          <p className="font-bold text-xl text-black mb-2">
            Please wait... We are getting best option for you.
          </p>
          <PongLoader />
        </section>
      )}
      {status === "results" && (
        <section className="p-4 text-left w-full max-w-md">
          <DecisionResults data={decisionData} />
        </section>
      )}
      <Footer />
    </div>
  );
}

export default DecisionEnginePage;
