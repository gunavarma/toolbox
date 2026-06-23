"use client";

import React, { useState, useEffect } from "react";
import { Lock, Copy, Check, RefreshCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const similarChars = /[Il1O0o]/g;

    let charset = "";
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (excludeSimilar) {
      charset = charset.replace(similarChars, "");
    }

    if (!charset) {
      setPassword("Please select at least one character set.");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(array);
    }

    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthRating = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      return { score: 0, label: "None", color: "bg-zinc-800 text-zinc-500 border-zinc-800" };
    }
    
    let entropy = length * Math.log2(
      (includeUppercase ? 26 : 0) +
      (includeLowercase ? 26 : 0) +
      (includeNumbers ? 10 : 0) +
      (includeSymbols ? 30 : 0)
    );

    if (entropy < 40) return { score: 1, label: "Weak", color: "bg-red-500/10 text-red-400 border-red-500/20" };
    if (entropy < 65) return { score: 2, label: "Medium", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
    if (entropy < 90) return { score: 3, label: "Strong", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    return { score: 4, label: "Very Strong", color: "bg-violet-500/15 text-violet-400 border-violet-500/25" };
  };

  const strength = getStrengthRating();

  return (
    <div className="space-y-6">
      {/* Generated Password display block */}
      <div className="relative flex items-center bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 min-h-[58px] glass">
        <span className="font-mono text-zinc-100 pr-12 select-all break-all overflow-x-auto text-base tracking-wide flex-1 whitespace-nowrap scrollbar-custom">
          {password}
        </span>
        <div className="absolute right-3.5 flex gap-1 bg-zinc-950/70 p-1 rounded-lg backdrop-blur-sm border border-zinc-850 select-none">
          <button
            onClick={generatePassword}
            className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300 transition-all duration-200 cursor-pointer"
            title="Generate New Password"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-violet-400 transition-all duration-200 cursor-pointer"
            title="Copy Password"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400 animate-scale" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Control settings */}
      <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-6">
        {/* Length slider */}
        <Slider
          label="Password Length"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          valueDisplay={length}
        />

        {/* Binary toggles options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Switch
            label="Uppercase Letters"
            description="Include capital characters (A-Z)"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <Switch
            label="Lowercase Letters"
            description="Include simple characters (a-z)"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <Switch
            label="Numbers"
            description="Include numeric digits (0-9)"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <Switch
            label="Special Symbols"
            description="Include markup flags (!@#$)"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <Switch
            label="Exclude Similar"
            description="Remove similar characters (I, l, 1, 0, O)"
            checked={excludeSimilar}
            onChange={(e) => setExcludeSimilar(e.target.checked)}
          />
        </div>
      </div>

      {/* Strength indicator card */}
      <div className="glass rounded-xl border border-zinc-800/80 p-4 flex items-center justify-between text-xs">
        <span className="text-zinc-500 font-semibold uppercase tracking-wider">Entropy Strength</span>
        <span className={`px-2.5 py-0.5 rounded border font-semibold flex items-center gap-1.5 ${strength.color}`}>
          <ShieldCheck className="h-3.5 w-3.5" /> {strength.label}
        </span>
      </div>
    </div>
  );
}
