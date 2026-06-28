import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import { categories } from "@/data/tools";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950/80 mt-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
        {/* Brand Info */}
        <div className="col-span-1 sm:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2 select-none">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-zinc-50" />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-100">
              Toolbox<span className="text-violet-500">.</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
            A premium collection of high-fidelity, online productivity, screen diagnostic, developer, and business calculators built completely in the browser.
          </p>
          <div className="text-xs text-zinc-600 flex items-center gap-1.5 pt-2">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>using Next.js & Tailwind</span>
          </div>
        </div>

        {/* Categories Col 1 */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold text-zinc-200 uppercase tracking-widest mb-3 sm:mb-4">Categories</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-zinc-400">
            {categories.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link href={`/tools/${category.slug}`} className="hover:text-zinc-200 transition-colors duration-150">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Col 2 */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold text-zinc-200 uppercase tracking-widest mb-3 sm:mb-4">More Tools</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-zinc-400">
            {categories.slice(5).map((category) => (
              <li key={category.id}>
                <Link href={`/tools/${category.slug}`} className="hover:text-zinc-200 transition-colors duration-150">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold text-zinc-200 uppercase tracking-widest mb-3 sm:mb-4">Platform</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-zinc-400">
            <li>
              <Link href="/blog" className="hover:text-zinc-200 transition-colors duration-150">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-zinc-200 transition-colors duration-150">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-zinc-200 transition-colors duration-150">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-zinc-200 transition-colors duration-150">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Disclaimer */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <span>&copy; {new Date().getFullYear()} Toolbox Platform. All rights reserved.</span>
        <span className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/contact" className="hover:underline">Contact Support</Link>
        </span>
      </div>
    </footer>
  );
};
