"use client";

import React from "react";
import Link from "next/link";
import { Search, Menu, Sparkles, BookOpen, Layers, Keyboard } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/ui/Button";

export const Header = () => {
  const { openCommandPalette, toggleSidebar } = useStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo and Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden text-zinc-400 hover:text-zinc-200"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center gap-2 group select-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-6">
              <Sparkles className="h-4.5 w-4.5 text-zinc-50" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent group-hover:text-zinc-100 transition-all duration-200">
              Toolbox<span className="text-violet-500 font-extrabold">.</span>
            </span>
          </Link>
        </div>

        {/* Global Search Bar Trigger (Arc Style) */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <button
            onClick={openCommandPalette}
            className="flex items-center w-full bg-zinc-900/40 border border-zinc-800/80 rounded-lg h-10 px-3.5 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-250 cursor-pointer select-none"
          >
            <Search className="h-4 w-4 text-zinc-500 mr-2.5 shrink-0" />
            <span className="text-left flex-1">Search tools...</span>
            <div className="flex items-center gap-1 select-none border border-zinc-800 rounded px-1.5 py-0.5 bg-zinc-950 text-[10px] font-semibold text-zinc-500 tracking-wider">
              <Keyboard className="h-3.5 w-3.5" /> <span>⌘K</span>
            </div>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={openCommandPalette}
            className="p-2 text-zinc-400 hover:text-zinc-200 md:hidden transition-all duration-200"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <Link href="/tools">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-1.5 text-zinc-400 hover:text-zinc-200">
              <Layers className="h-4 w-4" />
              Categories
            </Button>
          </Link>

          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-1.5 text-zinc-400 hover:text-zinc-200">
              <BookOpen className="h-4 w-4" />
              Blog
            </Button>
          </Link>

          <div className="h-5 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

          <Link href="/tools/productivity-tools/to-do-list" className="hidden sm:block">
            <Button variant="glass" size="sm">
              My Workspace
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
