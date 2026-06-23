import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, User, Sparkles, Layers, ArrowRight } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Blog - Productivity, SEO, & Developer Insights",
  description: "Read professional development guides, SEO optimization checkmarks, financial planning logs, and tech productivity tips.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Blog" }]} />

      {/* Header Info */}
      <div className="border-b border-zinc-900/60 pb-6 select-none">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-violet-500" /> Toolbox Journal
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Productivity tactics, technical SEO guides, web performance calculations, and business development guides to help scale your workflows.
        </p>
      </div>

      {/* Categories Tabs row */}
      <div className="flex flex-wrap gap-2 select-none">
        <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 font-mono">
          All Posts
        </span>
        {blogCategories.map((cat) => (
          <span
            key={cat.slug}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono hover:text-zinc-200 transition-colors"
          >
            {cat.name}
          </span>
        ))}
      </div>

      {/* Articles Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card hoverEffect className="h-full flex flex-col justify-between p-5 min-h-[220px]">
              <div className="space-y-4">
                {/* Author Info */}
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold font-mono uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-zinc-650" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-zinc-650" /> {post.readingTime}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-zinc-150 group-hover:text-violet-400 transition-colors duration-200 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-405 leading-relaxed font-normal line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Tag footer */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-900/40 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1 font-mono text-violet-450">
                  <Layers className="h-3 w-3" /> {post.category}
                </span>
                <span className="flex items-center gap-1">
                  Read Article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:text-violet-400 transition-all duration-200" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
