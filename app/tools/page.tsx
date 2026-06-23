import type { Metadata } from "next";
import Link from "next/link";
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
  Layers,
  ArrowRight
} from "lucide-react";
import { categories, tools } from "@/data/tools";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "All Categories - Toolbox Platform",
  description: "Browse online utility tools, developers formatting scripts, financial calculators, and productivity workspaces.",
  alternates: {
    canonical: "/tools",
  },
};

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

export default function ToolsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Tools" }]} />

      {/* Header Info */}
      <div className="border-b border-zinc-900/60 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2">
          <Layers className="h-6 w-6 text-violet-500" /> Utility Directories
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Select a category group below to access specialized browser-based productivity widgets, text calculators, developer decoders, and business converters.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || Layers;
          const categoryToolsCount = tools.filter((t) => t.category === category.id).length;

          return (
            <Link key={category.id} href={`/tools/${category.slug}`} className="group">
              <Card hoverEffect className="h-full flex flex-col justify-between min-h-[160px] p-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-450 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 border border-zinc-900 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      {categoryToolsCount} Tools
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-violet-400 transition-all duration-200 flex items-center gap-1.5">
                      {category.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-normal leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pt-4 flex items-center justify-between border-t border-zinc-900/40">
                  <span>Browse Category</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:text-violet-400 transition-all duration-200" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
