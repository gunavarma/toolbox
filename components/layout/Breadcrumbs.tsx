"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 sm:space-x-1.5 text-[10px] sm:text-xs text-zinc-500 font-medium select-none overflow-x-auto">
      <Link
        href="/"
        className="flex items-center hover:text-zinc-200 transition-colors duration-200 shrink-0"
      >
        <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-700 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-zinc-200 transition-colors duration-200 truncate shrink-0"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-400 truncate max-w-[100px] sm:max-w-[200px] lg:max-w-xs shrink-0">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
