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
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Logo and Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-zinc-400 hover:text-zinc-200"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link href="/" className="flex items-center gap-2 group select-none">
            <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-primary shadow-glow transition-all duration-300 group-hover:scale-105 group-hover:rotate-6">
              <Sparkles className="h-4.5 w-4.5 text-zinc-50" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-800 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-all duration-200">
              Toolbox<span className="text-primary font-extrabold">.</span>
            </span>
          </Link>
        </div>

        {/* Global Search Bar Trigger (Arc Style) - Centered in navbar */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <button
            onClick={openCommandPalette}
            className="flex items-center w-full bg-bg-secondary/40 border border-border-primary/80 rounded-xl h-10 px-3.5 text-sm text-zinc-400 hover:text-zinc-200 hover:border-primary/30 hover:bg-bg-secondary/80 transition-all duration-200 cursor-pointer select-none"
          >
            <Search className="h-4 w-4 text-zinc-500 mr-2.5 shrink-0" />
            <span className="text-left flex-1 text-xs">Search tools...</span>
            <div className="flex items-center gap-1 select-none border border-border-primary/80 rounded px-1.5 py-0.5 bg-bg-primary text-[10px] font-semibold text-zinc-500 tracking-wider">
              <Keyboard className="h-3.5 w-3.5" /> <span>⌘K</span>
            </div>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              closeMobileMenu();
              openCommandPalette();
            }}
            className="p-2 text-zinc-400 hover:text-zinc-200 md:hidden transition-all duration-200"
            aria-label="Search"
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

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-zinc-400 hover:text-zinc-200 rounded-xl transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5 text-amber-500" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-primary" />
              )}
            </Button>
          )}

          <div className="h-5 w-[1px] bg-border-primary mx-1 hidden sm:block"></div>

          <Link href="/tools/productivity-tools/to-do-list" className="hidden sm:block">
            <Button variant="glass" size="sm">
              My Workspace
            </Button>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-primary bg-bg-secondary/95 backdrop-blur-lg px-4 py-4 space-y-3 shadow-2xl transition-all duration-200">
          <button
            onClick={() => {
              closeMobileMenu();
              openCommandPalette();
            }}
            className="flex items-center w-full bg-bg-primary border border-border-primary rounded-xl h-11 px-3.5 text-sm text-zinc-400 hover:text-zinc-200 transition-all duration-200"
          >
            <Search className="h-4 w-4 text-zinc-500 mr-2.5 shrink-0" />
            <span className="text-left flex-1 text-xs">Search 67+ tools...</span>
          </button>
          <div className="grid grid-cols-1 gap-1">
            <Link href="/tools" onClick={closeMobileMenu}>
              <span className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-bg-primary/50 transition-all duration-200">
                <Layers className="h-4.5 w-4.5 text-primary" />
                <span>Categories</span>
              </span>
            </Link>
            <Link href="/blog" onClick={closeMobileMenu}>
              <span className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-bg-primary/50 transition-all duration-200">
                <BookOpen className="h-4.5 w-4.5 text-primary" />
                <span>Blog</span>
              </span>
            </Link>
            <Link href="/tools/productivity-tools/to-do-list" onClick={closeMobileMenu}>
              <span className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-bg-primary/50 transition-all duration-200">
                <Sparkles className="h-4.5 w-4.5 text-primary" />
                <span>My Workspace</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
