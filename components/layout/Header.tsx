"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Sparkles, BookOpen, Layers, Keyboard, Sun, Moon } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { Button } from "@/components/ui/Button";

export const Header = () => {
  const { openCommandPalette, theme, toggleTheme } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-primary/50 bg-bg-primary/75 backdrop-blur-md transition-colors duration-200">
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6 max-w-7xl mx-auto w-full">
        {/* Logo and Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-zinc-400 hover:text-zinc-200 h-10 w-10 sm:h-11 sm:w-11"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group select-none">
            <div className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg sm:rounded-xl bg-primary shadow-glow transition-all duration-300 group-hover:scale-105 group-hover:rotate-6">
              <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-zinc-50" />
            </div>
            <span className="font-bold text-sm sm:text-lg tracking-tight bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-800 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-all duration-200 hidden xs:inline">
              Toolbox<span className="text-primary font-extrabold">.</span>
            </span>
          </Link>
        </div>

        {/* Global Search Bar Trigger - Centered in navbar */}
        <div className="flex-1 max-w-sm mx-3 sm:mx-6 hidden lg:block">
          <button
            onClick={openCommandPalette}
            className="flex items-center w-full bg-bg-secondary/40 border border-border-primary/80 rounded-lg h-10 px-3 text-xs sm:text-sm text-zinc-400 hover:text-zinc-200 hover:border-primary/30 hover:bg-bg-secondary/80 transition-all duration-200 cursor-pointer select-none"
          >
            <Search className="h-4 w-4 text-zinc-500 mr-2 shrink-0" />
            <span className="text-left flex-1 text-xs">Search tools...</span>
            <div className="flex items-center gap-1 select-none border border-border-primary/80 rounded px-1.5 py-0.5 bg-bg-primary text-[10px] font-semibold text-zinc-500 tracking-wider">
              <Keyboard className="h-3 w-3" /> <span>⌘K</span>
            </div>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              closeMobileMenu();
              openCommandPalette();
            }}
            className="p-2 sm:p-2.5 text-zinc-400 hover:text-zinc-200 lg:hidden transition-all duration-200 h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-lg"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <Link href="/tools" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="gap-1.5 text-zinc-400 hover:text-zinc-200 text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-3">
              <Layers className="h-4 w-4" />
              <span className="hidden md:inline">Categories</span>
            </Button>
          </Link>

          <Link href="/blog" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="gap-1.5 text-zinc-400 hover:text-zinc-200 text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-3">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Blog</span>
            </Button>
          </Link>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-zinc-400 hover:text-zinc-200 rounded-lg transition-all duration-200 h-10 w-10 sm:h-11 sm:w-11"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
              )}
            </Button>
          )}

          <div className="h-5 w-[1px] bg-border-primary mx-1 hidden sm:block"></div>

          <Link href="/tools/productivity-tools/to-do-list" className="hidden sm:block">
            <Button variant="glass" size="sm" className="text-xs sm:text-sm h-9 sm:h-10 px-2 sm:px-3">
              My Workspace
            </Button>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-primary bg-bg-secondary/95 backdrop-blur-lg px-3 sm:px-4 py-3 sm:py-4 space-y-2 sm:space-y-3 shadow-2xl transition-all duration-200">
          <button
            onClick={() => {
              closeMobileMenu();
              openCommandPalette();
            }}
            className="flex items-center w-full bg-bg-primary border border-border-primary rounded-lg h-11 sm:h-12 px-3.5 text-xs sm:text-sm text-zinc-400 hover:text-zinc-200 transition-all duration-200"
          >
            <Search className="h-4 w-4 text-zinc-500 mr-2.5 shrink-0" />
            <span className="text-left flex-1">Search tools...</span>
          </button>
          <div className="grid grid-cols-1 gap-1">
            <Link href="/tools" onClick={closeMobileMenu}>
              <span className="flex items-center gap-3 px-3.5 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-bg-primary/50 transition-all duration-200 h-11 sm:h-12">
                <Layers className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
                <span>Categories</span>
              </span>
            </Link>
            <Link href="/blog" onClick={closeMobileMenu}>
              <span className="flex items-center gap-3 px-3.5 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-bg-primary/50 transition-all duration-200 h-11 sm:h-12">
                <BookOpen className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
                <span>Blog</span>
              </span>
            </Link>
            <Link href="/tools/productivity-tools/to-do-list" onClick={closeMobileMenu}>
              <span className="flex items-center gap-3 px-3.5 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-bg-primary/50 transition-all duration-200 h-11 sm:h-12">
                <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
                <span>My Workspace</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
