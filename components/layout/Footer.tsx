import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import { categories } from "@/data/tools";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border-primary/50 bg-bg-secondary/40 mt-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
        {/* Brand Info */}
        <div className="col-span-1 sm:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2 select-none">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary shadow-glow">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-text-main">
              Toolbox<span className="text-primary font-extrabold">.</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed">
            A premium collection of high-fidelity, online productivity, screen diagnostic, developer, and business calculators built completely in the browser.
          </p>
          <div className="text-xs text-text-muted flex items-center gap-1.5 pt-2">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>using Next.js & Tailwind</span>
          </div>
        </div>

        {/* Categories Col 1 */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold text-text-main uppercase tracking-widest mb-3 sm:mb-4">Categories</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-text-muted">
            {categories.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link href={`/tools/${category.slug}`} className="hover:text-primary transition-colors duration-150">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Col 2 */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold text-text-main uppercase tracking-widest mb-3 sm:mb-4">More Tools</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-text-muted">
            {categories.slice(5).map((category) => (
              <li key={category.id}>
                <Link href={`/tools/${category.slug}`} className="hover:text-primary transition-colors duration-150">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold text-text-main uppercase tracking-widest mb-3 sm:mb-4">Platform</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-text-muted">
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors duration-150">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors duration-150">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors duration-150">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-primary transition-colors duration-150">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Disclaimer */}
      <div className="max-w-7xl mx-auto border-t border-border-primary/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
        <span>&copy; {new Date().getFullYear()} Toolbox Platform. All rights reserved.</span>
        <span className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline hover:text-primary">Privacy</Link>
          <Link href="/terms" className="hover:underline hover:text-primary">Terms</Link>
          <Link href="/contact" className="hover:underline hover:text-primary">Contact Support</Link>
        </span>
      </div>
    </footer>
  );
};
