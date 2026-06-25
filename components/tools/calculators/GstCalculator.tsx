"use client";

import React, { useState, useEffect } from "react";

export default function GstCalculator() {
  const [baseAmount, setBaseAmount] = useState("1000");
  const [gstRate, setGstRate] = useState("18");
  const [isInclusive, setIsInclusive] = useState(false);
  const [customRate, setCustomRate] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("18");

  const [results, setResults] = useState({
    basePrice: 0,
    gstAmount: 0,
    cgst: 0,
    sgst: 0,
    totalPrice: 0
  });

  const presets = ["5", "12", "18", "28"];

  const handlePresetSelect = (rate: string) => {
    setSelectedPreset(rate);
    setGstRate(rate);
    setCustomRate("");
  };

  const handleCustomRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomRate(val);
    setSelectedPreset("");
    if (val && !isNaN(parseFloat(val))) {
      setGstRate(val);
    }
  };

  useEffect(() => {
    const amount = parseFloat(baseAmount);
    const rate = parseFloat(gstRate);

    if (isNaN(amount) || isNaN(rate)) {
      setResults({ basePrice: 0, gstAmount: 0, cgst: 0, sgst: 0, totalPrice: 0 });
      return;
    }

    let basePrice = 0;
    let gstAmount = 0;
    let totalPrice = 0;

    if (isInclusive) {
      // Amount is inclusive of tax
      basePrice = amount / (1 + rate / 100);
      gstAmount = amount - basePrice;
      totalPrice = amount;
    } else {
      // Amount is exclusive of tax
      basePrice = amount;
      gstAmount = (amount * rate) / 100;
      totalPrice = amount + gstAmount;
    }

    setResults({
      basePrice: Number(basePrice.toFixed(2)),
      gstAmount: Number(gstAmount.toFixed(2)),
      cgst: Number((gstAmount / 2).toFixed(2)),
      sgst: Number((gstAmount / 2).toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2))
    });
  }, [baseAmount, gstRate, isInclusive]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs panel */}
        <div className="glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-5">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="material-symbols-outlined text-primary text-lg">payments</span> Input Pricing
          </h3>

          {/* Base amount */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">Base Amount:</span>
            <input
              type="number"
              value={baseAmount}
              onChange={(e) => setBaseAmount(e.target.value)}
              placeholder="e.g. 1000"
              className="w-full px-4 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono font-bold text-zinc-800 dark:text-zinc-100 text-sm"
            />
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">GST Tax Rate (%):</span>
            <div className="grid grid-cols-5 gap-2">
              {presets.map((rate) => (
                <button
                  key={rate}
                  onClick={() => handlePresetSelect(rate)}
                  className={`py-2 text-center rounded-lg border font-bold text-xs transition-all ${
                    selectedPreset === rate
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                  }`}
                >
                  {rate}%
                </button>
              ))}
              {/* Custom rate */}
              <input
                type="number"
                value={customRate}
                onChange={handleCustomRateChange}
                placeholder="Custom"
                className="w-full text-center px-1 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900"
              />
            </div>
          </div>

          {/* Mode */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">GST Mode:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setIsInclusive(false)}
                className={`py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                  !isInclusive
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                }`}
              >
                Exclusive of Tax
              </button>
              <button
                onClick={() => setIsInclusive(true)}
                className={`py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                  isInclusive
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                }`}
              >
                Inclusive of Tax
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span className="material-symbols-outlined text-primary text-lg">receipt_long</span> Tax Details
            </h3>

            <div className="space-y-3.5 text-xs text-zinc-650 dark:text-zinc-400">
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-850 pb-2">
                <span>Net Price (excluding Tax):</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100">
                  {results.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-850 pb-2">
                <span>GST Tax Amount ({gstRate}%):</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100">
                  {results.gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-850 pb-2 pl-4 text-[10px] opacity-75">
                <span>CGST (50% Central):</span>
                <span className="font-mono font-bold">
                  {results.cgst.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-850 pb-2 pl-4 text-[10px] opacity-75">
                <span>SGST (50% State):</span>
                <span className="font-mono font-bold">
                  {results.sgst.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Total Price:</span>
            <span className="font-mono font-black text-2xl text-primary">
              {results.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
