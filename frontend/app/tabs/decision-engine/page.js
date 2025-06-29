"use client";
import DecisionForm from "@/app/components/DecisionForm";
import Footer from "@/app/components/Footer";
import HowItWorks from "@/app/components/HowItWorks";
import Navbar from "@/app/components/NavBar";
import React from "react";

function DecisionEnginePage() {
  return (
    <div className="flex flex-col items-center j min-h-screen bg-gray-100">
      <Navbar />
      <DecisionForm />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default DecisionEnginePage;
