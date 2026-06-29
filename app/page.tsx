"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { categories, tools } from "@/data/tools";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { 
  Monitor, 
  Calculator, 
  Type, 
  Code, 
  Terminal, 
  History, 
  Image as ImageIcon, 
  FileText, 
  ArrowLeftRight, 
  Sparkles, 
  Search, 
  Keyboard, 
  ArrowRight,
  Bookmark,
  Bolt,
  ShieldAlert,
  Zap,
  CheckCircle2
} from "lucide-react";
import { useStore } from "@/hooks/useStore";

const CategoryIconMap: Record<string, React.ComponentType<any>> = {
  "screen-tools": Monitor,
  calculators: Calculator,
  "text-tools": Type,
  "developer-tools": Code,
};

const sidebarItems = [
  { label: "Popular Tools", icon: Terminal, href: "#tools", active: true },
  { label: "Recently Used", icon: History, href: "/tools" },
  { label: "Image Editors", icon: ImageIcon, href: "/tools/image-tools" },
  { label: "PDF Tools", icon: FileText, href: "/tools/productivity-tools" },
  { label: "Converters", icon: ArrowLeftRight, href: "/tools/developer-tools" },
];

const featureItems = [
  {
    icon: Bolt,
    title: "Instant Compute",
    body: "Most tools process data locally for near-instant results.",
  },
  {
    icon: ShieldAlert,
    title: "Zero-Log Privacy",
    body: "Your data never touches our disks. Total anonymity is our principle.",
  },
  {
    icon: Zap,
    title: "Minimalist UI",
    body: "Zero distractions. Just clean interfaces that respect your focus.",
  },
  {
    icon: CheckCircle2,
    title: "Forever Free",
    body: "No subscriptions. No barriers to getting your work done.",
  },
];

const featuredSlugs = [
  "json-formatter",
  "base64-encode-decode",
  "image-compressor",
  "invoice-generator",
];

const showcaseCategoryIds = ["screen-tools", "calculators", "text-tools", "developer-tools"];

export default function HomePage() {
  const { openCommandPalette, favorites, toggleFavorite } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const heroSearchRef = useRef<HTMLInputElement>(null);

  const featuredTools = useMemo(() => {
    return featuredSlugs
      .map((slug) => tools.find((tool) => tool.slug === slug))
      .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
  }, []);

  const showcaseCategories = useMemo(() => {
    return showcaseCategoryIds
      .map((id) => categories.find((category) => category.id === id))
      .filter((category): category is NonNullable<typeof category> => Boolean(category));
  }, []);

  const searchResults = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return [];

    return tools
      .filter((tool) => {
        return (
          tool.name.toLowerCase().includes(normalized) ||
          tool.description.toLowerCase().includes(normalized)
        );
      })
      .slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        heroSearchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-main antialiased transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border-primary/20 py-24 sm:py-36 bg-bg-primary">
        {/* Soft Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_50%_-20%,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(37,99,235,0.02),transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(99,102,241,0.02),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center flex flex-col items-center">
          {/* Version Pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-primary/60 bg-bg-secondary/30 px-4 py-1.5 backdrop-blur-md select-none transition-all duration-300 hover:border-primary/30">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              Precision Utilities v2.0
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 max-w-5xl text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-text-main">
            100+ Free Online Tools.
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
              Fast. Secure. Private.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-2xl text-base sm:text-xl leading-relaxed text-text-muted">
            A single destination for your professional workflow. Engineered for high-performance processing directly in your browser.
          </p>

          {/* Glassmorphism Search Box Container */}
          <div className="w-full max-w-3xl mb-8 relative z-20">
            <div className="relative flex items-center rounded-2xl border border-border-primary bg-bg-card/75 shadow-premium backdrop-blur-xl focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300 hover:shadow-premium-hover">
              <Search className="ml-5 h-5.5 w-5.5 text-text-muted/50" />
              <input
                ref={heroSearchRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-16 w-full border-0 bg-transparent pl-4 pr-10 text-base sm:text-lg text-text-main outline-none placeholder:text-text-muted/30 focus:ring-0"
                placeholder="What tool are you looking for today?..."
                type="text"
              />
              <div className="hidden pr-5 sm:block select-none">
                <kbd className="flex items-center gap-1.5 rounded-lg border border-border-primary/80 bg-bg-secondary px-2.5 py-1 text-[11px] font-bold text-text-muted">
                  <Keyboard className="h-3.5 w-3.5" /> <span>⌘ K</span>
                </kbd>
              </div>
            </div>

            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-3 w-full z-30 rounded-2xl border border-border-primary bg-bg-card/90 p-2 text-left shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                {searchResults.length > 0 ? (
                  searchResults.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.category}/${tool.slug}`}
                      className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-bg-secondary"
                    >
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-text-main">{tool.name}</span>
                        <span className="line-clamp-1 text-xs text-text-muted">{tool.description}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm font-medium text-text-muted">No matching tools found.</div>
                )}
              </div>
            )}
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/tools"
              className="w-full sm:w-auto text-center rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-all hover:bg-primary-hover hover:shadow-glow active:scale-95"
            >
              Explore All Tools
            </Link>
            <Link
              href="#categories"
              className="w-full sm:w-auto text-center rounded-full border border-border-primary bg-bg-card px-8 py-3.5 font-semibold text-text-main transition-all hover:bg-bg-secondary active:scale-95"
            >
              Browse Categories
            </Link>
          </div>

          {/* Editorial Statistics */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:flex sm:items-center sm:justify-center sm:gap-16 text-left border-t border-border-primary/40 pt-10 w-full max-w-3xl">
            <div className="border-l-2 border-primary/20 pl-4 py-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-text-main">100+</div>
              <div className="text-xs text-text-muted font-medium">Free Utilities</div>
            </div>
            <div className="border-l-2 border-primary/20 pl-4 py-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-text-main">Local</div>
              <div className="text-xs text-text-muted font-medium">Browser Compute</div>
            </div>
            <div className="border-l-2 border-primary/20 pl-4 py-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-text-main">0ms</div>
              <div className="text-xs text-text-muted font-medium">Processing Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-bg-secondary py-20 sm:py-28 border-b border-border-primary/20" id="categories">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="mb-2 text-3xl sm:text-4xl font-bold tracking-tight text-text-main">Browse Categories</h2>
              <p className="text-sm sm:text-base text-text-muted">Curated toolkits for modern digital workflows.</p>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5">
              View all {categories.length} categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseCategories.map((category) => {
              const IconComp = CategoryIconMap[category.id] || Monitor;
              return (
                <Link
                  key={category.id}
                  href={`/tools/${category.slug}`}
                  className="block h-full"
                >
                  <GlowingCard className="h-full flex flex-col justify-between p-8 bg-bg-card/75 border-border-primary/50 shadow-sm rounded-2xl hover:shadow-premium hover:-translate-y-1 transition-all" glowColor="rgba(37, 99, 235, 0.05)">
                    <div>
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary/10 to-primary-light/5 text-primary shadow-[0_4px_12px_rgba(37,99,235,0.08)]">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold tracking-tight text-text-main">
                        {category.name.replace(" Tools", "")}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-text-muted">{category.description}</p>
                    </div>
                  </GlowingCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools Layout */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 flex flex-col lg:flex-row gap-12 sm:gap-16" id="tools">
        {/* Sidebar */}
        <aside className="hidden h-fit w-64 flex-col gap-2 rounded-2xl border border-border-primary/60 bg-bg-card/60 backdrop-blur-md p-4 shadow-premium lg:sticky lg:top-24 lg:flex">
          <div className="mb-2 px-2">
            <h4 className="mb-1 text-[10px] font-bold uppercase tracking-widest text-text-muted/60">Related Tools</h4>
          </div>
          {sidebarItems.map((item) => {
            const SidebarIcon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all ${
                  item.active
                    ? "bg-primary/5 font-semibold text-primary"
                    : "font-medium text-text-muted hover:bg-bg-secondary hover:text-text-main"
                }`}
              >
                <SidebarIcon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="mt-4 border-t border-border-primary/50 pt-4">
            <Link
              href="/tools"
              className="block w-full rounded-xl border border-primary/20 py-2.5 text-center text-sm font-semibold text-primary transition-all hover:bg-primary/5"
            >
              Explore All Tools
            </Link>
          </div>
        </aside>

        {/* Tools Grid */}
        <div className="flex-1">
          <div className="mb-10 flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">Featured Tools</h2>
            <div className="h-[1px] flex-1 bg-border-primary/50" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredTools.map((tool, index) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.category}/${tool.slug}`}
                className="block h-full group"
              >
                <GlowingCard className="h-full flex flex-col p-0 overflow-hidden bg-bg-card/60 backdrop-blur-lg border-border-primary/50 shadow-premium rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover hover:border-primary/30" glowColor="rgba(37, 99, 235, 0.08)">
                  <div className="relative h-44 w-full overflow-hidden bg-bg-secondary/40 border-b border-border-primary/50">
                    <div className={`h-full w-full transition-transform duration-700 hover:scale-105 ${
                      index % 2 === 0 
                        ? "bg-[linear-gradient(135deg,var(--surface)_0%,rgba(37,99,235,0.08)_48%,var(--card)_100%)]" 
                        : "bg-[linear-gradient(135deg,var(--card)_0%,rgba(37,99,235,0.06)_45%,rgba(99,102,241,0.06)_100%)]"
                    }`}>
                      <div className="flex h-full items-center justify-center px-6">
                        <div className="w-full max-w-xs rounded-xl border border-border-primary/80 bg-bg-card/90 p-4 shadow-xl backdrop-blur-sm">
                          <div className="mb-3 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-red-400/90" />
                            <span className="h-2 w-2 rounded-full bg-yellow-400/90" />
                            <span className="h-2 w-2 rounded-full bg-green-400/90" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-1.5 w-3/4 rounded-full bg-primary/20" />
                            <div className="h-1.5 w-full rounded-full bg-border-primary" />
                            <div className="h-1.5 w-5/6 rounded-full bg-border-primary" />
                            <div className="h-1.5 w-2/3 rounded-full bg-primary/10" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Pill Tag */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-border-primary/80 bg-bg-card/95 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm text-text-muted capitalize">
                        {tool.category.replace("-", " ")}
                      </span>
                    </div>

                    {/* Bookmark Icon */}
                    <div className="absolute right-4 top-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(tool.slug);
                        }}
                        className="p-1.5 rounded-full border border-border-primary/60 bg-bg-card/90 text-text-muted hover:text-primary transition-all active:scale-90 shadow-sm backdrop-blur-sm"
                        aria-label="Bookmark tool"
                      >
                        <Bookmark className={`h-3.5 w-3.5 ${favorites.includes(tool.slug) ? "fill-primary text-primary" : ""}`} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-bold tracking-tight text-text-main">{tool.name}</h3>
                      <p className="mb-5 text-xs sm:text-sm leading-relaxed text-text-muted">{tool.description}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary group-hover:text-primary-hover">
                      Launch Interface
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </GlowingCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="overflow-hidden border-y border-border-primary/50 bg-bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 text-center md:grid-cols-3">
          <div>
            <p className="mb-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">100+</p>
            <p className="text-sm sm:text-base font-semibold text-text-main">Active Tools</p>
            <p className="mt-1 text-[9px] uppercase tracking-widest text-text-muted">Precision Built</p>
          </div>
          <div>
            <p className="mb-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">1.5M+</p>
            <p className="text-sm sm:text-base font-semibold text-text-main">Monthly Users</p>
            <p className="mt-1 text-[9px] uppercase tracking-widest text-text-muted">Global Trust</p>
          </div>
          <div>
            <p className="mb-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">99.9%</p>
            <p className="text-sm sm:text-base font-semibold text-text-main">System Uptime</p>
            <p className="mt-1 text-[9px] uppercase tracking-widest text-text-muted">Tier 1 Network</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-bg-primary py-20 sm:py-28" id="features">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-3 text-3xl sm:text-4xl font-bold tracking-tight text-text-main">Engineered for Excellence</h2>
            <p className="text-sm sm:text-base leading-relaxed text-text-muted">
              The difference is in the craft. Every tool is optimized for zero-latency workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {featureItems.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title} className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-primary/50 bg-bg-secondary/80 text-primary">
                    <FeatureIcon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-bold tracking-tight text-text-main">{feature.title}</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-text-muted">{feature.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium CTA Panel */}
      <section className="px-6 pb-20 sm:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border-primary/40 bg-bg-secondary px-6 py-16 sm:py-24 text-center shadow-premium">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.06),transparent_50%)]" />
          <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">Accelerate your workflow.</h2>
            <p className="mb-8 text-sm sm:text-base text-text-muted">
              Experience the precision of the world&apos;s most sophisticated browser utility suite.
            </p>
            <Link
              box-shadow="none"
              href="/tools"
              className="inline-flex rounded-full bg-primary px-8 py-4 font-bold text-white shadow-glow transition-all hover:bg-primary-hover active:scale-95 cursor-pointer"
            >
              Start Using 100+ Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
