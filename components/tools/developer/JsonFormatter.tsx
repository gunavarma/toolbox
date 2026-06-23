"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Braces, Minimize, RefreshCcw, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const space = indent === "tab" ? "\t" : Number(indent);
      const formatted = JSON.stringify(parsed, null, space);
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax.");
      setOutput("");
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Layout Split Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side Input Area */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 px-1">
            <Braces className="h-4 w-4 text-violet-400" /> Input JSON Code
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your raw JSON content here... e.g. {"id": 1, "name": "Toolbox"}'
            className="w-full h-[320px] font-mono text-xs bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 resize-none outline-none"
          ></textarea>
        </div>

        {/* Right Side Output Area */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-emerald-400" /> Formatted Result
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-zinc-500 hover:text-violet-400 flex items-center gap-1.5 transition-all duration-200 select-none cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              placeholder="Formatted output will appear here..."
              className="w-full h-[320px] font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-zinc-300 placeholder-zinc-700 focus:outline-none transition-all duration-200 resize-none outline-none"
            ></textarea>

            {/* Error Overlay banner */}
            {error && (
              <div className="absolute inset-x-3 bottom-3 p-3.5 bg-red-950/90 border border-red-500/25 rounded-lg flex gap-3 text-xs text-red-300 backdrop-blur-md">
                <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <span className="font-bold block">JSON Syntax Error:</span>
                  <p className="opacity-90 leading-relaxed font-mono">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Actions Row */}
      <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 max-w-xs w-full">
          <Select
            options={[
              { value: "2", label: "2 Spaces Indent" },
              { value: "4", label: "4 Spaces Indent" },
              { value: "tab", label: "Tab Indent" },
            ]}
            value={indent}
            onChange={(e) => setIndent(e.target.value)}
          />
        </div>

        <div className="flex gap-2.5 shrink-0 ml-auto">
          <Button variant="ghost" onClick={handleClear} leftIcon={<RefreshCcw className="h-4 w-4" />}>
            Clear
          </Button>
          <Button variant="secondary" onClick={minifyJson} leftIcon={<Minimize className="h-4 w-4" />}>
            Minify Code
          </Button>
          <Button variant="primary" onClick={formatJson} leftIcon={<FileText className="h-4 w-4" />}>
            Format JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
