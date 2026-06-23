"use client";

import React, { useState, useEffect } from "react";
import { Calculator, Info, Scale } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";

type UnitSystem = "metric" | "imperial";

export default function BmiCalculator() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  
  // Metric States
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(170);

  // Imperial States
  const [weightLbs, setWeightLbs] = useState(150);
  const [heightIn, setHeightIn] = useState(68); // 5ft 8in

  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    let result = 0;
    if (unit === "metric") {
      const heightM = heightCm / 100;
      result = weightKg / (heightM * heightM);
    } else {
      result = (weightLbs / (heightIn * heightIn)) * 703;
    }
    setBmi(result);
  };

  useEffect(() => {
    calculateBmi();
  }, [unit, weightKg, heightCm, weightLbs, heightIn]);

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    if (val < 25) return { label: "Healthy Weight", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    if (val < 30) return { label: "Overweight", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    return { label: "Obese", color: "text-red-400 bg-red-500/10 border-red-500/20" };
  };

  const getBmiPercentPosition = (val: number) => {
    // clamp between 15 and 35 BMI for display placement
    const minBmi = 15;
    const maxBmi = 35;
    const percentage = ((val - minBmi) / (maxBmi - minBmi)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  const getIdealWeightRange = () => {
    if (unit === "metric") {
      const heightM = heightCm / 100;
      const minKg = 18.5 * (heightM * heightM);
      const maxKg = 24.9 * (heightM * heightM);
      return `${minKg.toFixed(1)} - ${maxKg.toFixed(1)} kg`;
    } else {
      const minLbs = (18.5 * (heightIn * heightIn)) / 703;
      const maxLbs = (24.9 * (heightIn * heightIn)) / 703;
      return `${minLbs.toFixed(1)} - ${maxLbs.toFixed(1)} lbs`;
    }
  };

  const activeCategory = bmi ? getBmiCategory(bmi) : null;

  return (
    <div className="space-y-6">
      {/* Unit Selector */}
      <div className="flex bg-zinc-900/60 p-1 rounded-lg border border-zinc-800/80 max-w-xs mx-auto glass">
        <button
          onClick={() => setUnit("metric")}
          className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all duration-200 cursor-pointer ${
            unit === "metric"
              ? "bg-zinc-800 text-zinc-50 border border-zinc-700/50 shadow"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Metric (kg / cm)
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all duration-200 cursor-pointer ${
            unit === "imperial"
              ? "bg-zinc-800 text-zinc-50 border border-zinc-700/50 shadow"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Imperial (lbs / in)
        </button>
      </div>

      {/* Inputs sliders */}
      <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-6">
        {unit === "metric" ? (
          <>
            {/* Height (cm) */}
            <Slider
              label="Height"
              min={100}
              max={230}
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              valueDisplay={`${heightCm} cm`}
            />

            {/* Weight (kg) */}
            <Slider
              label="Weight"
              min={30}
              max={180}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              valueDisplay={`${weightKg} kg`}
            />
          </>
        ) : (
          <>
            {/* Height (inches) */}
            <Slider
              label="Height"
              min={36}
              max={96}
              value={heightIn}
              onChange={(e) => setHeightIn(Number(e.target.value))}
              valueDisplay={`${Math.floor(heightIn / 12)}' ${heightIn % 12}&ldquo; (${heightIn} in)`}
            />

            {/* Weight (lbs) */}
            <Slider
              label="Weight"
              min={60}
              max={400}
              value={weightLbs}
              onChange={(e) => setWeightLbs(Number(e.target.value))}
              valueDisplay={`${weightLbs} lbs`}
            />
          </>
        )}
      </div>

      {/* BMI Display & Gauge */}
      {bmi && (
        <div className="w-full bg-zinc-900/35 rounded-xl border border-zinc-800 p-6 flex flex-col items-center justify-center text-center glass relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>

          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5 mb-1.5 z-10">
            <Scale className="h-4 w-4 text-violet-400" /> Body Mass Index Results
          </span>

          <div className="text-4xl font-bold font-mono tracking-tight text-zinc-50 z-10">
            {bmi.toFixed(1)}
          </div>

          {/* Category Tag */}
          <div className={`mt-2.5 px-3 py-1 rounded-full text-xs font-semibold border z-10 transition-all duration-200 ${activeCategory?.color}`}>
            {activeCategory?.label}
          </div>

          {/* Visual Slider Scale Gauge */}
          <div className="w-full mt-8 max-w-sm z-10 space-y-1.5">
            <div className="relative w-full h-2 bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-red-500 rounded-full">
              {/* Placement pin */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-4.5 w-4.5 rounded-full border-2 border-zinc-950 bg-zinc-50 shadow-md transition-all duration-300"
                style={{ left: `calc(${getBmiPercentPosition(bmi)}% - 9px)` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-zinc-500 font-bold px-1 uppercase tracking-wide">
              <span>Under (18.5)</span>
              <span>Healthy (22)</span>
              <span>Over (25)</span>
              <span>Obese (30+)</span>
            </div>
          </div>
        </div>
      )}

      {/* Ideal Weight range information */}
      <div className="glass rounded-xl border border-zinc-800/80 p-4 divide-y divide-zinc-900/60 text-xs">
        <div className="flex justify-between py-2 items-center">
          <span className="text-zinc-500 font-semibold uppercase tracking-wider">Ideal Healthy Weight</span>
          <span className="font-mono text-zinc-300 font-bold">{getIdealWeightRange()}</span>
        </div>
        <div className="flex justify-between py-2 items-center">
          <span className="text-zinc-500 font-semibold uppercase tracking-wider">Formula Used</span>
          <span className="text-zinc-400">Standard WHO BMI equation (W / H&sup2;)</span>
        </div>
      </div>
    </div>
  );
}
