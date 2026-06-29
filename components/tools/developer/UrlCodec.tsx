"use client";

import React, { useState } from "react";

export default function UrlCodec() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [encodeMode, setEncodeMode] = useState<"standard" | "all">("standard");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProcess = (text: string, currentMode = mode) => {
    if (!text) {
      setOutputText("");
      return;
    }

    try {
      if (currentMode === "encode") {
        if (encodeMode === "standard") {
          // Standard URI Component encoding
          setOutputText(encodeURIComponent(text));
        } else {
          // Encode literally every character including letters/numbers for absolute safety
          const encoded = text
            .split("")
            .map((char) => {
              const code = char.charCodeAt(0).toString(16).toUpperCase();
              return "%" + (code.length < 2 ? "0" + code : code);
            })
            .join("");
          setOutputText(encoded);
        }
      } else {
        // Decode URI component
        setOutputText(decodeURIComponent(text));
      }
    } catch (e) {
      setOutputText("Error: Invalid URI formatting parameters. Please verify input % tokens.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    handleProcess(val);
  };

  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto py-2 px-4 sm:px-0">
      {/* Mode Selectors */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => handleModeChange("encode")}
          className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            mode === "encode"
              ? "border-primary text-primary"
              : "border-transparent text-zinc-550 hover:text-zinc-800 dark:text-zinc-450 dark:hover:text-zinc-150"
          }`}
        >
          Encode URL
        </button>
        <button
          onClick={() => handleModeChange("decode")}
          className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            mode === "decode"
              ? "border-primary text-primary"
              : "border-transparent text-zinc-550 hover:text-zinc-800 dark:text-zinc-450 dark:hover:text-zinc-150"
          }`}
        >
          Decode URL
        </button>
      </div>

      {/* Settings Panel */}
      {mode === "encode" && (
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 p-3 sm:p-4 bg-surface-container-low/50 dark:bg-zinc-900/50 rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800/80">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Encoding Scheme:</span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-xs font-semibold text-zinc-700 dark:text-zinc-350">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="encodeMode"
                checked={encodeMode === "standard"}
                onChange={() => {
                  setEncodeMode("standard");
                  setTimeout(() => handleProcess(inputText), 0);
                }}
                className="text-primary focus:ring-primary/20 h-4 w-4"
              />
              <span className="line-clamp-2">Standard (encodeURIComponent)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="encodeMode"
                checked={encodeMode === "all"}
                onChange={() => {
                  setEncodeMode("all");
                  setTimeout(() => handleProcess(inputText), 0);
                }}
                className="text-primary focus:ring-primary/20 h-4 w-4"
              />
              <span className="line-clamp-2">Encode All Characters (Hex %)</span>
            </label>
          </div>
        </div>
      )}

      {/* Split Editors Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 gap-1 sm:gap-0">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
              {mode === "encode" ? "Raw URL / Text string" : "Encoded URL String"}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              {inputText.length.toLocaleString()} chars
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder={
              mode === "encode"
                ? "Enter standard web address URL or text string here..."
                : "Paste percent-encoded URL segments to decode..."
            }
            className="w-full h-60 sm:h-80 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-100 resize-none"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 gap-2 sm:gap-0">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
              {mode === "encode" ? "Percent Encoded Output" : "Plain Decoded Output"}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <span className="text-[10px] text-zinc-400 font-mono">
                {outputText.length.toLocaleString()} chars
              </span>
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-[9px] sm:text-[10px] font-bold text-zinc-700 dark:text-zinc-300 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[12px] sm:text-[14px]">
                  {copied ? "check" : "content_copy"}
                </span>
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                <span className="sm:hidden">{copied ? "✓" : "Copy"}</span>
              </button>
            </div>
          </div>
          <textarea
            value={outputText}
            readOnly
            placeholder={
              mode === "encode"
                ? "URL encoded format results will appear here instantly..."
                : "Standard text or URL outputs will appear here..."
            }
            className="w-full h-60 sm:h-80 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 focus:outline-none transition-all text-xs sm:text-sm font-mono text-zinc-850 dark:text-zinc-200 resize-none select-all"
          />
        </div>
      </div>
    </div>
  );
}
