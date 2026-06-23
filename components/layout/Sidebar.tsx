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
  ChevronLeft,
  ChevronRight,
  Star,
  Settings,
  Bookmark,
  LayoutGrid
} from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { categories, tools } from "@/data/tools";
import { Button } from "@/components/ui/Button";

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
  const {
    isSidebarCollapsed,
    toggleSidebar,
    recentTools: recentSlugs,
    favorites: favoriteSlugs
  } = useStore();

  const favoriteTools = tools.filter((t) => favoriteSlugs.includes(t.slug));
  const recentTools = tools.filter((t) => recentSlugs.includes(t.slug)).slice(0, 4);

  return (
    <aside
      className={`fixed md:sticky top-16 bottom-0 left-0 z-30 flex flex-col border-r border-zinc-800/80 bg-zinc-950 transition-all duration-300 ${
        isSidebarCollapsed ? "w-16" : "w-64"
      } h-[calc(100vh-64px)] hidden md:flex shrink-0 select-none`}
    >
      {/* Collapse Toggle Button */}
      <div className="flex items-center justify-end p-3 border-b border-zinc-900">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 text-zinc-400 hover:text-zinc-200"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Areas */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-custom">
        {/* Categories Section */}
        <div>
          {!isSidebarCollapsed && (
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2.5 mb-2 flex items-center gap-1.5">
              <LayoutGrid className="h-3 w-3" /> Categories
            </div>
          )}
          <nav className="space-y-1">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || LayoutGrid;
              const isActive = pathname.startsWith(`/tools/${category.slug}`);
              return (
                <Link key={category.id} href={`/tools/${category.slug}`}>
                  <span
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-600/15 text-violet-400 border-l-2 border-violet-500"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                    }`}
                  >
                    <IconComponent className="h-4.5 w-4.5 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">{category.name}</span>}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Favorites Section */}
        {!isSidebarCollapsed && favoriteTools.length > 0 && (
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2.5 mb-2 flex items-center gap-1.5">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500/20" /> Bookmarks
            </div>
            <div className="space-y-0.5">
              {favoriteTools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`}>
                  <span
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      pathname.endsWith(tool.slug)
                        ? "text-zinc-100 bg-zinc-900/50"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                    <span className="truncate">{tool.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recents Section */}
        {!isSidebarCollapsed && recentTools.length > 0 && (
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2.5 mb-2 flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Recent Tools
            </div>
            <div className="space-y-0.5">
              {recentTools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`}>
                  <span
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      pathname.endsWith(tool.slug)
                        ? "text-zinc-100 bg-zinc-900/50"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0"></span>
                    <span className="truncate">{tool.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="p-3 border-t border-zinc-900">
        <Link href="/tools">
          <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 transition-all duration-200">
            <Settings className="h-4.5 w-4.5 shrink-0" />
            {!isSidebarCollapsed && <span>Preferences</span>}
          </span>
        </Link>
      </div>
    </aside>
  );
};
