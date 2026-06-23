"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tv,
  Clock,
  Calculator,
  Type,
  Code,
  Image,
  CheckSquare,
  Sparkles,
  Briefcase,
  LayoutGrid
} from "lucide-react";
import { categories } from "@/data/tools";

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  Tv,
  Clock,
  Calculator,
  Type,
  Code,
  Image,
  CheckSquare,
  Sparkles,
  Briefcase,
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-900 bg-zinc-950/80 h-[calc(100vh-64px)] hidden md:flex flex-col shrink-0 select-none">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 scrollbar-custom">
        <div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-3 flex items-center gap-2">
            <LayoutGrid className="h-3.5 w-3.5 text-zinc-500" /> Tool Categories
          </div>
          <nav className="space-y-1">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || LayoutGrid;
              const isActive = pathname.startsWith(`/tools/${category.slug}`);
              
              return (
                <Link key={category.id} href={`/tools/${category.slug}`}>
                  <span
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-600/10 text-violet-400 border-l-2 border-violet-500"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                    }`}
                  >
                    <IconComponent className="h-4.5 w-4.5 shrink-0" />
                    <span className="truncate">{category.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};
