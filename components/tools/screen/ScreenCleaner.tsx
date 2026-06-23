"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, Unlock, Play, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ScreenCleaner() {
  const [isActive, setIsActive] = useState(false);
  const [exitHoldTime, setExitHoldTime] = useState(0);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Block scrolling when active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  // Handle keyboard events to intercept keys and manage ESC hold
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === "Escape") {
        if (exitTimerRef.current) return; // Already tracking hold
        
        exitTimerRef.current = setInterval(() => {
          setExitHoldTime((prev) => {
            if (prev >= 100) {
              clearInterval(exitTimerRef.current!);
              exitTimerRef.current = null;
              setIsActive(false);
              return 0;
            }
            return prev + 10; // increase progress
          });
        }, 150);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === "Escape") {
        if (exitTimerRef.current) {
          clearInterval(exitTimerRef.current);
          exitTimerRef.current = null;
        }
        setExitHoldTime(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
      if (exitTimerRef.current) {
        clearInterval(exitTimerRef.current);
      }
    };
  }, [isActive]);

  // Intercept click events
  const handleOverlayInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isActive) return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      {!isActive ? (
        <div className="w-full aspect-video rounded-xl border border-zinc-800 bg-zinc-900/35 p-6 flex flex-col items-center justify-center text-center space-y-4 glass">
          <div className="h-12 w-12 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-100">Activate Screen & Keyboard Cleaner</h3>
            <p className="text-xs text-zinc-400 max-w-sm mt-1">
              Locks all screen mouse clicks and keyboard keystrokes behind a solid black screen so you can wipe smudges and dirt off safely.
            </p>
          </div>
          <Button variant="primary" onClick={() => setIsActive(true)} leftIcon={<Play className="h-4 w-4" />}>
            Activate Cleaner Mode
          </Button>
        </div>
      ) : (
        // Active Cleaner Screen (Portal overlays body)
        <div
          onClick={handleOverlayInteraction}
          onMouseDown={handleOverlayInteraction}
          onMouseUp={handleOverlayInteraction}
          onTouchStart={handleOverlayInteraction}
          onTouchEnd={handleOverlayInteraction}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-8 select-none cursor-default"
        >
          {/* Top Info Banner */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
            <Unlock className="h-4 w-4 text-violet-400" />
            <span>Wipe your display or keyboard keys now. Input is locked.</span>
          </div>

          {/* Center visual icon */}
          <div className="flex flex-col items-center text-center space-y-2 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="h-12 w-12 text-violet-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-500">CLEANER ACTIVE</span>
          </div>

          {/* Hold Escape Exit HUD */}
          <div className="flex flex-col items-center gap-2.5 max-w-xs w-full">
            <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-zinc-600" />
              <span>To exit, press and <strong>HOLD ESC</strong> key</span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-violet-600 transition-all duration-100"
                style={{ width: `${exitHoldTime}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
