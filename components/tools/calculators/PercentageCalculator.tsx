"use client";

import React, { useState, useEffect } from "react";

export default function PercentageCalculator() {
  // Calculation 1: What is X% of Y?
  const [c1Pct, setC1Pct] = useState("10");
  const [c1Val, setC1Val] = useState("100");
  const [c1Result, setC1Result] = useState<number | null>(null);

  // Calculation 2: X is what percent of Y?
  const [c2Val1, setC2Val1] = useState("25");
  const [c2Val2, setC2Val2] = useState("200");
  const [c2Result, setC2Result] = useState<number | null>(null);

  // Calculation 3: Percentage increase/decrease from X to Y?
  const [c3Val1, setC3Val1] = useState("100");
  const [c3Val2, setC3Val2] = useState("150");
  const [c3Result, setC3Result] = useState<number | null>(null);
  const [c3Type, setC3Type] = useState<"increase" | "decrease">("increase");

  // Calculation 4: Add/Subtract X% from Y?
  const [c4Pct, setC4Pct] = useState("15");
  const [c4Val, setC4Val] = useState("200");
  const [c4Op, setC4Op] = useState<"add" | "sub">("add");
  const [c4Result, setC4Result] = useState<number | null>(null);

  // Run Calculations in Realtime
  useEffect(() => {
    // 1
    const p1 = parseFloat(c1Pct);
    const v1 = parseFloat(c1Val);
    if (!isNaN(p1) && !isNaN(v1)) {
      setC1Result((p1 / 100) * v1);
    } else {
      setC1Result(null);
    }
  }, [c1Pct, c1Val]);

  useEffect(() => {
    // 2
    const v1 = parseFloat(c2Val1);
    const v2 = parseFloat(c2Val2);
    if (!isNaN(v1) && !isNaN(v2) && v2 !== 0) {
      setC2Result((v1 / v2) * 100);
    } else {
      setC2Result(null);
    }
  }, [c2Val1, c2Val2]);

  useEffect(() => {
    // 3
    const v1 = parseFloat(c3Val1);
    const v2 = parseFloat(c3Val2);
    if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
      const diff = v2 - v1;
      const pct = (diff / v1) * 100;
      setC3Result(Math.abs(pct));
      setC3Type(pct >= 0 ? "increase" : "decrease");
    } else {
      setC3Result(null);
    }
  }, [c3Val1, c3Val2]);

  useEffect(() => {
    // 4
    const p4 = parseFloat(c4Pct);
    const v4 = parseFloat(c4Val);
    if (!isNaN(p4) && !isNaN(v4)) {
      const delta = (p4 / 100) * v4;
      setC4Result(c4Op === "add" ? v4 + delta : v4 - delta);
    } else {
      setC4Result(null);
    }
  }, [c4Pct, c4Val, c4Op]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      {/* Grid of calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Calc 1 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
            1. Calculate Value Percentage
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-500 min-w-[50px]">What is</span>
              <input
                type="number"
                value={c1Pct}
                onChange={(e) => setC1Pct(e.target.value)}
                className="w-20 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
              <span className="text-sm font-semibold text-zinc-500">% of</span>
              <input
                type="number"
                value={c1Val}
                onChange={(e) => setC1Val(e.target.value)}
                className="w-28 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
              <span className="text-sm font-semibold text-zinc-500">?</span>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-sm">
              <span className="font-semibold text-zinc-550 dark:text-zinc-400">Result:</span>
              <span className="font-mono font-black text-primary text-base">
                {c1Result !== null ? c1Result.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Calc 2 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
            2. Calculate Ratio Percentage
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={c2Val1}
                onChange={(e) => setC2Val1(e.target.value)}
                className="w-20 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
              <span className="text-sm font-semibold text-zinc-500">is what % of</span>
              <input
                type="number"
                value={c2Val2}
                onChange={(e) => setC2Val2(e.target.value)}
                className="w-24 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
              <span className="text-sm font-semibold text-zinc-500">?</span>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-sm">
              <span className="font-semibold text-zinc-550 dark:text-zinc-400">Result:</span>
              <span className="font-mono font-black text-primary text-base">
                {c2Result !== null ? `${c2Result.toLocaleString(undefined, { maximumFractionDigits: 4 })}%` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Calc 3 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
            3. Percentage Increase/Decrease
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-zinc-500">From</span>
              <input
                type="number"
                value={c3Val1}
                onChange={(e) => setC3Val1(e.target.value)}
                className="w-24 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
              <span className="text-sm font-semibold text-zinc-500">to</span>
              <input
                type="number"
                value={c3Val2}
                onChange={(e) => setC3Val2(e.target.value)}
                className="w-24 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-sm">
              <span className="font-semibold text-zinc-550 dark:text-zinc-400">Result:</span>
              <span className="font-mono font-black text-base flex items-center gap-1.5">
                {c3Result !== null ? (
                  <>
                    <span className={c3Type === "increase" ? "text-green-500" : "text-red-500"}>
                      {c3Result.toLocaleString(undefined, { maximumFractionDigits: 4 })}%
                    </span>
                    <span className="text-xs text-zinc-450 uppercase font-sans font-bold">
                      {c3Type}
                    </span>
                  </>
                ) : (
                  "—"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Calc 4 */}
        <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
            4. Add/Subtract Percentage
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <select
                value={c4Op}
                onChange={(e) => setC4Op(e.target.value as "add" | "sub")}
                className="px-2 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold bg-white dark:bg-zinc-900"
              >
                <option value="add">Add</option>
                <option value="sub">Subtract</option>
              </select>
              <input
                type="number"
                value={c4Pct}
                onChange={(e) => setC4Pct(e.target.value)}
                className="w-16 px-2 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
              <span className="text-sm font-semibold text-zinc-500">% to/from</span>
              <input
                type="number"
                value={c4Val}
                onChange={(e) => setC4Val(e.target.value)}
                className="w-24 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center font-mono font-bold"
              />
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-sm">
              <span className="font-semibold text-zinc-550 dark:text-zinc-400">Result:</span>
              <span className="font-mono font-black text-primary text-base">
                {c4Result !== null ? c4Result.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
