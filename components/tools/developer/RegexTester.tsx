"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Code, Info, Sparkles, BookOpen, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface MatchResult {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [regexStr, setRegexStr] = useState("[a-z]+");
  const [flags, setFlags] = useState("gi");
  const [testText, setTestText] = useState("Regex testing is awesome. 123 matches found!");
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const performTest = () => {
    if (!regexStr) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(regexStr, flags);
      
      let results: MatchResult[] = [];
      if (flags.includes("g")) {
        let match;
        let safetyCounter = 0;
        // Avoid infinite loop on empty matches
        while ((match = regex.exec(testText)) !== null) {
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0] === "") {
            regex.lastIndex++;
          }
          safetyCounter++;
          if (safetyCounter > 2000) break; // Limit match loops
        }
      } else {
        const match = testText.match(regex);
        if (match) {
          results.push({
            text: match[0],
            index: match.index || 0,
            groups: match.slice(1),
          });
        }
      }

      setMatches(results);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid regular expression pattern.");
      setMatches([]);
    }
  };

  useEffect(() => {
    performTest();
  }, [regexStr, flags, testText]);

  // Compute highlighted display string
  const getHighlightedText = () => {
    if (error || !regexStr || matches.length === 0) return testText;

    try {
      const regex = new RegExp(regexStr, flags);
      // We rebuild the text segmenting matches
      let lastIndex = 0;
      let elements: React.ReactNode[] = [];
      
      const gRegex = new RegExp(regexStr, flags.includes("g") ? flags : flags + "g");
      let match;
      let counter = 0;
      let safetyCounter = 0;

      while ((match = gRegex.exec(testText)) !== null) {
        const matchIndex = match.index;
        const matchText = match[0];

        if (matchIndex > lastIndex) {
          elements.push(testText.slice(lastIndex, matchIndex));
        }

        elements.push(
          <mark
            key={counter++}
            className="bg-violet-500/30 text-violet-200 border-b border-violet-500 px-0.5 rounded font-semibold"
          >
            {matchText}
          </mark>
        );

        lastIndex = gRegex.lastIndex;
        if (matchText === "") {
          gRegex.lastIndex++;
        }
        safetyCounter++;
        if (safetyCounter > 2000) break;
      }

      if (lastIndex < testText.length) {
        elements.push(testText.slice(lastIndex));
      }

      return elements;
    } catch (e) {
      return testText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Pattern configuration */}
      <div className="grid grid-cols-3 gap-4 items-end">
        <div className="col-span-2">
          <Input
            label="Regular Expression Pattern"
            value={regexStr}
            onChange={(e) => setRegexStr(e.target.value)}
            placeholder="Enter regex pattern (e.g. \b[A-Z]+\b)"
            leftIcon={<Code className="h-4 w-4 text-violet-400" />}
            error={error ? "Regex Compilation Error" : undefined}
          />
        </div>
        <div>
          <Input
            label="Flags"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g, i, m..."
            leftIcon={<Terminal className="h-4 w-4 text-zinc-500" />}
          />
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-950/60 border border-red-500/25 rounded-lg flex gap-3 text-xs text-red-300">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
          <p className="font-mono leading-relaxed">{error}</p>
        </div>
      )}

      {/* Split visual tester area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Test string area */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-violet-400" /> Test String
          </label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Paste your test text target lines here..."
            className="w-full h-[200px] font-mono text-xs bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 resize-none outline-none"
          ></textarea>
        </div>

        {/* Right Match highlights visualizer area */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" /> Highlights Visualizer
          </label>
          <div className="w-full h-[200px] font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-zinc-300 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text scrollbar-custom">
            {getHighlightedText()}
          </div>
        </div>
      </div>

      {/* Matches listing logs */}
      {matches.length > 0 && (
        <div className="glass rounded-xl border border-zinc-800/80 p-5 space-y-4">
          <h4 className="text-sm font-bold text-zinc-300">Matched Targets List ({matches.length})</h4>
          <div className="max-h-[180px] overflow-y-auto divide-y divide-zinc-900/60 scrollbar-custom pr-2 text-xs font-mono">
            {matches.map((match, i) => (
              <div key={i} className="flex items-center justify-between py-2.5">
                <span className="text-zinc-500 font-semibold">Match #{i + 1}</span>
                <span className="text-zinc-200 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 font-semibold select-all truncate max-w-xs">{match.text}</span>
                <span className="text-zinc-500 text-right">Index: {match.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cheat Sheet Helper */}
      <div className="flex gap-3 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400 select-none">
        <Info className="h-4.5 w-4.5 text-zinc-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-zinc-300">Regex Quick Guide Reference:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 font-mono text-[10px] text-zinc-500">
            <div><span className="text-violet-400 font-semibold">.</span> - Any character</div>
            <div><span className="text-violet-400 font-semibold">\d</span> - Any digit</div>
            <div><span className="text-violet-400 font-semibold">\w</span> - Word character</div>
            <div><span className="text-violet-400 font-semibold">\s</span> - Whitespace symbol</div>
            <div><span className="text-violet-400 font-semibold">+</span> - 1 or more times</div>
            <div><span className="text-violet-400 font-semibold">*</span> - 0 or more times</div>
            <div><span className="text-violet-400 font-semibold">?</span> - 0 or 1 times</div>
            <div><span className="text-violet-400 font-semibold">\b</span> - Word boundary</div>
          </div>
        </div>
      </div>
    </div>
  );
}
