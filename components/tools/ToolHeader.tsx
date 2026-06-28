"use client";

import React from "react";
import { Star } from "lucide-react";
import { useStore } from "@/hooks/useStore";

interface ToolHeaderProps {
  name: string;
  description: string;
  slug: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ name, description, slug }) => {
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(slug);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-zinc-900/60 select-none">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-50 break-words">{name}</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => toggleFavorite(slug)}
        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border text-[10px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap h-9 sm:h-10 ${
          isFav
            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
            : "glass text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
        }`}
      >
        <Star className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
        <span className="hidden sm:inline">{isFav ? "Bookmarked" : "Bookmark Tool"}</span>
        <span className="sm:hidden">{isFav ? "★" : "☆"}</span>
      </button>
    </div>
  );
};
