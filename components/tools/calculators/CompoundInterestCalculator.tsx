"use client";

import React, { useState, useEffect } from "react";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("5000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState("12"); // 12 = monthly, 1 = annually, 4 = quarterly, 365 = daily
  const [monthlyContribution, setMonthlyContribution] = useState("100");

  const [results, setResults] = useState<any>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseInt(frequency);
    const PMT = parseFloat(monthlyContribution) || 0;

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) {
      return;
    }

    const schedule: Array<{
      year: number;
      interestEarned: number;
      totalContributions: number;
      balance: number;
    }> = [];

    let currentBalance = P;
    let totalDeposits = P;

    const compoundingPeriodsPerYear = n;
    const monthlyDepositsPerYear = 12;

    // We cycle year by year to build the table
    for (let year = 1; year <= t; year++) {
      const yearStartBalance = currentBalance;
      
      // Calculate future value for the principal starting this year
      // FV = P * (1 + r/n)^n
      const principalPart = yearStartBalance * Math.pow(1 + r / compoundingPeriodsPerYear, compoundingPeriodsPerYear);
      
      // Calculate future value for the monthly contributions made this year
      // PMT * [((1 + r/n)^(n*t) - 1) / (r/n)] * (1 + r/n)  <- if annuity due (beginning of month)
      // Or standard calculation: PMT * monthly contribution annuity factor
      let contributionPart = 0;
      const ratePerMonth = r / 12;
      const months = 12;

      for (let m = 1; m <= months; m++) {
        // Each monthly contribution compounds for the remaining months of the year
        contributionPart += PMT * Math.pow(1 + r / compoundingPeriodsPerYear, (compoundingPeriodsPerYear / 12) * (months - m + 1));
      }

      currentBalance = principalPart + contributionPart;
      const totalYearlyContributions = PMT * 12;
      totalDeposits += totalYearlyContributions;
      
      const interestThisYear = currentBalance - yearStartBalance - totalYearlyContributions;

      schedule.push({
        year,
        interestEarned: Math.max(0, interestThisYear),
        totalContributions: totalDeposits,
        balance: currentBalance
      });
    }

    const futureValue = currentBalance;
    const totalInterest = futureValue - totalDeposits;

    setResults({
      futureValue: Number(futureValue.toFixed(2)),
      totalPrincipal: Number(totalDeposits.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      schedule
    });
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, years, frequency, monthlyContribution]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form controls */}
        <div className="md:col-span-1 glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-5">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="material-symbols-outlined text-primary text-lg">finance_mode</span> Parameters
          </h3>

          {/* Principal */}
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">Initial Deposit:</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono font-bold text-sm bg-white dark:bg-zinc-900"
            />
          </div>

          {/* Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-550 dark:text-zinc-400">
              <span>Annual Rate:</span>
              <span className="font-mono text-primary font-bold">{rate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Years */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-550 dark:text-zinc-400">
              <span>Duration:</span>
              <span className="font-mono text-primary font-bold">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Monthly contributions */}
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">Monthly Deposit:</span>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono font-bold text-sm bg-white dark:bg-zinc-900"
            />
          </div>

          {/* Compounding frequency */}
          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">Compounding:</span>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-xs bg-white dark:bg-zinc-900"
            >
              <option value="1">Annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        </div>

        {/* Results summaries */}
        <div className="md:col-span-2 space-y-6 flex flex-col h-full justify-between">
          {results && (
            <>
              {/* Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="layered-card p-5 rounded-xl text-center">
                  <span className="text-xl font-bold block text-zinc-800 dark:text-zinc-250 truncate">
                    {results.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Future Value</span>
                </div>
                <div className="layered-card p-5 rounded-xl text-center">
                  <span className="text-xl font-bold block text-zinc-800 dark:text-zinc-250 truncate">
                    {results.totalPrincipal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Total Principal</span>
                </div>
                <div className="layered-card p-5 rounded-xl text-center">
                  <span className="text-xl font-bold block text-zinc-850 dark:text-zinc-150 truncate">
                    {results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Total Interest</span>
                </div>
              </div>

              {/* Schedule list */}
              <div className="flex-1 space-y-2 max-h-[260px] overflow-y-auto border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-950/40">
                <h4 className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wide border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  Growth Projections
                </h4>
                <div className="space-y-1">
                  {results.schedule.map((row: any) => (
                    <div
                      key={row.year}
                      className="flex justify-between items-center text-xs font-medium py-1.5 border-b border-zinc-100/50 dark:border-zinc-900/50 last:border-none"
                    >
                      <span className="text-zinc-500 font-bold select-none">Year {row.year}</span>
                      <div className="flex gap-4 font-mono">
                        <span className="text-zinc-400 select-none text-[10px]">
                          Contr: {Math.floor(row.totalContributions).toLocaleString()}
                        </span>
                        <span className="text-zinc-800 dark:text-zinc-100 font-bold">
                          {Math.floor(row.balance).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
