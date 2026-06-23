"use client";

import React, { useState } from "react";
import { Type, Sparkles, BookOpen, Clock, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WordStats {
  characters: number;
  charNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number; // minutes
  speakingTime: number; // minutes
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState<WordStats>({
    characters: 0,
    charNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  const [keywords, setKeywords] = useState<{ word: string; count: number }[]>([]);

  const handleTextChange = (value: string) => {
    setText(value);
    
    if (!value.trim()) {
      setStats({
        characters: 0,
        charNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
      });
      setKeywords([]);
      return;
    }

    const characters = value.length;
    const charNoSpaces = value.replace(/\s/g, "").length;
    
    // Split by whitespace to find words
    const wordsArray = value.trim().split(/\s+/).filter(Boolean);
    const words = wordsArray.length;

    // Sentence regex splits (., !, ?)
    const sentences = value.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

    // Paragraph splits by double newlines
    const paragraphs = value.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

    // Reading speed = ~225 words per min. Speaking speed = ~130 words per min.
    const readingTime = words / 225;
    const speakingTime = words / 130;

    setStats({
      characters,
      charNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    });

    // Compute Keyword Density
    const stopWords = new Set([
      "the", "a", "an", "and", "or", "but", "to", "for", "in", "on", "at", "by", "from",
      "of", "with", "is", "are", "was", "were", "be", "been", "have", "has", "had", "it",
      "this", "that", "these", "those", "i", "you", "he", "she", "we", "they", "me", "him",
      "her", "us", "them", "my", "your", "his", "their", "as", "if", "not", "so", "can", "will"
    ]);

    const wordCounts: Record<string, number> = {};
    wordsArray.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (cleanWord && cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
      }
    });

    const sortedKeywords = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 keywords

    setKeywords(sortedKeywords);
  };

  const handleClear = () => {
    setText("");
    handleTextChange("");
  };

  const formatDuration = (mins: number) => {
    if (mins < 1) {
      const secs = Math.ceil(mins * 60);
      return `${secs} sec`;
    }
    return `${Math.ceil(mins)} min`;
  };

  return (
    <div className="space-y-6">
      {/* Quick stats boxes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Words count */}
        <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-violet-400" /> Words
          </span>
          <span className="text-xl font-bold text-zinc-50 tracking-tight font-mono">
            {stats.words}
          </span>
        </div>

        {/* Characters count */}
        <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Type className="h-3.5 w-3.5 text-indigo-400" /> Characters
          </span>
          <span className="text-xl font-bold text-zinc-50 tracking-tight font-mono">
            {stats.characters}
          </span>
        </div>

        {/* Sentences count */}
        <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Sentences
          </span>
          <span className="text-xl font-bold text-zinc-50 tracking-tight font-mono">
            {stats.sentences}
          </span>
        </div>

        {/* Reading Duration */}
        <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-col justify-center space-y-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" /> Reading Time
          </span>
          <span className="text-xl font-bold text-zinc-50 tracking-tight font-mono truncate">
            {formatDuration(stats.readingTime)}
          </span>
        </div>
      </div>

      {/* Primary Edit Area Box */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Paste or type your writing drafts here to analyze text statistics..."
          className="w-full h-[240px] bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 resize-y outline-none"
        ></textarea>
        {text.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute bottom-4 right-4 p-2 bg-zinc-950/80 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 rounded-lg border border-zinc-800 hover:border-red-500/20 transition-all duration-200 cursor-pointer"
            title="Clear all text content"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
        )}
      </div>

      {/* Advanced Diagnostics Row */}
      {text.trim().length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Paragraphs and Space checks details */}
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-3.5 text-sm">
            <h4 className="font-bold text-zinc-200">Detailed Metrics</h4>
            <div className="divide-y divide-zinc-900/60">
              <div className="flex justify-between py-2 items-center">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-xs">Characters (no spaces)</span>
                <span className="font-mono text-zinc-300">{stats.charNoSpaces}</span>
              </div>
              <div className="flex justify-between py-2 items-center">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-xs">Paragraphs Count</span>
                <span className="font-mono text-zinc-300">{stats.paragraphs}</span>
              </div>
              <div className="flex justify-between py-2 items-center">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-xs">Estimated Speaking Time</span>
                <span className="font-mono text-zinc-300">{formatDuration(stats.speakingTime)}</span>
              </div>
            </div>
          </div>

          {/* Keyword density checks details */}
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-3.5 text-sm">
            <h4 className="font-bold text-zinc-200">Top Keyword Density</h4>
            {keywords.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {keywords.map((kw, i) => {
                  const densityPercentage = ((kw.count / stats.words) * 100).toFixed(1);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/40 border border-zinc-850"
                    >
                      <span className="font-mono text-zinc-300 truncate max-w-[90px]">{kw.word}</span>
                      <span className="text-zinc-500 font-bold">
                        {kw.count}x <span className="opacity-60 font-normal">({densityPercentage}%)</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 py-3 text-center">Write more words to extract keyword details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
