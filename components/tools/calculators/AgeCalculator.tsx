"use client";

import React, { useState, useEffect } from "react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [results, setResults] = useState<any>(null);
  const [countdown, setCountdown] = useState<any>(null);

  // Zodiac Sign helper
  const getZodiac = (day: number, month: number) => {
    const signs = [
      { name: "Capricorn", date: 20 },
      { name: "Aquarius", date: 19 },
      { name: "Pisces", date: 20 },
      { name: "Aries", date: 20 },
      { name: "Taurus", date: 21 },
      { name: "Gemini", date: 21 },
      { name: "Cancer", date: 22 },
      { name: "Leo", date: 22 },
      { name: "Virgo", date: 23 },
      { name: "Libra", date: 23 },
      { name: "Scorpio", date: 22 },
      { name: "Sagittarius", date: 21 }
    ];
    const sign = (month === 12 && day >= 22) || (month === 1 && day <= 19)
      ? "Capricorn"
      : day > signs[month - 1].date
      ? signs[month].name
      : signs[month - 1].name;
    
    const icons: Record<string, string> = {
      Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
      Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
      Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓"
    };
    return { name: sign, icon: icons[sign] };
  };

  // Chinese Zodiac helper
  const getChineseZodiac = (year: number) => {
    const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    const emojis = ["🐀", "🐂", "🐅", "🐇", "🐉", "🐍", "🐎", "🐐", "🐒", "🐓", "🐕", "🐖"];
    const index = (year - 4) % 12;
    return { name: animals[index], emoji: emojis[index] };
  };

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) {
      alert("Birth date cannot be in the future.");
      return;
    }

    // Years, Months, Days Difference
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total units elapsed
    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    // Next Birthday Countdown Calculation
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (now > nextBirthday) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const zodiac = getZodiac(birth.getDate(), birth.getMonth() + 1);
    const chineseZodiac = getChineseZodiac(birth.getFullYear());

    setResults({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      zodiac,
      chineseZodiac,
      nextBirthdayTime: nextBirthday.getTime()
    });
  };

  // Run next birthday live ticker countdown
  useEffect(() => {
    if (!results?.nextBirthdayTime) return;

    const timer = setInterval(() => {
      const distance = results.nextBirthdayTime - new Date().getTime();
      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [results]);

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-4">
      {/* Input section */}
      <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Select Birth Date</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-zinc-800 dark:text-zinc-100"
            />
          </div>
          <button
            onClick={calculateAge}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all text-sm shrink-0"
          >
            Calculate Age
          </button>
        </div>
      </div>

      {results && (
        <div className="space-y-6">
          {/* Main Results Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="layered-card p-6 rounded-2xl text-center space-y-1">
              <span className="text-4xl md:text-5xl font-black text-primary">{results.years}</span>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Years Old</p>
            </div>
            <div className="layered-card p-6 rounded-2xl text-center space-y-1">
              <span className="text-4xl md:text-5xl font-black text-primary">{results.months}</span>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Months</p>
            </div>
            <div className="layered-card p-6 rounded-2xl text-center space-y-1">
              <span className="text-4xl md:text-5xl font-black text-primary">{results.days}</span>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Days</p>
            </div>
          </div>

          {/* Next Birthday live Countdown */}
          {countdown && (
            <div className="glass p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">cake</span> Next Birthday Countdown
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-surface-container-low dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
                  <span className="block text-xl md:text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">{countdown.days}</span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Days</span>
                </div>
                <div className="bg-surface-container-low dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
                  <span className="block text-xl md:text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">{countdown.hours}</span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Hours</span>
                </div>
                <div className="bg-surface-container-low dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
                  <span className="block text-xl md:text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">{countdown.minutes}</span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Mins</span>
                </div>
                <div className="bg-surface-container-low dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
                  <span className="block text-xl md:text-2xl font-extrabold text-zinc-800 dark:text-zinc-100">{countdown.seconds}</span>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Secs</span>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Statistics List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3.5">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">calendar_today</span> Age in Other Units
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-650 dark:text-zinc-400">
                <li className="flex justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                  <span>Total Weeks:</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-100">{results.totalWeeks.toLocaleString()}</span>
                </li>
                <li className="flex justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                  <span>Total Days:</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-100">{results.totalDays.toLocaleString()}</span>
                </li>
                <li className="flex justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                  <span>Total Hours:</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-100">{results.totalHours.toLocaleString()}</span>
                </li>
                <li className="flex justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                  <span>Total Minutes:</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-100">{results.totalMinutes.toLocaleString()}</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span>Total Seconds:</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-100">{results.totalSeconds.toLocaleString()}</span>
                </li>
              </ul>
            </div>

            {/* Zodiac details card */}
            <div className="glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3.5">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">star_rate</span> Astrological Details
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-650 dark:text-zinc-400">
                <li className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                  <span>Zodiac Sign:</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-100 flex items-center gap-1.5">
                    <span className="text-base text-violet-500">{results.zodiac.icon}</span> {results.zodiac.name}
                  </span>
                </li>
                <li className="flex items-center justify-between pb-1">
                  <span>Chinese Zodiac Year:</span>
                  <span className="font-bold text-zinc-850 dark:text-zinc-100 flex items-center gap-1.5">
                    <span className="text-base">{results.chineseZodiac.emoji}</span> {results.chineseZodiac.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
