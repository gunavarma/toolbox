"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Play, ChevronRight, CornerDownLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

const cycleColors = [
  { name: "White Screen", hex: "#ffffff" },
  { name: "Black Screen (Backlight Bleed)", hex: "#000000" },
  { name: "Red Sub-pixel Test", hex: "#ff0000" },
  { name: "Green Sub-pixel Test", hex: "#00ff00" },
  { name: "Blue Sub-pixel Test", hex: "#0000ff" },
];

export default function DeadPixelTest() {
  const [activeStep, setActiveStep] = useState(-1); // -1 means initial dashboard
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      if (!isFs) {
        setActiveStep(-1); // reset if exit fullscreen
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const startTest = async () => {
    if (!containerRef.current) return;
    try {
      await containerRef.current.requestFullscreen();
      setActiveStep(0);
    } catch (err) {
      console.error("Failed to go fullscreen for Dead Pixel Test:", err);
      // Fallback if browser blocks fullscreen
      setActiveStep(0);
    }
  };

  const handleScreenClick = () => {
    if (activeStep === -1) return;
    if (activeStep < cycleColors.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      // Exit test
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setActiveStep(-1);
    }
  };

  const currentTest = activeStep >= 0 ? cycleColors[activeStep] : null;

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Test Area Container */}
      {activeStep === -1 ? (
        // Dashboard Layout
        <div className="w-full aspect-video rounded-xl border border-zinc-800 bg-zinc-900/35 p-6 flex flex-col items-center justify-center text-center space-y-4 glass">
          <div className="h-12 w-12 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Maximize2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-100">Ready to Start Dead Pixel Test?</h3>
            <p className="text-xs text-zinc-400 max-w-sm mt-1">
              The test runs in fullscreen mode and cycles through solid colors. Inspect your panel closely for black spots (dead pixels) or bright spots (stuck pixels).
            </p>
          </div>
          <Button variant="primary" onClick={startTest} leftIcon={<Play className="h-4 w-4" />}>
            Start Fullscreen Test
          </Button>
        </div>
      ) : (
        // Interactive Fullscreen Cycle Layer
        <div
          onClick={handleScreenClick}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 select-none cursor-pointer"
          style={{ backgroundColor: currentTest?.hex }}
        >
          {/* Top HUD bar */}
          <div className="w-full flex justify-between items-center bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-lg border border-zinc-800/50 max-w-lg shadow-xl self-center text-zinc-100">
            <span className="text-xs font-semibold tracking-wide uppercase text-zinc-400">
              Step {activeStep + 1} of {cycleColors.length}
            </span>
            <span className="text-sm font-bold text-zinc-100">{currentTest?.name}</span>
          </div>

          {/* Prompt in center (briefly flashes or appears bottom) */}
          <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-lg border border-zinc-800/50 flex items-center gap-1.5 text-xs text-zinc-300 shadow-xl self-center">
            <CornerDownLeft className="h-4 w-4 text-violet-400 animate-pulse" />
            <span>Click anywhere to cycle colors. Press ESC to exit.</span>
          </div>
        </div>
      )}

      {/* Guide Info */}
      <div className="flex gap-3 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400">
        <Info className="h-4.5 w-4.5 text-zinc-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-zinc-300">What to look for during cycle steps:</h4>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>White and Light Screens:</strong> Look for dark dots (dead pixels) or shadows.</li>
            <li><strong>Black Screen:</strong> Look for glowing red, green, or blue subpixels (stuck pixels) or light bleeding near the edges of the display.</li>
            <li><strong>Red, Green, and Blue Screens:</strong> Verify that individual subpixels are firing uniformly across the screen canvas.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
