import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { tools, categories } from "@/data/tools";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static params for categories
export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

// Generate metadata for category landing page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) return {};

  return {
    title: `${category.name} - Professional Utilities & Online Tools`,
    description: `Browse all ${category.name.toLowerCase()} in our Toolbox. Free, secure, client-side online web productivity components.`,
    alternates: {
      canonical: `/tools/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter tools belonging to this category
  const categoryTools = tools.filter((t) => t.category === category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: category.name }
        ]}
      />

      {/* Header Info */}
      <div className="border-b border-zinc-900/60 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2">
          <Layers className="h-6 w-6 text-violet-500" /> {category.name}
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          {category.description} Access {categoryTools.length} online utility tools below. Run completely inside your browser.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryTools.map((tool) => (
          <Link key={tool.id} href={`/tools/${category.slug}/${tool.slug}`} className="group">
            <Card hoverEffect className="h-full flex flex-col justify-between min-h-[140px] p-5">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-zinc-100 group-hover:text-violet-400 transition-colors duration-200">
                    {tool.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:translate-x-1 group-hover:text-violet-400 transition-all duration-200 shrink-0" />
                </div>
                <p className="text-xs text-zinc-400 font-normal leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>
              <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest pt-4 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-violet-500" /> Utility
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
