"use client";

import React, { useState, useEffect } from "react";

export default function UuidGenerator() {
  const [version, setVersion] = useState<"v4" | "v1">("v4");
  const [quantity, setQuantity] = useState(5);
  const [format, setFormat] = useState<"standard" | "no-hyphens" | "json" | "sql">("standard");
  const [casing, setCasing] = useState<"lower" | "upper">("lower");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Helper to generate a v4 UUID (random)
  const generateV4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Helper to generate a v1 UUID (timestamp/mock node-based)
  const generateV1 = () => {
    let d = new Date().getTime();
    let d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let uuid = version === "v4" ? generateV4() : generateV1();
      
      // Formatting
      if (format === "no-hyphens") {
        uuid = uuid.replace(/-/g, "");
      }
      
      if (casing === "upper") {
        uuid = uuid.toUpperCase();
      } else {
        uuid = uuid.toLowerCase();
      }

      list.push(uuid);
    }
    setUuids(list);
  };

  // Run on parameters changes
  useEffect(() => {
    handleGenerate();
  }, [version, quantity, format, casing]);

  // Copy all uuids to clipboard formatted according to active settings
  const getFormattedString = () => {
    if (format === "json") {
      return JSON.stringify(uuids, null, 2);
    }
    if (format === "sql") {
      return `INSERT INTO temp_uuids (uuid) VALUES\n` + uuids.map((id) => `('${id}')`).join(",\n") + ";";
    }
    return uuids.join("\n");
  };

  const handleCopy = () => {
    const text = getFormattedString();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = getFormattedString();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `uuids-${version}-${new Date().getTime()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Parameters Column */}
        <div className="md:col-span-1 glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-5">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="material-symbols-outlined text-primary text-lg">settings</span> Configuration
          </h3>

          {/* Quantity slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-350">
              <span>Count:</span>
              <span className="font-mono text-primary font-bold">{quantity}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-250 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Version buttons */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350">UUID Version:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setVersion("v4")}
                className={`py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                  version === "v4"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                }`}
              >
                v4 (Random)
              </button>
              <button
                onClick={() => setVersion("v1")}
                className={`py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                  version === "v1"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                }`}
              >
                v1 (Time-based)
              </button>
            </div>
          </div>

          {/* Output Format options */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350">Format:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(["standard", "no-hyphens", "json", "sql"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`py-2 px-1 font-bold rounded-lg border text-center transition-all capitalize ${
                    format === fmt
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                  }`}
                >
                  {fmt.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Casing options */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350">Casing:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setCasing("lower")}
                className={`py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                  casing === "lower"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                }`}
              >
                lowercase
              </button>
              <button
                onClick={() => setCasing("upper")}
                className={`py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                  casing === "upper"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-850"
                }`}
              >
                UPPERCASE
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:-translate-y-0.5 active:scale-95 transition-all text-xs flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">autorenew</span> Regenerate
          </button>
        </div>

        {/* Results Column */}
        <div className="md:col-span-2 space-y-3 flex flex-col h-full">
          <div className="flex justify-between items-center px-1 shrink-0">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Generated List</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-lg text-[10px] font-bold text-zinc-700 dark:text-zinc-300 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? "check" : "content_copy"}
                </span>
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-lg text-[10px] font-bold text-zinc-700 dark:text-zinc-300 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                <span>TXT</span>
              </button>
            </div>
          </div>
          <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-250 dark:border-zinc-800 p-4 font-mono text-sm text-zinc-800 dark:text-zinc-200 overflow-y-auto max-h-[360px] select-all">
            {format === "json" ? (
              <pre className="whitespace-pre-wrap">{getFormattedString()}</pre>
            ) : format === "sql" ? (
              <pre className="whitespace-pre-wrap">{getFormattedString()}</pre>
            ) : (
              uuids.map((id, index) => (
                <div key={index} className="py-1 border-b border-zinc-100/50 dark:border-zinc-900/50 last:border-none">
                  <span className="text-[10px] text-zinc-400 select-none mr-3 inline-block w-4">
                    {index + 1}
                  </span>
                  <span>{id}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
