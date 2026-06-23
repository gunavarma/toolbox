"use client";

import dynamic from "next/dynamic";
import React from "react";

export const toolComponents: Record<string, React.ComponentType<any>> = {
  // Screen Tools
  "screen/ColorScreen": dynamic(() => import("./screen/ColorScreen"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Color Screen Tool...</div>
  }),
  "screen/DeadPixelTest": dynamic(() => import("./screen/DeadPixelTest"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Dead Pixel Test...</div>
  }),
  "screen/ScreenCleaner": dynamic(() => import("./screen/ScreenCleaner"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Screen Cleaner...</div>
  }),
  "screen/FullscreenTool": dynamic(() => import("./screen/FullscreenTool"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Fullscreen Tool...</div>
  }),
  "screen/ResolutionChecker": dynamic(() => import("./screen/ResolutionChecker"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Resolution Checker...</div>
  }),

  // Time Tools
  "time/Stopwatch": dynamic(() => import("./time/Stopwatch"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Stopwatch...</div>
  }),
  "time/PomodoroTimer": dynamic(() => import("./time/PomodoroTimer"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Pomodoro...</div>
  }),

  // Calculators
  "calculators/BmiCalculator": dynamic(() => import("./calculators/BmiCalculator"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading BMI Calculator...</div>
  }),

  // Text Tools
  "text/WordCounter": dynamic(() => import("./text/WordCounter"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Word Counter...</div>
  }),
  "text/PasswordGenerator": dynamic(() => import("./text/PasswordGenerator"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Password Generator...</div>
  }),

  // Developer Tools
  "developer/JsonFormatter": dynamic(() => import("./developer/JsonFormatter"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading JSON Formatter...</div>
  }),
  "developer/RegexTester": dynamic(() => import("./developer/RegexTester"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Regex Tester...</div>
  }),

  // Image Tools
  "image/ImageCompressor": dynamic(() => import("./image/ImageCompressor"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Image Compressor...</div>
  }),

  // Productivity Tools
  "productivity/TodoList": dynamic(() => import("./productivity/TodoList"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading To Do List...</div>
  }),

  // AI Tools
  "ai/BlogTitleGenerator": dynamic(() => import("./ai/BlogTitleGenerator"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Title Generator...</div>
  }),

  // Business Tools
  "business/InvoiceGenerator": dynamic(() => import("./business/InvoiceGenerator"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Invoice Generator...</div>
  }),
  "business/QuoteGenerator": dynamic(() => import("./business/InvoiceGenerator"), {
    ssr: false,
    loading: () => <div className="py-12 text-center text-sm text-zinc-500 font-mono">Loading Quote Generator...</div>
  })
};
