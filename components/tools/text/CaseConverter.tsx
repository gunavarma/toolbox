"use client";

import React, { useState } from "react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const getWordCharCount = () => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { chars, words };
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };

  const handleTitleCase = () => {
    const title = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(title);
  };

  const handleSentenceCase = () => {
    // Capitalize first letter of sentences
    const sentences = text
      .toLowerCase()
      .split(/([.!?]\s+)/)
      .map((seg, idx) => {
        if (idx % 2 === 0 && seg) {
          return seg.charAt(0).toUpperCase() + seg.slice(1);
        }
        return seg;
      })
      .join("");
    setText(sentences);
  };

  const handleAlternatingCase = () => {
    const alt = text
      .split("")
      .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
    setText(alt);
  };

  const counts = getWordCharCount();

  return (
    <div className="space-y-4 max-w-3xl mx-auto py-2 px-4 sm:px-0">
      {/* Action panel bar */}
      <div className="flex flex-col sm:flex-row gap-2 p-2.5 sm:p-3 bg-surface-container-low/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-lg sm:rounded-xl justify-between items-stretch sm:items-center">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-zinc-700 dark:text-zinc-300">
          <button
            onClick={handleUppercase}
            disabled={!text}
            className="px-2 sm:px-3.5 py-1.5 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all h-8 sm:h-9"
          >
            <span className="hidden sm:inline">UPPERCASE</span>
            <span className="sm:hidden">Upper</span>
          </button>
          <button
            onClick={handleLowercase}
            disabled={!text}
            className="px-2 sm:px-3.5 py-1.5 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all h-8 sm:h-9"
          >
            <span className="hidden sm:inline">lowercase</span>
            <span className="sm:hidden">Lower</span>
          </button>
          <button
            onClick={handleTitleCase}
            disabled={!text}
            className="px-2 sm:px-3.5 py-1.5 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all h-8 sm:h-9"
          >
            <span className="hidden sm:inline">Title Case</span>
            <span className="sm:hidden">Title</span>
          </button>
          <button
            onClick={handleSentenceCase}
            disabled={!text}
            className="px-2 sm:px-3.5 py-1.5 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all h-8 sm:h-9"
          >
            <span className="hidden sm:inline">Sentence case</span>
            <span className="sm:hidden">Sent.</span>
          </button>
          <button
            onClick={handleAlternatingCase}
            disabled={!text}
            className="px-2 sm:px-3.5 py-1.5 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all h-8 sm:h-9"
          >
            <span className="hidden sm:inline">AlTeRnAtInG</span>
            <span className="sm:hidden">Alt.</span>
          </button>
        </div>

        <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary text-white font-bold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-[10px] sm:text-xs transition-all active:scale-95 flex-1 sm:flex-none h-8 sm:h-9 justify-center"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? "check" : "content_copy"}
            </span>
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            <span className="sm:hidden">{copied ? "✓" : "Copy"}</span>
          </button>
          <button
            onClick={() => setText("")}
            disabled={!text}
            className="px-2 sm:px-3 py-1.5 sm:py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg text-[10px] sm:text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-zinc-300 dark:hover:bg-zinc-750 flex-1 sm:flex-none h-8 sm:h-9"
          >
            <span className="hidden sm:inline">Clear</span>
            <span className="sm:hidden">✕</span>
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="space-y-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type, paste, or draft your text paragraph lines here to format case cases..."
          className="w-full h-60 sm:h-80 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 resize-none font-sans"
        />
        <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-zinc-400 font-mono px-1">
          <span>Words: {counts.words.toLocaleString()}</span>
          <span>Characters: {counts.chars.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
