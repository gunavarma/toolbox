"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FullscreenTool() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supportStatus, setSupportStatus] = useState<"checking" | "supported" | "unsupported">("checking");
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check support status on mount
    if (typeof document !== "undefined") {
      const hasSupport = !!(
        document.fullscreenEnabled ||
        (document as any).webkitFullscreenEnabled ||
        (document as any).mozFullScreenEnabled ||
        (document as any).msFullscreenEnabled
      );
      setSupportStatus(hasSupport ? "supported" : "unsupported");
    }

    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!testRef.current) return;
    try {
      if (!document.fullscreenElement) {
        if (testRef.current.requestFullscreen) {
          await testRef.current.requestFullscreen();
        } else if ((testRef.current as any).webkitRequestFullscreen) {
          await (testRef.current as any).webkitRequestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling Fullscreen:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Panel */}
      <div
        ref={testRef}
        className={`w-full aspect-video rounded-xl border flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 ${
          isFullscreen
            ? "bg-black border-none"
            : "bg-zinc-900/35 border-zinc-800 glass"
        }`}
      >
        <div className="max-w-md bg-zinc-950/80 backdrop-blur-md p-6 rounded-xl border border-zinc-850 flex flex-col items-center gap-4 shadow-2xl">
          <div className="flex items-center gap-2 text-sm font-semibold">
            {supportStatus === "supported" ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="h-4 w-4" /> Fullscreen Supported
              </span>
            ) : supportStatus === "unsupported" ? (
              <span className="flex items-center gap-1.5 text-red-400">
                <AlertTriangle className="h-4 w-4" /> Unsupported Browser API
              </span>
            ) : (
              <span className="text-zinc-500">Checking API compatibility...</span>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-zinc-100">
              {isFullscreen ? "Fullscreen Mode Active" : "Test Browser Fullscreen"}
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5">
              Click the button below to toggle fullscreen. This checks if your browser sandbox allows requesting fullscreen windows via user gestures.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={toggleFullscreen}
            leftIcon={isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          >
            {isFullscreen ? "Exit Fullscreen (Esc)" : "Go Fullscreen"}
          </Button>
        </div>
      </div>
    </div>
  );
}
