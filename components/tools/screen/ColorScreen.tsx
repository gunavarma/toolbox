"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, Sliders, Palette, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";

interface ColorScreenProps {
  slug: string;
}

const colorMap: Record<string, string> = {
  "white-screen": "#ffffff",
  "black-screen": "#000000",
  "red-screen": "#ff0000",
  "green-screen": "#00ff00",
  "blue-screen": "#0000ff",
  "yellow-screen": "#ffff00",
};

export default function ColorScreen({ slug }: ColorScreenProps) {
  const defaultColor = colorMap[slug] || "#ffffff";
  const [color, setColor] = useState(defaultColor);
  const [brightness, setBrightness] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  // Sync color if slug changes
  useEffect(() => {
    setColor(colorMap[slug] || "#ffffff");
  }, [slug]);

  // Monitor fullscreen events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!screenRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await screenRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Target Color Screen Container */}
      <div
        ref={screenRef}
        className="relative w-full aspect-video rounded-xl border border-zinc-800/80 overflow-hidden flex flex-col items-center justify-center select-none"
        style={{
          backgroundColor: color,
          filter: `brightness(${brightness}%)`,
        }}
      >
        {/* Fullscreen HUD overlay (only shows on hover/click or inside fullscreen) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center text-zinc-100 gap-4">
          <div className="bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl border border-zinc-850 flex flex-col items-center gap-3">
            <p className="text-sm font-medium">
              {isFullscreen ? "Fullscreen Mode Active" : "Click Below to Go Fullscreen"}
            </p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" onClick={toggleFullscreen} leftIcon={isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}>
                {isFullscreen ? "Exit Fullscreen (Esc)" : "Go Fullscreen"}
              </Button>
            </div>
          </div>
        </div>

        {/* Small center prompt if not hovered */}
        {!isFullscreen && (
          <span
            className={`text-xs px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm pointer-events-none select-none ${
              color === "#000000" ? "text-zinc-400 border border-zinc-800" : "text-zinc-100"
            }`}
          >
            Hover to view tools controls
          </span>
        )}
      </div>

      {/* Control Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 glass">
        {/* Brightness Adjustment Slider */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <Sliders className="h-4 w-4 text-violet-400" />
            Brightness Control
          </div>
          <Slider
            min={10}
            max={100}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            valueDisplay={`${brightness}%`}
          />
        </div>

        {/* Custom Color Overrides */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <Palette className="h-4 w-4 text-violet-400" />
            Color Customizer
          </div>
          <div className="flex items-center gap-3.5">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-9 w-12 rounded border border-zinc-800 bg-zinc-900 cursor-pointer"
            />
            <div className="text-xs text-zinc-400">
              <span className="font-mono text-zinc-300 font-semibold">{color.toUpperCase()}</span>
              <p>Drag selector to customize solid testing colors.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Use Info */}
      <div className="flex gap-3 p-4 rounded-lg bg-violet-600/10 border border-violet-500/20 text-xs text-zinc-400">
        <Info className="h-4.5 w-4.5 text-violet-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>How to test:</strong> Use solid colors to inspect panel backlight leaks (in dark rooms), find stuck subpixels, check color reproduction grids, or remove dust manually. Toggle fullscreen to completely isolate browser bars.
        </p>
      </div>
    </div>
  );
}
