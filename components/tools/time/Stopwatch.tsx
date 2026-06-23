"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flag, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Lap {
  lapNum: number;
  lapTime: number;
  overallTime: number;
}

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, []);

  const updateTime = () => {
    const now = Date.now();
    const currentElapsed = now - startTimeRef.current + elapsedTimeRef.current;
    setTime(currentElapsed);
    timerRef.current = requestAnimationFrame(updateTime);
  };

  const handleStartStop = () => {
    if (isRunning) {
      // Stop
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      elapsedTimeRef.current = time;
      setIsRunning(false);
    } else {
      // Start
      startTimeRef.current = Date.now();
      setIsRunning(true);
      timerRef.current = requestAnimationFrame(updateTime);
    }
  };

  const handleReset = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setIsRunning(false);
    setTime(0);
    elapsedTimeRef.current = 0;
    setLaps([]);
  };

  const handleLap = () => {
    const lapNum = laps.length + 1;
    const lastLapTime = laps.length > 0 ? laps[0].overallTime : 0;
    const lapTime = time - lastLapTime;

    const newLap: Lap = {
      lapNum,
      lapTime,
      overallTime: time,
    };

    setLaps([newLap, ...laps]); // Add newest lap to top
  };

  const formatTime = (totalMs: number) => {
    const min = Math.floor(totalMs / 60000);
    const sec = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);

    const minStr = min.toString().padStart(2, "0");
    const secStr = sec.toString().padStart(2, "0");
    const msStr = ms.toString().padStart(2, "0");

    return { minStr, secStr, msStr };
  };

  const { minStr, secStr, msStr } = formatTime(time);

  return (
    <div className="space-y-6">
      {/* Stopwatch digital panel */}
      <div className="w-full bg-zinc-900/35 rounded-xl border border-zinc-800 p-8 flex flex-col items-center justify-center text-center glass relative overflow-hidden">
        {/* Glow behind stats */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>

        <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5 mb-2 z-10">
          <Clock className="h-4 w-4 text-violet-400" /> Stopwatch Ticker
        </span>

        {/* Digital numbers */}
        <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-zinc-50 z-10 flex items-baseline">
          <span>{minStr}</span>
          <span className="text-violet-500 text-4xl mx-1 animate-pulse">:</span>
          <span>{secStr}</span>
          <span className="text-zinc-600 text-3xl font-normal mx-1">.</span>
          <span className="text-violet-400 text-4xl font-normal">{msStr}</span>
        </div>

        {/* Actions layout */}
        <div className="flex justify-center gap-3.5 mt-8 w-full max-w-xs z-10">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Reset
          </Button>

          <Button
            variant={isRunning ? "danger" : "primary"}
            onClick={handleStartStop}
            className="flex-1"
            leftIcon={isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          >
            {isRunning ? "Stop" : "Start"}
          </Button>

          <Button
            variant="outline"
            onClick={handleLap}
            disabled={!isRunning}
            className="flex-1"
            leftIcon={<Flag className="h-4 w-4" />}
          >
            Lap
          </Button>
        </div>
      </div>

      {/* Laps List Section */}
      {laps.length > 0 && (
        <div className="glass rounded-xl border border-zinc-800/80 p-5 space-y-4">
          <h4 className="text-sm font-bold text-zinc-300">Logged Lap Splits</h4>
          <div className="max-h-[220px] overflow-y-auto divide-y divide-zinc-900/60 scrollbar-custom pr-2">
            {laps.map((lap) => {
              const formattedLap = formatTime(lap.lapTime);
              const formattedTotal = formatTime(lap.overallTime);
              return (
                <div key={lap.lapNum} className="flex justify-between items-center py-2.5 text-sm">
                  <span className="text-zinc-500 font-semibold font-mono">LAP #{lap.lapNum}</span>
                  <div className="flex gap-6">
                    <div className="text-right">
                      <span className="text-xs text-zinc-500 block">Lap Time</span>
                      <span className="font-mono text-zinc-300">
                        {formattedLap.minStr}:{formattedLap.secStr}.{formattedLap.msStr}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-zinc-500 block">Overall</span>
                      <span className="font-mono text-violet-400 font-semibold">
                        {formattedTotal.minStr}:{formattedTotal.secStr}.{formattedTotal.msStr}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
