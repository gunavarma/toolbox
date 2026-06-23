"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Mode = "focus" | "shortBreak" | "longBreak";

const modeSettings = {
  focus: { label: "Focus Work", minutes: 25, color: "stroke-violet-500" },
  shortBreak: { label: "Short Break", minutes: 5, color: "stroke-emerald-400" },
  longBreak: { label: "Long Break", minutes: 15, color: "stroke-indigo-400" },
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(modeSettings.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSeconds = modeSettings[mode].minutes * 60;

  // Sync timer when mode changes
  useEffect(() => {
    setIsRunning(false);
    setSecondsLeft(modeSettings[mode].minutes * 60);
  }, [mode]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Tick execution
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    playAlarm();
    
    if (mode === "focus") {
      setCompletedSessions((prev) => prev + 1);
      setMode("shortBreak"); // Switch to break
    } else {
      setMode("focus"); // Return to work
    }
  };

  const playAlarm = () => {
    if (isMuted) return;
    try {
      // Audio synth API (avoids downloading audio files)
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // high A
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Could not play alarm synthesizer audio:", e);
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(modeSettings[mode].minutes * 60);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Compute SVG circle details
  const percentage = (secondsLeft / totalSeconds) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Mode Switch Tabs */}
      <div className="flex bg-zinc-900/60 p-1 rounded-lg border border-zinc-800/80 max-w-sm mx-auto glass">
        {(Object.keys(modeSettings) as Mode[]).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setMode(tabKey)}
            className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all duration-200 cursor-pointer ${
              mode === tabKey
                ? "bg-zinc-800 text-zinc-50 border border-zinc-700/50 shadow"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {modeSettings[tabKey].label.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Main Timer Dial */}
      <div className="w-full bg-zinc-900/35 rounded-xl border border-zinc-800 p-8 flex flex-col items-center justify-center text-center glass relative">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-850 rounded-lg transition-all duration-200"
          title={isMuted ? "Unmute Timer Alarm" : "Mute Timer Alarm"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Circular progress container */}
        <div className="relative h-56 w-56 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90 select-none">
            {/* Background trace circle */}
            <circle
              className="stroke-zinc-800/60 fill-transparent"
              strokeWidth="6"
              r={radius}
              cx="112"
              cy="112"
            />
            {/* Front progress circle */}
            <circle
              className={`${modeSettings[mode].color} fill-transparent transition-all duration-200`}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={radius}
              cx="112"
              cy="112"
            />
          </svg>

          {/* Time digits text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
            <span className="text-sm font-semibold tracking-wide text-zinc-400">
              {modeSettings[mode].label}
            </span>
            <span className="text-4xl font-bold font-mono tracking-tight text-zinc-50">
              {formatTime(secondsLeft)}
            </span>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex gap-4 mt-6 w-full max-w-xs z-10 justify-center">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Reset
          </Button>

          <Button
            variant={isRunning ? "secondary" : "primary"}
            onClick={handleStartStop}
            className="flex-1"
            leftIcon={isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
        </div>
      </div>

      {/* Session stats block */}
      <div className="glass rounded-xl border border-zinc-800/80 p-4 flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Focus Progress</span>
        <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5 font-bold">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" /> {completedSessions} focus cycles completed today
        </span>
      </div>
    </div>
  );
}
