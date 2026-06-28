"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  Tv,
  Clock,
  Calculator,
  Type,
  Code,
  Image as ImageIcon,
  CheckSquare,
  Briefcase,
  Star,
  HelpCircle,
  TrendingUp,
  X
} from "lucide-react";
import { categories, tools } from "@/data/tools";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  Tv,
  Clock,
  Calculator,
  Type,
  Code,
  Image: ImageIcon,
  CheckSquare,
  Sparkles,
  Briefcase,
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Popular utilities inline quick-links
  const popularQuickLinks = [
    { name: "JSON Formatter", category: "developer-tools", slug: "json-formatter" },
    { name: "Word Counter", category: "text-tools", slug: "word-counter" },
    { name: "Password Generator", category: "text-tools", slug: "password-generator" },
    { name: "QR Code Generator", category: "productivity-tools", slug: "qr-code-generator" },
    { name: "Stopwatch", category: "time-tools", slug: "stopwatch" }
  ];

  // Filter tools based on search query and category pill selection
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex-1 w-full pb-12 sm:pb-24 space-y-12 sm:space-y-16">
      {/* 1. Google-Style Search Hero Section */}
      <section className="relative w-full pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl space-y-4 sm:space-y-6 z-10 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold select-none">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> <span>Unified Browser Workbench</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight sm:leading-[1.1] select-none">
            Everything you need.
            <br />
            <span className="text-primary">One Toolbox.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            65+ professional tools for developers, calculators, screen diagnostics, text formatters, and daily utility.
          </p>

          {/* Centered Large Search Input Bar (Google Style) */}
          <div className="max-w-xl mx-auto pt-4 sm:pt-6 w-full relative px-2 sm:px-0">
            <div className="flex items-center w-full bg-bg-secondary border border-border-primary rounded-lg sm:rounded-full h-12 sm:h-13 px-4 sm:px-5 text-zinc-500 hover:border-primary/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200 shadow-sm hover:shadow-md select-none">
              <Search className="h-4 sm:h-5 w-4 sm:w-5 text-zinc-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 65+ tools..."
                className="w-full bg-transparent border-none text-text-main placeholder-text-muted/60 text-sm focus:outline-none focus:ring-0 focus:box-shadow-none"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 hover:bg-bg-primary rounded-full text-zinc-400 hover:text-zinc-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 border border-border-primary/80 rounded px-1.5 py-0.5 bg-bg-primary text-[10px] font-semibold text-zinc-400 font-mono">
                  ⌘K
                </span>
              )}
            </div>
          </div>

          {/* Popular utilities quick list links */}
          <div className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-2 text-[10px] sm:text-xs pt-2 sm:pt-3 text-zinc-400 select-none px-2 sm:px-0">
            <span className="font-semibold text-zinc-500 w-full sm:w-auto">Popular:</span>
            {popularQuickLinks.map((link) => (
              <Link
                key={link.slug}
                href={`/tools/${link.category}/${link.slug}`}
                className="text-primary hover:underline transition-colors font-medium text-[10px] sm:text-xs whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Category Pills Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border-primary/40 pb-6">
          <Button
            variant={selectedCategory === null ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full px-3 sm:px-4 h-8 sm:h-8.5 text-xs font-semibold min-h-[44px]"
          >
            All Utilities
          </Button>
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Layers;
            const isSelected = selectedCategory === category.id;
            return (
              <Button
                key={category.id}
                variant={isSelected ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-3 sm:px-4 h-8 sm:h-8.5 text-xs font-semibold flex items-center gap-1 min-h-[44px]"
              >
                <Icon className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                <span className="hidden sm:inline">{category.name}</span>
              </Button>
            );
          })}
        </div>
      </section>

      {/* 3. Dynamic Tools Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
          <h2 className="text-lg sm:text-xl font-bold text-text-main flex items-center gap-2 flex-wrap">
            <Layers className="h-4 sm:h-4.5 w-4 sm:w-4.5 text-primary" />
            <span className="text-sm sm:text-base">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name
                : "All Browser Tools"}
              {` (${filteredTools.length})`}
            </span>
          </h2>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs sm:text-sm text-primary hover:underline font-semibold whitespace-nowrap"
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredTools.map((tool) => {
              const categoryDetails = categories.find((c) => c.id === tool.category);
              const Icon = iconMap[categoryDetails?.icon || "Layers"] || Layers;

              return (
                <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`} className="group">
                  <Card hoverEffect className="h-full flex flex-col justify-between p-4 sm:p-5 min-h-[160px]">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-2">
                        <div className="h-10 w-10 rounded-xl bg-bg-secondary border border-border-primary/80 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all duration-200 shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[8px] sm:text-[9px] font-bold text-text-muted/80 border border-border-primary/60 px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono whitespace-nowrap">
                          {categoryDetails?.name || "Utility"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xs sm:text-sm font-bold text-text-main group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {tool.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-text-muted leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-bold text-text-muted group-hover:text-primary uppercase tracking-widest pt-4 flex items-center justify-between border-t border-border-primary/40 mt-4">
                      <span>Launch Tool</span>
                      <ArrowRight className="h-3 sm:h-3.5 w-3 sm:w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4 min-h-[220px]">
            <Layers className="h-8 w-8 text-zinc-400 animate-pulse" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">No matching tools found</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                We couldn&apos;t find any utility matches for &ldquo;{searchQuery}&rdquo;. Try another term.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
              className="min-h-[44px]"
            >
              Reset Filters
            </Button>
          </Card>
        )}
      </section>

      {/* 4. Elegant Platform FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6 select-none">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-text-main text-center flex flex-col sm:flex-row items-center justify-center gap-2 border-t border-border-primary/40 pt-8 sm:pt-10">
          <HelpCircle className="h-5 w-5 text-primary" /> 
          <span>FAQ & Platform Operations</span>
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <div className="glass p-4 sm:p-5 rounded-2xl border border-border-primary/50 space-y-1.5">
            <h4 className="text-sm font-bold text-text-main">Are my details secure?</h4>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Yes, 100%. All computations, image resizing, hashing, password creations, and invoicing lists are processed client-side inside your browser sandbox. We do not host or save client files on external servers.
            </p>
          </div>

          <div className="glass p-4 sm:p-5 rounded-2xl border border-border-primary/50 space-y-1.5">
            <h4 className="text-sm font-bold text-text-main">How do I trigger the search?</h4>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              You can click on the search bar in the navbar or press the `Cmd+K` / `Ctrl+K` keyboard shortcut keys anywhere on the platform to launch the command search dashboard.
            </p>
          </div>

          <div className="glass p-4 sm:p-5 rounded-2xl border border-border-primary/50 space-y-1.5">
            <h4 className="text-sm font-bold text-text-main">Are there limit counts for PDF invoices?</h4>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              No, there are zero usage limits or pricing tiers. You can generate, customize, and print as many quotes or invoices as you need completely free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
