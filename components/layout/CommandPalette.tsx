"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Clock, Star, Zap, Terminal, X, CornerDownLeft } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { tools, categories } from "@/data/tools";
import { AnimatePresence, motion } from "framer-motion";

export const CommandPalette = () => {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    closeCommandPalette,
    recentTools: recentSlugs,
    addRecentTool,
    favorites,
  } = useStore();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter tools based on query
  const filteredTools = query
    ? tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase()) ||
          tool.category.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const recentTools = tools.filter((t) => recentSlugs.includes(t.slug));
  const popularTools = tools.filter((t) =>
    ["word-counter", "json-formatter", "bmi-calculator", "password-generator", "qr-code-generator", "stopwatch"].includes(t.slug)
  );

  const activeList = query ? filteredTools : [...recentTools, ...popularTools].slice(0, 8);

  // Key listeners for open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useStore.getState().toggleCommandPalette();
      }
      if (e.key === "Escape" && isCommandPaletteOpen) {
        closeCommandPalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, closeCommandPalette]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isCommandPaletteOpen]);

  // Keyboard navigation for filtered lists
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!activeList.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % activeList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(activeList[selectedIndex]);
    }
  };

  const handleSelect = (tool: typeof tools[0]) => {
    addRecentTool(tool.slug);
    router.push(`/tools/${tool.category}/${tool.slug}`);
    closeCommandPalette();
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      closeCommandPalette();
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            ref={containerRef}
            className="w-full max-w-2xl bg-zinc-950/90 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden glass"
          >
            {/* Search Input Box */}
            <div className="flex items-center border-b border-zinc-800/80 px-4 py-3.5">
              <Search className="h-5 w-5 text-zinc-500 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search tools, calculators, categories..."
                className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-base outline-none border-none focus:ring-0 focus:outline-none"
              />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-semibold text-zinc-500 border border-zinc-800 rounded px-1.5 py-0.5 select-none">
                  ESC
                </span>
                <button
                  onClick={closeCommandPalette}
                  className="p-1 hover:bg-zinc-850 rounded text-zinc-500 hover:text-zinc-300 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content Lists */}
            <div className="max-h-[360px] overflow-y-auto p-2 scrollbar-custom">
              {/* If no search typed, show Recents and Popular */}
              {!query && (
                <div className="space-y-4">
                  {recentTools.length > 0 && (
                    <div>
                      <div className="flex items-center text-xs font-semibold text-zinc-500 px-3 py-1.5 uppercase tracking-wider gap-1.5">
                        <Clock className="h-3 w-3" /> Recent Tools
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {recentTools.map((tool, index) => (
                          <div
                            key={tool.id}
                            onClick={() => handleSelect(tool)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                              index === selectedIndex ? "bg-violet-600/15 text-zinc-50 border-l-2 border-violet-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Sparkles className="h-4 w-4 text-violet-400 shrink-0" />
                              <div>
                                <div className="text-sm font-medium">{tool.name}</div>
                                <div className="text-xs opacity-60 line-clamp-1">{tool.description}</div>
                              </div>
                            </div>
                            {index === selectedIndex && (
                              <CornerDownLeft className="h-3.5 w-3.5 opacity-60 text-violet-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center text-xs font-semibold text-zinc-500 px-3 py-1.5 uppercase tracking-wider gap-1.5">
                      <Zap className="h-3 w-3" /> Popular Tools
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {popularTools.map((tool, index) => {
                        const actualIndex = recentTools.length + index;
                        return (
                          <div
                            key={tool.id}
                            onClick={() => handleSelect(tool)}
                            onMouseEnter={() => setSelectedIndex(actualIndex)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                              actualIndex === selectedIndex ? "bg-violet-600/15 text-zinc-50 border-l-2 border-violet-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Terminal className="h-4 w-4 text-zinc-400 shrink-0" />
                              <div>
                                <div className="text-sm font-medium">{tool.name}</div>
                                <div className="text-xs opacity-60 line-clamp-1">{tool.description}</div>
                              </div>
                            </div>
                            {actualIndex === selectedIndex && (
                              <CornerDownLeft className="h-3.5 w-3.5 opacity-60 text-violet-400" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* If user typed query, display filtered list */}
              {query && filteredTools.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-zinc-500 px-3 py-1.5 uppercase tracking-wider">
                    Matching Tools ({filteredTools.length})
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {filteredTools.map((tool, index) => (
                      <div
                        key={tool.id}
                        onClick={() => handleSelect(tool)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                          index === selectedIndex ? "bg-violet-600/15 text-zinc-50 border-l-2 border-violet-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-4 w-4 text-violet-400 shrink-0" />
                          <div>
                            <div className="text-sm font-medium">{tool.name}</div>
                            <div className="text-xs opacity-60 line-clamp-1">{tool.description}</div>
                          </div>
                        </div>
                        {index === selectedIndex && (
                          <CornerDownLeft className="h-3.5 w-3.5 opacity-60 text-violet-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty Search Result State */}
              {query && filteredTools.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <Terminal className="h-10 w-10 text-zinc-700 mb-3" />
                  <p className="text-sm text-zinc-400">No tools found matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-zinc-600 mt-1">Try searching for other terms like &ldquo;json&rdquo;, &ldquo;bmi&rdquo;, or &ldquo;counter&rdquo;</p>
                </div>
              )}
            </div>

            {/* Hotkey Info Footer */}
            <div className="flex items-center justify-between border-t border-zinc-800/80 px-4 py-2.5 bg-zinc-950/40 text-[11px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="font-semibold">↑↓</span> Navigate</span>
                <span className="flex items-center gap-1"><span className="font-semibold">↵</span> Open</span>
              </div>
              <span className="flex items-center gap-1 select-none">
                Close with <span className="border border-zinc-800 rounded px-1.5 py-0.5">ESC</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
