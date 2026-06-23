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
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-zinc-500 font-medium select-none">
      <Link
        href="/"
        className="flex items-center hover:text-zinc-200 transition-colors duration-200"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-700 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-zinc-200 transition-colors duration-200 truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-400 truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
