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
    <div className="space-y-4 max-w-3xl mx-auto py-2">
      {/* Action panel bar */}
      <div className="flex flex-wrap gap-2 p-3 bg-surface-container-low/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-xl justify-between items-center">
        <div className="flex flex-wrap gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
          <button
            onClick={handleUppercase}
            disabled={!text}
            className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            UPPERCASE
          </button>
          <button
            onClick={handleLowercase}
            disabled={!text}
            className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            lowercase
          </button>
          <button
            onClick={handleTitleCase}
            disabled={!text}
            className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Title Case
          </button>
          <button
            onClick={handleSentenceCase}
            disabled={!text}
            className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Sentence case
          </button>
          <button
            onClick={handleAlternatingCase}
            disabled={!text}
            className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            AlTeRnAtInG
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-1 px-3 py-2 bg-primary text-white font-bold rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? "check" : "content_copy"}
            </span>
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={() => setText("")}
            disabled={!text}
            className="px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-zinc-300 dark:hover:bg-zinc-750"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="space-y-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type, paste, or draft your text paragraph lines here to format case cases..."
          className="w-full h-80 px-4 py-3 rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-zinc-800 dark:text-zinc-100 resize-none font-sans"
        />
        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono px-1">
          <span>Words: {counts.words.toLocaleString()}</span>
          <span>Characters: {counts.chars.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
