"use client";

import React, { useState, useEffect } from "react";
import { Monitor, Move, RotateCw, Paintbrush, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ScreenSpecs {
  screenWidth: number;
  screenHeight: number;
  availWidth: number;
  availHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  colorDepth: number;
  orientation: string;
}

export default function ResolutionChecker() {
  const [specs, setSpecs] = useState<ScreenSpecs | null>(null);

  const calculateSpecs = () => {
    if (typeof window === "undefined") return;

    let orientStr = "Landscape";
    if (window.screen.orientation && window.screen.orientation.type) {
      orientStr = window.screen.orientation.type;
    } else if (window.innerHeight > window.innerWidth) {
      orientStr = "Portrait";
    }

    setSpecs({
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      colorDepth: window.screen.colorDepth || 24,
      orientation: orientStr,
    });
  };

  useEffect(() => {
    calculateSpecs();
    window.addEventListener("resize", calculateSpecs);
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener("change", calculateSpecs);
    }
    return () => {
      window.removeEventListener("resize", calculateSpecs);
    };
  }, []);

  if (!specs) {
    return (
      <div className="py-12 text-center text-sm text-zinc-500">
        Gathering display diagnostics...
      </div>
    );
  }

  const physicalWidth = specs.screenWidth * specs.devicePixelRatio;
  const physicalHeight = specs.screenHeight * specs.devicePixelRatio;

  return (
    <div className="space-y-6">
      {/* Prime Stat Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Physical resolution */}
        <div className="glass p-5 rounded-xl border border-zinc-800/80 flex flex-col justify-center space-y-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
            <Monitor className="h-3.5 w-3.5 text-violet-400" /> Physical Resolution
          </span>
          <span className="text-2xl font-bold text-zinc-50 tracking-tight font-mono">
            {physicalWidth} <span className="text-zinc-600 font-sans text-lg">x</span> {physicalHeight}
          </span>
          <span className="text-xs text-zinc-500">Total physical display hardware pixels</span>
        </div>

        {/* Viewport size */}
        <div className="glass p-5 rounded-xl border border-zinc-800/80 flex flex-col justify-center space-y-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
            <Move className="h-3.5 w-3.5 text-indigo-400" /> CSS Viewport Size
          </span>
          <span className="text-2xl font-bold text-zinc-50 tracking-tight font-mono">
            {specs.viewportWidth} <span className="text-zinc-600 font-sans text-lg">x</span> {specs.viewportHeight}
          </span>
          <span className="text-xs text-zinc-500">Current window sizing context</span>
        </div>

        {/* Pixel Ratio */}
        <div className="glass p-5 rounded-xl border border-zinc-800/80 flex flex-col justify-center space-y-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
            <RotateCw className="h-3.5 w-3.5 text-violet-400" /> Device Pixel Ratio
          </span>
          <span className="text-2xl font-bold text-zinc-50 tracking-tight font-mono">
            {specs.devicePixelRatio.toFixed(2)}<span className="text-zinc-600 font-sans text-lg">x</span>
          </span>
          <span className="text-xs text-zinc-500">DPI scaling ratio density</span>
        </div>
      </div>

      {/* Breakdown Details Grid */}
      <div className="glass rounded-xl border border-zinc-800/80 divide-y divide-zinc-900/60 overflow-hidden text-sm">
        <div className="flex justify-between items-center px-5 py-4">
          <span className="text-zinc-400 font-medium">Logical Screen Dimensions</span>
          <span className="font-mono text-zinc-200">{specs.screenWidth} x {specs.screenHeight} px</span>
        </div>
        <div className="flex justify-between items-center px-5 py-4">
          <span className="text-zinc-400 font-medium">Available Working Area</span>
          <span className="font-mono text-zinc-200">{specs.availWidth} x {specs.availHeight} px</span>
        </div>
        <div className="flex justify-between items-center px-5 py-4">
          <span className="text-zinc-400 font-medium">Color Bit Depth</span>
          <span className="font-mono text-zinc-200 flex items-center gap-1.5">
            <Paintbrush className="h-4 w-4 text-zinc-600" /> {specs.colorDepth} bits per pixel
          </span>
        </div>
        <div className="flex justify-between items-center px-5 py-4">
          <span className="text-zinc-400 font-medium">Screen Orientation</span>
          <span className="capitalize text-zinc-200">{specs.orientation.replace("-primary", "").replace("-secondary", "")}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={calculateSpecs} leftIcon={<RefreshCw className="h-4 w-4" />}>
          Recalculate Diagnostics
        </Button>
      </div>
    </div>
  );
}
