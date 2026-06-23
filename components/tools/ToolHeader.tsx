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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-900/60 select-none">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50">{name}</h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => toggleFavorite(slug)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${
          isFav
            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
            : "glass text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
        }`}
      >
        <Star className={`h-4 w-4 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
        <span>{isFav ? "Bookmarked" : "Bookmark Tool"}</span>
      </button>
    </div>
  );
};
