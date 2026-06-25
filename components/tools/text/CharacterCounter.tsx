"use client";

import React, { useState, useEffect } from "react";
import { Type, Trash2, Copy, Check, Info, Settings, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

interface Limits {
  twitter: number;
  sms: number;
  linkedin: number;
  seoTitle: number;
  seoDesc: number;
  custom: number;
}

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [customLimitInput, setCustomLimitInput] = useState("500");

  // Filter options
  const [ignoreSpaces, setIgnoreSpaces] = useState(false);
  const [ignorePunctuation, setIgnorePunctuation] = useState(false);
  const [ignoreNumbers, setIgnoreNumbers] = useState(false);

  const limits: Limits = {
    twitter: 280,
    sms: 160,
    linkedin: 3000,
    seoTitle: 60,
    seoDesc: 160,
    custom: parseInt(customLimitInput) || 0,
  };

  const getFilteredText = (rawText: string) => {
    let result = rawText;
    if (ignoreSpaces) {
      result = result.replace(/\s/g, "");
    }
    if (ignorePunctuation) {
      // Keep only alphanumeric and whitespace characters (depending on ignoreSpaces)
      result = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’[\]\\|]/g, "");
    }
    if (ignoreNumbers) {
      result = result.replace(/[0-9]/g, "");
    }
    return result;
  };

  const filteredText = getFilteredText(text);
  const charCount = filteredText.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const loadSample = () => {
    setText(
      "Design is not just what it looks like and feels like. Design is how it works. This is a premium Character Counter utility built with Next.js and Tailwind CSS, operating fully offline inside your browser sandbox."
    );
  };

  const getProgressColor = (current: number, max: number) => {
    if (current > max) return "bg-red-500 dark:bg-red-600";
    if (current > max * 0.9) return "bg-amber-500 dark:bg-amber-600";
    return "bg-violet-600 dark:bg-violet-500";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Quick stats boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Characters */}
        <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Type className="h-3.5 w-3.5 text-violet-500" /> Characters
          </span>
          <span className="text-xl font-bold text-zinc-800 dark:text-zinc-50 tracking-tight font-mono">
            {charCount.toLocaleString()}
          </span>
        </div>

        {/* Total Words */}
        <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> Words
          </span>
          <span className="text-xl font-bold text-zinc-800 dark:text-zinc-50 tracking-tight font-mono">
            {wordCount.toLocaleString()}
          </span>
        </div>

        {/* Sentences */}
        <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-blue-500" /> Sentences
          </span>
          <span className="text-xl font-bold text-zinc-800 dark:text-zinc-50 tracking-tight font-mono">
            {sentenceCount.toLocaleString()}
          </span>
        </div>

        {/* Paragraphs */}
        <div className="glass p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Settings className="h-3.5 w-3.5 text-emerald-500" /> Paragraphs
          </span>
          <span className="text-xl font-bold text-zinc-800 dark:text-zinc-50 tracking-tight font-mono">
            {paragraphCount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Editor & Filters Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Input Textarea Area */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your writing drafts here to count characters, words, sentences..."
              className="w-full h-[280px] bg-white dark:bg-zinc-900/40 border border-zinc-250 dark:border-zinc-850 rounded-2xl p-5 text-sm text-zinc-855 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 resize-y outline-none"
            ></textarea>
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {text.length === 0 && (
                <button
                  onClick={loadSample}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  Load Sample
                </button>
              )}
              {text.length > 0 && (
                <>
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950/80 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-200 cursor-pointer"
                    title="Copy all text"
                  >
                    {copied ? <Check className="h-4.5 w-4.5 text-green-500" /> : <Copy className="h-4.5 w-4.5" />}
                  </button>
                  <button
                    onClick={handleClear}
                    className="p-2 bg-zinc-100 hover:bg-red-50/50 dark:bg-zinc-950/80 dark:hover:bg-red-950/20 text-zinc-500 hover:text-red-500 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-red-500/20 dark:hover:border-red-500/20 transition-all duration-200 cursor-pointer"
                    title="Clear text"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Counter filters options sidebar */}
        <div className="space-y-5 glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <span className="material-symbols-outlined text-primary text-base">filter_alt</span> Count Filters
          </h4>
          
          <div className="space-y-4">
            <Switch
              label="Ignore Spaces"
              description="Excludes all space characters from the count"
              checked={ignoreSpaces}
              onChange={(e) => setIgnoreSpaces(e.target.checked)}
            />
            <Switch
              label="Ignore Punctuation"
              description="Excludes commas, periods, symbols, etc."
              checked={ignorePunctuation}
              onChange={(e) => setIgnorePunctuation(e.target.checked)}
            />
            <Switch
              label="Ignore Numbers"
              description="Excludes numeric digits (0-9)"
              checked={ignoreNumbers}
              onChange={(e) => setIgnoreNumbers(e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Social Media & Custom Limits Panel */}
      <div className="glass p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">linear_scale</span> Target Limit Progress
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Custom Target:</span>
            <input
              type="number"
              value={customLimitInput}
              onChange={(e) => setCustomLimitInput(e.target.value)}
              className="w-16 px-2 py-1 text-center font-mono font-bold text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Left limits column */}
          <div className="space-y-4">
            {/* Twitter */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-zinc-650 dark:text-zinc-400 font-bold">Twitter/X Post</span>
                <span className={`font-mono ${charCount > limits.twitter ? "text-red-500 font-black" : "text-zinc-550 dark:text-zinc-400"}`}>
                  {charCount} / {limits.twitter}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(charCount, limits.twitter)}`}
                  style={{ width: `${Math.min(100, (charCount / limits.twitter) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* SMS */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-zinc-650 dark:text-zinc-400 font-bold">Standard SMS (1 Segment)</span>
                <span className={`font-mono ${charCount > limits.sms ? "text-red-500 font-black" : "text-zinc-550 dark:text-zinc-400"}`}>
                  {charCount} / {limits.sms}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(charCount, limits.sms)}`}
                  style={{ width: `${Math.min(100, (charCount / limits.sms) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-zinc-650 dark:text-zinc-400 font-bold">LinkedIn Post</span>
                <span className={`font-mono ${charCount > limits.linkedin ? "text-red-500 font-black" : "text-zinc-550 dark:text-zinc-400"}`}>
                  {charCount} / {limits.linkedin}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(charCount, limits.linkedin)}`}
                  style={{ width: `${Math.min(100, (charCount / limits.linkedin) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right limits column */}
          <div className="space-y-4">
            {/* Google Search Title */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-zinc-650 dark:text-zinc-400 font-bold">Google SEO Title</span>
                <span className={`font-mono ${charCount > limits.seoTitle ? "text-red-500 font-black" : "text-zinc-550 dark:text-zinc-400"}`}>
                  {charCount} / {limits.seoTitle}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(charCount, limits.seoTitle)}`}
                  style={{ width: `${Math.min(100, (charCount / limits.seoTitle) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Google Search Desc */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-zinc-650 dark:text-zinc-400 font-bold">Google SEO Meta Description</span>
                <span className={`font-mono ${charCount > limits.seoDesc ? "text-red-500 font-black" : "text-zinc-550 dark:text-zinc-400"}`}>
                  {charCount} / {limits.seoDesc}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(charCount, limits.seoDesc)}`}
                  style={{ width: `${Math.min(100, (charCount / limits.seoDesc) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Custom Limit */}
            {limits.custom > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-zinc-650 dark:text-zinc-400 font-bold">Custom Target Limit</span>
                  <span className={`font-mono ${charCount > limits.custom ? "text-red-500 font-black" : "text-zinc-550 dark:text-zinc-400"}`}>
                    {charCount} / {limits.custom}
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getProgressColor(charCount, limits.custom)}`}
                    style={{ width: `${Math.min(100, (charCount / limits.custom) * 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Warning card if exceeded */}
        {(charCount > limits.twitter ||
          charCount > limits.sms ||
          (limits.custom > 0 && charCount > limits.custom)) && (
          <div className="flex items-center gap-3 p-3.5 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/20 dark:bg-red-950/10 text-xs text-red-650 dark:text-red-400 font-medium">
            <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
            <span>Warning: Your current text length has exceeded one or more of the specified character target limits.</span>
          </div>
        )}
      </div>
    </div>
  );
}
