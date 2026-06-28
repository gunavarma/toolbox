"use client";

import React, { useState } from "react";

export default function Base64Codec() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

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
        let encoded = btoa(unescape(encodeURIComponent(text)));
        if (urlSafe) {
          encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        }
        setOutputText(encoded);
      } else {
        let toDecode = text;
        if (urlSafe) {
          toDecode = toDecode.replace(/-/g, "+").replace(/_/g, "/");
          while (toDecode.length % 4) {
            toDecode += "=";
          }
        }
        const decoded = decodeURIComponent(escape(atob(toDecode)));
        setOutputText(decoded);
      }
    } catch (e) {
      setOutputText("Error: Invalid string formatting for execution. Please check characters.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    setFileName(null);
    handleProcess(val);
  };

  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInputText("");
    setOutputText("");
    setFileName(null);
  };

  // Drag and Drop file parsing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    if (mode === "encode") {
      reader.onload = () => {
        const result = reader.result as string;
        // Strip data url prefix if needed, or leave base64 payload
        const base64Content = result.split(",")[1] || result;
        setOutputText(base64Content);
        setInputText(`[Binary File: ${file.name}]`);
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = () => {
        const text = reader.result as string;
        setInputText(text);
        handleProcess(text, "decode");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto py-2 px-4 sm:px-0">
      {/* Mode selectors */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => handleModeChange("encode")}
          className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            mode === "encode"
              ? "border-primary text-primary"
              : "border-transparent text-zinc-550 hover:text-zinc-800 dark:text-zinc-450 dark:hover:text-zinc-150"
          }`}
        >
          Encode Base64
        </button>
        <button
          onClick={() => handleModeChange("decode")}
          className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            mode === "decode"
              ? "border-primary text-primary"
              : "border-transparent text-zinc-550 hover:text-zinc-800 dark:text-zinc-450 dark:hover:text-zinc-150"
          }`}
        >
          Decode Base64
        </button>
      </div>

      {/* Settings Row */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-surface-container-low/50 dark:bg-zinc-900/50 rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800/80">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-zinc-700 dark:text-zinc-350 select-none">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => {
              setUrlSafe(e.target.checked);
              // Trigger re-processing
              setTimeout(() => handleProcess(inputText), 0);
            }}
            className="rounded border-zinc-300 text-primary focus:ring-primary/20 h-4 w-4"
          />
          <span className="line-clamp-2">URL-safe base64 formatting (RFC 4648)</span>
        </label>
        
        {/* Upload Button */}
        <label className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer shadow-sm active:scale-95 transition-all whitespace-nowrap">
          <span className="material-symbols-outlined text-[16px]">upload_file</span>
          <span className="hidden sm:inline">{fileName ? `File: ${fileName}` : "Upload File"}</span>
          <span className="sm:hidden">Upload</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Editors splits layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input area */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
              {mode === "encode" ? "Raw Input Text" : "Base64 Input"}
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
                ? "Type or paste standard text string parameters here..."
                : "Paste base64 content parameters to convert..."
            }
            className="w-full h-60 sm:h-80 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-100 resize-none"
          />
        </div>

        {/* Output area */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 gap-2 sm:gap-0">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
              {mode === "encode" ? "Base64 Output" : "Raw Text Output"}
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[10px] text-zinc-400 font-mono">
                {outputText.length.toLocaleString()} chars
              </span>
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-1 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-[10px] font-bold text-zinc-700 dark:text-zinc-300 shadow-sm active:scale-95 transition-all h-8 sm:h-7 flex-1 sm:flex-none justify-center"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? "check" : "content_copy"}
                </span>
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
          <textarea
            value={outputText}
            readOnly
            placeholder={
              mode === "encode"
                ? "Generated Base64 output string will appear here instantly..."
                : "Decoded text string parameters will appear here..."
            }
            className="w-full h-60 sm:h-80 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 focus:outline-none transition-all text-xs sm:text-sm font-mono text-zinc-850 dark:text-zinc-200 resize-none select-all"
          />
        </div>
      </div>
    </div>
  );
}
